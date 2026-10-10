import "server-only";

// HogQL against PostHog's query API. Results are cached for 60s so reloading
// the dashboard doesn't hammer the API.
const API = "https://us.posthog.com";

export async function hogql<T extends unknown[] = unknown[]>(query: string): Promise<T[]> {
  const id = process.env.POSTHOG_PROJECT_ID;
  const key = process.env.POSTHOG_PERSONAL_API_KEY;
  if (!id || !key) throw new Error("POSTHOG_PROJECT_ID / POSTHOG_PERSONAL_API_KEY not set");
  const res = await fetch(`${API}/api/projects/${id}/query/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: { kind: "HogQLQuery", query } }),
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`PostHog query failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  return ((await res.json()).results ?? []) as T[];
}

export type Range = { from: string; to: string }; // ISO dates (YYYY-MM-DD), `to` exclusive

const ts = (d: string) => `toDateTime('${d.replace(/[^0-9-]/g, "")} 00:00:00')`;
// Dev-server traffic is ignored in production so testing doesn't pollute the numbers.
const notLocal = (col: string) =>
  process.env.NODE_ENV === "production" ? `and ${col} not like 'http://localhost%'` : "";

const inRange = (r: Range) =>
  `timestamp >= ${ts(r.from)} and timestamp < ${ts(r.to)} ${notLocal("properties.$current_url")}`;

/**
 * The last N visitors (sessions) who viewed a page in the range, most recent first.
 * A visitor is a $session_id: persistence is per-tab, so there is no cross-visit identity.
 */
const lastVisitors = (r: Range, n: number) =>
  `(select $session_id from events where event = '$pageview' and ${inRange(r)}
    group by $session_id order by max(timestamp) desc limit ${Math.floor(n)})`;

export type SectionRow = {
  page: string;
  section: string;
  index: number;
  avgSeconds: number;
  reachedPct: number;
};

export type Summary = {
  visitors: number;
  avgSecondsOnPage: number | null;
  avgScrollPct: number | null;
  sections: SectionRow[];
};

export async function getSummary(r: Range, n: number): Promise<Summary> {
  const who = `$session_id in ${lastVisitors(r, n)}`;
  const [[visitorRow], [exitRow], dwell, reach] = await Promise.all([
    hogql<[number]>(`select count() from ${lastVisitors(r, n)}`),
    hogql<[number | null, number | null]>(
      `select avg(toFloat(properties.seconds_on_page)), avg(toFloat(properties.max_scroll_pct))
       from events where event = 'page_exit' and ${inRange(r)} and ${who}`,
    ),
    // section_dwell can fire several times per section, so sum per visitor first,
    // then average across visitors.
    hogql<[string, string, number, number]>(
      `select page, section, min(idx), avg(secs) from (
         select $session_id as sid, properties.page as page, properties.section as section,
                toInt(properties.section_index) as idx, sum(toFloat(properties.seconds)) as secs
         from events where event = 'section_dwell' and ${inRange(r)} and ${who}
         group by sid, page, section, idx)
       group by page, section`,
    ),
    hogql<[string, string, number, number]>(
      `select properties.page, properties.section, min(toInt(properties.section_index)), count(distinct $session_id)
       from events where event = 'section_viewed' and ${inRange(r)} and ${who}
       group by properties.page, properties.section`,
    ),
  ]);

  const visitors = visitorRow?.[0] ?? 0;
  const rows = new Map<string, SectionRow>();
  const get = (page: string, section: string, index: number) => {
    const k = `${page}\u0000${section}`;
    if (!rows.has(k)) rows.set(k, { page, section, index, avgSeconds: 0, reachedPct: 0 });
    return rows.get(k)!;
  };
  for (const [page, section, index, secs] of dwell) get(page, section, index).avgSeconds = secs ?? 0;
  for (const [page, section, index, people] of reach)
    get(page, section, index).reachedPct = visitors ? (100 * people) / visitors : 0;

  return {
    visitors,
    avgSecondsOnPage: exitRow?.[0] ?? null,
    avgScrollPct: exitRow?.[1] ?? null,
    sections: [...rows.values()],
  };
}

export type HeatPoint = [x: number, y: number, viewportWidth: number, count: number];

/** Raw heatmap points in CSS px; y is page-relative (includes scroll). */
export async function getHeatmap(
  r: Range,
  path: string,
  device: "desktop" | "mobile",
  type: "click" | "mousemove",
): Promise<HeatPoint[]> {
  const safePath = path.replace(/[^a-z0-9/_-]/gi, "");
  return hogql<HeatPoint>(
    `select round(x * scale_factor), round(y * scale_factor), viewport_width * scale_factor, count()
     from heatmaps
     where type = '${type}' and pointer_target_fixed = false
       and timestamp >= ${ts(r.from)} and timestamp < ${ts(r.to)} ${notLocal("current_url")}
       and path(current_url) = '${safePath}'
       and viewport_width * scale_factor ${device === "desktop" ? ">=" : "<"} 768
     group by 1, 2, 3 limit 20000`,
  );
}
