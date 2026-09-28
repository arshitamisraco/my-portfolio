/**
 * How one email becomes one card: the model's input, the fixed-schema tool call, the
 * structured answer, and the keyword fallback. Server component, inline SVG, tokens only.
 * Two layouts: a horizontal flow from lg up, a vertical flow below it.
 */

const TITLE = "How the classifier reads an email";
const DESC =
  "An email (subject, sender, snippet, and the first 2,000 characters of the body) goes to Claude Haiku, which answers with a fixed-schema tool call: is_job_related, company, role, status and confidence. That becomes one card per company. If there is no API key or the model is down, a keyword heuristic produces the same answer.";

const FRAME = "overflow-hidden rounded-frame border border-line bg-sky-soft p-2 sm:p-3";

const FIELDS = ["is_job_related", "company", "role", "status", "confidence"];

/** A white node with a coloured left bar, traced along its rounded edge. */
function Node({
  x,
  y,
  w,
  h,
  bar,
  dashed,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  bar: string;
  dashed?: boolean;
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
        strokeDasharray={dashed ? "5 4" : undefined}
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

const T = "font-sans";
const HEAD = `${T} fill-ink text-[15px] font-semibold`;
const BODY = `${T} fill-ink-muted text-[14px]`;
const MONO = "font-mono fill-ink text-[13px]";

function Wide() {
  const y = 24;
  const h = 176;
  const mid = y + h / 2;
  return (
    <svg
      viewBox="0 0 1000 330"
      className="hidden h-auto w-full lg:block"
      role="img"
      aria-labelledby="cf-wide-title cf-wide-desc"
    >
      <title id="cf-wide-title">{TITLE}</title>
      <desc id="cf-wide-desc">{DESC}</desc>
      <Markers id="cfw" />

      {/* Email */}
      <Node x={24} y={y} w={204} h={h} bar="stroke-sky-deep" />
      <text x={46} y={y + 34} className={HEAD}>An email</text>
      <text className={BODY}>
        <tspan x={46} y={y + 66}>Subject</tspan>
        <tspan x={46} y={y + 90}>From</tspan>
        <tspan x={46} y={y + 114}>Snippet</tspan>
        <tspan x={46} y={y + 138}>Body, first 2,000</tspan>
        <tspan x={46} y={y + 158}>characters</tspan>
      </text>

      {/* Haiku */}
      <Node x={272} y={y} w={236} h={h} bar="stroke-lavender-deep" />
      <text x={294} y={y + 34} className={HEAD}>Claude Haiku</text>
      <text x={294} y={y + 62} className={BODY}>One tool call:</text>
      <text x={294} y={y + 84} className={MONO}>record_classification</text>
      <text className={BODY}>
        <tspan x={294} y={y + 114}>Company is the one named</tspan>
        <tspan x={294} y={y + 136}>in the email, never the</tspan>
        <tspan x={294} y={y + 158}>sender&rsquo;s domain.</tspan>
      </text>

      {/* Answer */}
      <Node x={552} y={y} w={226} h={h} bar="stroke-mint-deep" />
      <text x={574} y={y + 34} className={HEAD}>Fixed schema</text>
      {FIELDS.map((f, i) => (
        <text key={f} x={574} y={y + 66 + i * 24} className={MONO}>
          {f}
        </text>
      ))}

      {/* Card */}
      <Node x={822} y={y} w={154} h={h} bar="stroke-accent-strong" />
      <text className={HEAD}>
        <tspan x={844} y={y + 34}>One card</tspan>
        <tspan x={844} y={y + 54}>per company</tspan>
      </text>
      <text className={BODY}>
        <tspan x={844} y={y + 88}>Sorted by the</tspan>
        <tspan x={844} y={y + 110}>latest email</tspan>
      </text>

      {/* Main arrows */}
      {[
        [232, 268],
        [512, 548],
        [782, 818],
      ].map(([x1, x2]) => (
        <line
          key={x1}
          x1={x1}
          y1={mid}
          x2={x2}
          y2={mid}
          className="stroke-ink-muted"
          strokeWidth={1.5}
          markerEnd="url(#cfw-a)"
        />
      ))}

      {/* Fallback path */}
      <path
        d={`M 126 ${y + h} V 281 Q 126 289 134 289 H 268`}
        className="stroke-ink-muted"
        strokeWidth={1.5}
        strokeDasharray="5 4"
        fill="none"
        markerEnd="url(#cfw-a)"
      />
      <Node x={272} y={254} w={236} h={70} bar="stroke-butter-deep" dashed />
      <text x={294} y={280} className={HEAD}>Keyword heuristic</text>
      <text x={294} y={304} className={BODY}>No API key, or model down</text>
      <path
        d={`M 512 289 H 657 Q 665 289 665 281 V ${y + h + 4}`}
        className="stroke-ink-muted"
        strokeWidth={1.5}
        strokeDasharray="5 4"
        fill="none"
        markerEnd="url(#cfw-a)"
      />
    </svg>
  );
}

function Narrow() {
  return (
    <svg
      viewBox="0 0 340 588"
      className="mx-auto block h-auto w-full max-w-[460px] lg:hidden"
      role="img"
      aria-labelledby="cf-narrow-title cf-narrow-desc"
    >
      <title id="cf-narrow-title">{TITLE}</title>
      <desc id="cf-narrow-desc">{DESC}</desc>
      <Markers id="cfn" />

      {/* Email */}
      <Node x={16} y={8} w={308} h={104} bar="stroke-sky-deep" />
      <text x={38} y={38} className={HEAD}>An email</text>
      <text className={BODY}>
        <tspan x={38} y={62}>Subject, from, snippet</tspan>
        <tspan x={38} y={84}>Body, first 2,000 characters</tspan>
      </text>

      {/* Fork arrows */}
      <line x1={116} y1={116} x2={116} y2={152} className="stroke-ink-muted" strokeWidth={1.5} markerEnd="url(#cfn-a)" />
      <line
        x1={276}
        y1={116}
        x2={276}
        y2={152}
        className="stroke-ink-muted"
        strokeWidth={1.5}
        strokeDasharray="5 4"
        markerEnd="url(#cfn-a)"
      />

      {/* Haiku */}
      <Node x={16} y={156} w={200} h={148} bar="stroke-lavender-deep" />
      <text x={38} y={184} className={HEAD}>Claude Haiku</text>
      <text x={38} y={208} className={BODY}>One tool call:</text>
      <text x={38} y={228} className={MONO}>record_classification</text>
      <text className={BODY}>
        <tspan x={38} y={256}>Company is the one</tspan>
        <tspan x={38} y={276}>named in the email,</tspan>
        <tspan x={38} y={296}>not the sender.</tspan>
      </text>

      {/* Heuristic */}
      <Node x={228} y={156} w={96} h={148} bar="stroke-butter-deep" dashed />
      <text className={HEAD}>
        <tspan x={246} y={184}>Keyword</tspan>
        <tspan x={246} y={204}>heuristic</tspan>
      </text>
      <text className={BODY}>
        <tspan x={246} y={232}>No API key,</tspan>
        <tspan x={246} y={252}>or model</tspan>
        <tspan x={246} y={272}>down</tspan>
      </text>

      {/* Merge arrows */}
      <line x1={116} y1={308} x2={116} y2={344} className="stroke-ink-muted" strokeWidth={1.5} markerEnd="url(#cfn-a)" />
      <line
        x1={276}
        y1={308}
        x2={276}
        y2={344}
        className="stroke-ink-muted"
        strokeWidth={1.5}
        strokeDasharray="5 4"
        markerEnd="url(#cfn-a)"
      />

      {/* Answer */}
      <Node x={16} y={348} w={308} h={132} bar="stroke-mint-deep" />
      <text x={38} y={376} className={HEAD}>Fixed schema</text>
      <text className={MONO}>
        <tspan x={38} y={402}>is_job_related · company</tspan>
        <tspan x={38} y={424}>role · status</tspan>
        <tspan x={38} y={446}>confidence</tspan>
      </text>

      <line x1={170} y1={484} x2={170} y2={512} className="stroke-ink-muted" strokeWidth={1.5} markerEnd="url(#cfn-a)" />

      {/* Card */}
      <Node x={16} y={516} w={308} h={64} bar="stroke-accent-strong" />
      <text x={38} y={544} className={HEAD}>One card per company</text>
      <text x={38} y={566} className={BODY}>Sorted by the latest email</text>
    </svg>
  );
}

export default function ClassifierFlow() {
  return (
    <figure className="my-8">
      <div className={FRAME}>
        <Wide />
        <Narrow />
      </div>
    </figure>
  );
}
