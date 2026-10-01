/**
 * The request path of a scan: the route queues an event, an Inngest function runs five
 * retryable steps, and the browser polls for the result while it runs. Server component,
 * inline SVG, tokens only. Two layouts: a horizontal flow from lg up, a vertical one below it.
 */

const TITLE = "How a scan runs, from request to results";
const DESC =
  "The browser sends POST /api/scans. The route only queues an event with inngest.send. An Inngest function then runs five steps: one, mark the scan running; two, launch Chromium and run axe; three, persist the issues to Postgres; four, Claude explains and fixes each issue, most severe first; five, mark the scan completed or failed. While the function runs, the page polls GET /api/scans/:id for the status and the results.";

const FRAME = "overflow-hidden rounded-frame border border-line bg-butter-soft p-2 sm:p-3";

interface Step {
  title: string;
  /** Short lines for the wide layout. */
  lines: string[];
  /** One line for the narrow layout. */
  line: string;
  bar: string;
}

const STEPS: Step[] = [
  { title: "Mark running", lines: ["Status: running"], line: "Status: running", bar: "stroke-butter-deep" },
  {
    title: "Scan",
    lines: ["Launch Chromium,", "then axe.run"],
    line: "Launch Chromium, axe.run",
    bar: "stroke-sky-deep",
  },
  {
    title: "Persist",
    lines: ["Issues to Postgres"],
    line: "Issues to Postgres",
    bar: "stroke-mint-deep",
  },
  {
    title: "Explain + fix",
    lines: ["Claude, most", "severe first"],
    line: "Claude, most severe first",
    bar: "stroke-lavender-deep",
  },
  {
    title: "Finish",
    lines: ["Mark completed", "or failed"],
    line: "Mark completed or failed",
    bar: "stroke-butter-deep",
  },
];

/** A white node with a coloured left bar, traced along its rounded edge. */
function Node({
  x,
  y,
  w,
  h,
  bar,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  bar: string;
}) {
  const r = 12;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={r}
        className="fill-surface-raised stroke-line"
        strokeWidth={1}
      />
      <path
        d={`M ${x + r} ${y} A ${r} ${r} 0 0 0 ${x} ${y + r} L ${x} ${y + h - r} A ${r} ${r} 0 0 0 ${x + r} ${y + h}`}
        className={bar}
        strokeWidth={4}
        fill="none"
      />
    </g>
  );
}

function Markers({ id }: { id: string }) {
  return (
    <defs>
      <marker id={`${id}-a`} markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
        <path d="M0 0 L6 3 L0 6 Z" className="fill-ink-muted" />
      </marker>
    </defs>
  );
}

/** The step number, in a small round badge. */
function Badge({ cx, cy, n }: { cx: number; cy: number; n: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={11} className="fill-surface stroke-line" strokeWidth={1} />
      <text
        x={cx}
        y={cy + 4.5}
        textAnchor="middle"
        className="font-mono fill-ink text-[13px] font-semibold"
      >
        {n}
      </text>
    </g>
  );
}

const T = "font-sans";
const HEAD = `${T} fill-ink text-[15px] font-semibold`;
const STEP_HEAD = `${T} fill-ink text-[14px] font-semibold`;
const BODY = `${T} fill-ink-muted text-[14px]`;
const MONO = "font-mono fill-ink text-[13px]";
const MONO_HEAD = "font-mono fill-ink text-[14px] font-semibold";
const ARROW = { className: "stroke-ink-muted", strokeWidth: 1.5, fill: "none" } as const;
const DASH = { ...ARROW, strokeDasharray: "5 4" } as const;

function Wide() {
  const sw = 162; // step width
  const sg = 24; // gap between steps
  const sx0 = 48;
  const sy = 206;
  const sh = 100;
  return (
    <svg
      viewBox="0 0 1000 354"
      className="hidden h-auto w-full lg:block"
      role="img"
      aria-labelledby="sp-wide-title sp-wide-desc"
    >
      <title id="sp-wide-title">{TITLE}</title>
      <desc id="sp-wide-desc">{DESC}</desc>
      <Markers id="spw" />

      {/* Polling return path, above the top row */}
      <path d="M 813 52 V 38 Q 813 30 805 30 H 147 Q 139 30 139 38 V 48" {...DASH} markerEnd="url(#spw-a)" />
      <text x={476} y={21} textAnchor="middle" className={BODY}>
        The page polls while the function runs
      </text>

      {/* Request */}
      <Node x={24} y={52} w={230} h={72} bar="stroke-sky-deep" />
      <text x={46} y={84} className={MONO_HEAD}>POST /api/scans</text>
      <text x={46} y={106} className={BODY}>The route only queues</text>

      <Node x={300} y={52} w={200} h={72} bar="stroke-lavender-deep" />
      <text x={322} y={84} className={MONO_HEAD}>inngest.send</text>
      <text x={322} y={106} className={BODY}>scan/requested</text>

      {/* Poll */}
      <Node x={650} y={52} w={326} h={72} bar="stroke-accent-strong" />
      <text x={672} y={84} className={HEAD}>The page polls</text>
      <text x={672} y={106} className={MONO}>GET /api/scans/:id</text>

      <line x1={258} y1={88} x2={296} y2={88} {...ARROW} markerEnd="url(#spw-a)" />
      <line x1={400} y1={128} x2={400} y2={148} {...ARROW} markerEnd="url(#spw-a)" />
      <line x1={813} y1={148} x2={813} y2={128} {...ARROW} markerEnd="url(#spw-a)" />

      {/* Inngest function */}
      <rect
        x={24}
        y={152}
        width={952}
        height={178}
        rx={16}
        className="fill-surface stroke-line"
        strokeWidth={1}
      />
      <text x={48} y={184} className={HEAD}>Inngest function</text>
      <text x={952} y={184} textAnchor="end" className={BODY}>Retryable steps</text>

      {STEPS.map((s, i) => {
        const x = sx0 + i * (sw + sg);
        return (
          <g key={s.title}>
            <Node x={x} y={sy} w={sw} h={sh} bar={s.bar} />
            <Badge cx={x + 34} cy={sy + 26} n={i + 1} />
            <text x={x + 54} y={sy + 31} className={STEP_HEAD}>{s.title}</text>
            <text className={BODY}>
              {s.lines.map((l, j) => (
                <tspan key={l} x={x + 22} y={sy + 62 + j * 20}>
                  {l}
                </tspan>
              ))}
            </text>
            {i < STEPS.length - 1 && (
              <line
                x1={x + sw + 3}
                y1={sy + sh / 2}
                x2={x + sw + sg - 3}
                y2={sy + sh / 2}
                {...ARROW}
                markerEnd="url(#spw-a)"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Narrow() {
  const nx = 16;
  const nw = 284;
  const sx = 32;
  const sw = 252;
  const sh = 56;
  const sg = 20;
  const sy0 = 228;
  const stepsEnd = sy0 + STEPS.length * sh + (STEPS.length - 1) * sg; // 588
  const boxBottom = stepsEnd + 16;
  const pollY = boxBottom + 32;
  const pollH = 64;
  return (
    <svg
      viewBox={`0 0 340 ${pollY + pollH + 12}`}
      className="mx-auto block h-auto w-full max-w-[460px] lg:hidden"
      role="img"
      aria-labelledby="sp-narrow-title sp-narrow-desc"
    >
      <title id="sp-narrow-title">{TITLE}</title>
      <desc id="sp-narrow-desc">{DESC}</desc>
      <Markers id="spn" />

      {/* Request */}
      <Node x={nx} y={8} w={nw} h={60} bar="stroke-sky-deep" />
      <text x={38} y={34} className={MONO_HEAD}>POST /api/scans</text>
      <text x={38} y={54} className={BODY}>The route only queues</text>

      <line x1={158} y1={72} x2={158} y2={92} {...ARROW} markerEnd="url(#spn-a)" />

      <Node x={nx} y={96} w={nw} h={60} bar="stroke-lavender-deep" />
      <text x={38} y={122} className={MONO_HEAD}>inngest.send</text>
      <text x={38} y={142} className={BODY}>scan/requested</text>

      <line x1={158} y1={160} x2={158} y2={180} {...ARROW} markerEnd="url(#spn-a)" />

      {/* Inngest function */}
      <rect
        x={nx}
        y={184}
        width={nw}
        height={boxBottom - 184}
        rx={16}
        className="fill-surface stroke-line"
        strokeWidth={1}
      />
      <text x={34} y={212} className={HEAD}>Inngest function</text>
      <text x={282} y={212} textAnchor="end" className={BODY}>Retryable steps</text>

      {STEPS.map((s, i) => {
        const y = sy0 + i * (sh + sg);
        return (
          <g key={s.title}>
            <Node x={sx} y={y} w={sw} h={sh} bar={s.bar} />
            <Badge cx={sx + 32} cy={y + sh / 2} n={i + 1} />
            <text x={sx + 54} y={y + 24} className={STEP_HEAD}>{s.title}</text>
            <text x={sx + 54} y={y + 44} className={BODY}>{s.line}</text>
            {i < STEPS.length - 1 && (
              <line
                x1={sx + sw / 2}
                y1={y + sh + 3}
                x2={sx + sw / 2}
                y2={y + sh + sg - 3}
                {...ARROW}
                markerEnd="url(#spn-a)"
              />
            )}
          </g>
        );
      })}

      <line x1={158} y1={boxBottom + 3} x2={158} y2={pollY - 3} {...ARROW} markerEnd="url(#spn-a)" />

      {/* Poll */}
      <Node x={nx} y={pollY} w={nw} h={pollH} bar="stroke-accent-strong" />
      <text x={38} y={pollY + 26} className={HEAD}>The page polls</text>
      <text x={38} y={pollY + 48} className={MONO}>GET /api/scans/:id</text>

      {/* Polling return path, up the right edge to the request */}
      <path
        d={`M ${nx + nw} ${pollY + pollH / 2} H 318 Q 326 ${pollY + pollH / 2} 326 ${pollY + pollH / 2 - 8} V 46 Q 326 38 318 38 H ${nx + nw + 4}`}
        {...DASH}
        markerEnd="url(#spn-a)"
      />
    </svg>
  );
}

export default function ScanPipeline() {
  return (
    <figure className="my-8">
      <div className={FRAME}>
        <Wide />
        <Narrow />
      </div>
    </figure>
  );
}
