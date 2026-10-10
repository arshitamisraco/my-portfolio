import Link from "next/link";
import redesigns from "@/lib/redesigns.json";
import { CASE_STUDIES } from "@/lib/projects";
import { getHeatmap, getSummary, type HeatPoint, type Range, type SectionRow, type Summary } from "@/lib/posthog-query";
import Heatmap from "./Heatmap";

export const dynamic = "force-dynamic";

type Params = { n?: string; since?: string; page?: string; device?: string; type?: string };

const N_PRESETS = [10, 20, 50];
const PAGES = [{ path: "/", label: "Landing" }, ...CASE_STUDIES.map((s) => ({ path: s.href, label: pretty(s.slug) }))];
const DEVICES = { desktop: 1280, mobile: 390 } as const;
const EPOCH = "2026-01-01";

function pretty(s: string) {
  const t = s.replace(/[-_]+/g, " ").trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}
const pageLabel = (path: string) => PAGES.find((p) => p.path === path)?.label ?? path;
const secs = (n: number | null | undefined) => (n == null ? "—" : `${Math.round(n)}s`);
const pct = (n: number | null | undefined) => (n == null ? "—" : `${Math.round(n)}%`);
const fmtDate = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

// Landing-page project cards sit inside "selected-work", whose dwell already
// includes them. They're shown nested under it and left out of the headline.
const PARENT_OF_CARDS = "selected-work";
const isCard = (section: string) => section.startsWith("card-");

function topSection(s: Summary) {
  return s.sections.filter((x) => !isCard(x.section)).sort((a, b) => b.avgSeconds - a.avgSeconds)[0];
}

/** Sections longest-first, with any card-* rows tucked under their parent. */
function ordered(rows: SectionRow[]) {
  const byDwell = (a: SectionRow, b: SectionRow) => b.avgSeconds - a.avgSeconds;
  const cards = rows.filter((r) => isCard(r.section)).sort(byDwell);
  const top = rows.filter((r) => !isCard(r.section)).sort(byDwell);
  const hasParent = top.some((r) => r.section === PARENT_OF_CARDS);
  return [
    ...top.flatMap((r) => [
      { row: r, nested: false },
      ...(r.section === PARENT_OF_CARDS ? cards.map((c) => ({ row: c, nested: true })) : []),
    ]),
    ...(hasParent ? [] : cards.map((c) => ({ row: c, nested: false }))),
  ];
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<Params> }) {
  const sp = await searchParams;
  const n = Math.min(1000, Math.max(1, parseInt(sp.n ?? "", 10) || 20));
  const marks = [...redesigns].sort((a, b) => a.date.localeCompare(b.date));
  const latest = marks.at(-1)?.date ?? EPOCH;
  const since = sp.since === "all" ? "all" : marks.some((m) => m.date === sp.since) ? sp.since! : latest;
  const tomorrow = new Date(Date.now() + 864e5).toISOString().slice(0, 10);
  const after: Range = { from: since === "all" ? EPOCH : since, to: tomorrow };
  const prev = since === "all" ? undefined : [...marks].reverse().find((m) => m.date < since)?.date;
  const before: Range | null = since === "all" ? null : { from: prev ?? EPOCH, to: since };

  const page = PAGES.some((p) => p.path === sp.page) ? sp.page! : "/";
  const device = sp.device === "mobile" ? "mobile" : "desktop";
  const type = sp.type === "mousemove" ? "mousemove" : "click";

  const href = (o: Partial<Params>) => {
    const q = new URLSearchParams(
      Object.entries({ n: String(n), since, page, device, type, ...o }) as [string, string][],
    );
    return `/admin?${q}`;
  };

  let now: Summary | null = null;
  let then: Summary | null = null;
  let heat: HeatPoint[] = [];
  let error: string | null = null;
  try {
    [now, then, heat] = await Promise.all([
      getSummary(after, n),
      before ? getSummary(before, n) : Promise.resolve(null),
      getHeatmap(after, page, device, type),
    ]);
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  const top = now && topSection(now);
  const pages = now
    ? [...new Set(now.sections.map((s) => s.page))].sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)))
    : [];
  const maxDwell = Math.max(1, ...(now?.sections.map((s) => s.avgSeconds) ?? [0]));
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const rangeLabel = since === "all" ? "all time" : `since ${fmtDate(since)}`;

  return (
    <div className="container-site space-y-16 py-12 md:py-16">
      {/* Controls */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h1 className="font-display text-h1 text-ink">Analytics</h1>
          <a
            href={`https://us.posthog.com/project/${projectId}/replay`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill border border-line bg-surface-raised px-5 py-2 text-caption font-medium text-ink transition-colors hover:border-accent hover:bg-surface"
          >
            Watch replays in PostHog ↗
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Control label="Last">
            {N_PRESETS.map((v) => (
              <Pill key={v} href={href({ n: String(v) })} active={n === v}>
                {v}
              </Pill>
            ))}
            <form action="/admin" className="flex items-center gap-2">
              {Object.entries({ since, page, device, type }).map(([k, v]) => (
                <input key={k} type="hidden" name={k} value={v} />
              ))}
              <input
                name="n"
                type="number"
                min={1}
                max={1000}
                defaultValue={N_PRESETS.includes(n) ? undefined : n}
                placeholder="Custom"
                aria-label="Custom number of visitors"
                className={`w-24 rounded-pill border bg-surface-raised px-3 py-1 text-caption text-ink ${N_PRESETS.includes(n) ? "border-line" : "border-accent-strong"}`}
              />
            </form>
            <span className="text-caption text-ink-muted">visitors</span>
          </Control>
          <Control label="Range">
            {[...marks].reverse().map((m) => (
              <Pill key={m.date} href={href({ since: m.date })} active={since === m.date} title={m.label}>
                Since {fmtDate(m.date)}
              </Pill>
            ))}
            <Pill href={href({ since: "all" })} active={since === "all"}>
              All time
            </Pill>
          </Control>
        </div>
        <p className="text-caption text-ink-muted">
          Redesign dates live in <code>lib/redesigns.json</code>. Add one when you ship a change.
        </p>
      </header>

      {error && (
        <p className="rounded-card border border-accent bg-surface p-4 text-caption text-accent-deep">
          Couldn&rsquo;t reach PostHog: {error}
        </p>
      )}

      {/* Headline */}
      <section>
        {now && now.visitors > 0 && top ? (
          <div className="rounded-frame border border-line bg-surface-raised p-8 md:p-12">
            <p className="text-style-eyebrow text-accent-deep">Where people sit</p>
            <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-2xl font-display text-h2 text-ink md:text-h1">
                Across your last {now.visitors} visitor{now.visitors === 1 ? "" : "s"}, people sat longest in{" "}
                {pretty(top.section)} on {pageLabel(top.page)}.
              </p>
              <p className="font-display text-[clamp(4rem,10vw,7rem)] font-semibold leading-none text-accent-strong">
                {secs(top.avgSeconds)}
                <span className="ml-2 font-sans text-caption font-normal text-ink-muted">avg</span>
              </p>
            </div>
          </div>
        ) : (
          !error && (
            <Empty title={`No visitors ${rangeLabel} yet.`}>
              Once people visit, this shows the section they spend the most time in. Give it a couple of weeks at
              under 50 visitors a week before reading much into it.
            </Empty>
          )
        )}
      </section>

      {/* Sections: dwell + reach */}
      {now && now.sections.length > 0 && (
        <section className="space-y-10">
          <div>
            <h2 className="font-display text-h2 text-ink">Every section</h2>
            <p className="mt-1 text-caption text-ink-muted">
              Average time spent per visitor, longest first. &ldquo;Reached&rdquo; is the share of your last{" "}
              {now.visitors} visitors who scrolled it into view.
            </p>
          </div>
          {pages.map((p) => (
            <div key={p}>
              <h3 className="font-display text-h4 text-ink">{pageLabel(p)}</h3>
              <ol className="mt-3 divide-y divide-line">
                {ordered(now!.sections.filter((s) => s.page === p)).map(({ row: s, nested }) => (
                    <li
                      key={s.section}
                      className="grid grid-cols-[minmax(7rem,12rem)_1fr_3.5rem] items-center gap-4 py-3 md:grid-cols-[14rem_1fr_4rem_7rem]"
                      title={`${pretty(s.section)}: ${secs(s.avgSeconds)} average, reached by ${pct(s.reachedPct)}`}
                    >
                      <span className={`truncate ${nested ? "pl-4 text-caption text-ink-muted" : "text-body text-ink"}`}>
                        {nested ? `↳ ${pretty(s.section.replace(/^card-/, ""))}` : pretty(s.section)}
                      </span>
                      <span className="h-2 rounded-r bg-surface">
                        <span
                          className="block h-2 rounded-r bg-accent-strong"
                          style={{ width: `${(100 * s.avgSeconds) / maxDwell}%` }}
                        />
                      </span>
                      <span className="text-right text-body font-medium tabular-nums text-ink">{secs(s.avgSeconds)}</span>
                      <span className="col-span-3 -mt-2 text-caption tabular-nums text-ink-muted md:col-span-1 md:mt-0 md:text-right">
                        {pct(s.reachedPct)} reached
                      </span>
                    </li>
                ))}
              </ol>
            </div>
          ))}
        </section>
      )}

      {/* Before / after */}
      {before && now && (
        <section className="space-y-4">
          <div>
            <h2 className="font-display text-h2 text-ink">Before and after {fmtDate(since)}</h2>
            <p className="mt-1 text-caption text-ink-muted">
              Last {n} visitors on each side: {fmtDate(before.from)} – {fmtDate(since)} vs. since {fmtDate(since)}.
            </p>
          </div>
          {then && then.visitors > 0 ? (
            <div className="case-table overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="p-3"></th>
                    <th className="p-3">Before</th>
                    <th className="p-3">After</th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      ["Visitors counted", String(then.visitors), String(now.visitors)],
                      [
                        "Longest sit",
                        compareTop(then),
                        compareTop(now),
                      ],
                      ["Avg time on a page", secs(then.avgSecondsOnPage), secs(now.avgSecondsOnPage)],
                      ["Avg scroll depth", pct(then.avgScrollPct), pct(now.avgScrollPct)],
                    ] as const
                  ).map(([label, b, a]) => (
                    <tr key={label}>
                      <td className="p-3 font-medium">{label}</td>
                      <td className="p-3 tabular-nums">{b}</td>
                      <td className="p-3 tabular-nums">{a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty title="Nothing to compare against yet.">
              There&rsquo;s no data from before {fmtDate(since)}. The comparison fills in after your next redesign
              date.
            </Empty>
          )}
        </section>
      )}

      {/* Heatmap */}
      <section className="space-y-6">
        <div>
          <h2 className="font-display text-h2 text-ink">Heatmap</h2>
          <p className="mt-1 text-caption text-ink-muted">
            {type === "click" ? "Clicks" : "Cursor movement"} on {pageLabel(page)}, {device}, {rangeLabel}.{" "}
            {heat.length === 0 && !error && "Nothing recorded yet, so the page shows without heat."}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <Control label="Page">
            {PAGES.map((p) => (
              <Pill key={p.path} href={href({ page: p.path })} active={page === p.path}>
                {p.label}
              </Pill>
            ))}
          </Control>
          <Control label="Device">
            <Pill href={href({ device: "desktop" })} active={device === "desktop"}>
              Desktop
            </Pill>
            <Pill href={href({ device: "mobile" })} active={device === "mobile"}>
              Mobile
            </Pill>
          </Control>
          <Control label="Show">
            <Pill href={href({ type: "click" })} active={type === "click"}>
              Clicks
            </Pill>
            <Pill href={href({ type: "mousemove" })} active={type === "mousemove"}>
              Cursor
            </Pill>
          </Control>
        </div>
        <div className={device === "mobile" ? "mx-auto max-w-[390px]" : ""}>
          <Heatmap key={`${page}-${device}`} path={page} width={DEVICES[device]} points={heat} />
        </div>
      </section>
    </div>
  );

  function compareTop(s: Summary) {
    const t = topSection(s);
    return t ? `${pretty(t.section)} (${pageLabel(t.page)}), ${secs(t.avgSeconds)}` : "—";
  }
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-style-eyebrow mr-1 text-ink-muted">{label}</span>
      {children}
    </div>
  );
}

function Pill({
  href,
  active,
  title,
  children,
}: {
  href: string;
  active: boolean;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      title={title}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className={`rounded-pill border px-3 py-1 text-caption transition-colors ${
        active
          ? "border-accent-strong bg-accent-strong text-on-accent"
          : "border-line bg-surface-raised text-ink hover:border-accent hover:bg-surface"
      }`}
    >
      {children}
    </Link>
  );
}

function Empty({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-frame border border-dashed border-accent-soft bg-surface-raised p-8 md:p-12">
      <p className="font-display text-h3 text-ink">{title}</p>
      <p className="mt-2 max-w-prose text-body text-ink-muted">{children}</p>
    </div>
  );
}
