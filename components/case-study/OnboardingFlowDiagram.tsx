interface Step {
  n: string;
  /** Desktop label, one entry per rendered line. Mobile joins them into one line. */
  label: string[];
  fill: string;
  /** Blocks forward movement until the user chooses or skips. */
  gated?: boolean;
}

const STEPS: Step[] = [
  { n: "1", label: ["Welcome &", "sign-up"], fill: "fill-lavender-soft" },
  { n: "2", label: ["Intro"], fill: "fill-lavender-soft" },
  { n: "3", label: ["Name"], fill: "fill-sky-soft" },
  { n: "4", label: ["Transition"], fill: "fill-sky-soft" },
  { n: "5", label: ["Dimensions"], fill: "fill-surface", gated: true },
  { n: "6", label: ["Influences"], fill: "fill-surface", gated: true },
  { n: "7", label: ["Tone"], fill: "fill-peach-soft", gated: true },
  { n: "8", label: ["Configuring"], fill: "fill-peach-soft" },
];

const TITLE = "The COROS AI onboarding flow";
const DESC =
  "Eight onboarding steps in order, with an optional Skip for now branch around Influences, three gated steps, and a Back path running from Configuring to Name.";

/** Traces a node's rounded left edge, so a gated step reads with the same accent
    left bar the page's callouts use. */
function gateBar(x: number, y: number, h: number, r = 12) {
  return `M ${x + r} ${y} A ${r} ${r} 0 0 0 ${x} ${y + r} L ${x} ${y + h - r} A ${r} ${r} 0 0 0 ${x + r} ${y + h}`;
}

/* ============================================================
   Wide layout — one horizontal track, branch above, Back below.
   ============================================================ */

const W = 118;
const GAP = 38;
const X0 = 15;
const NY = 148;
const NH = 80;
const MID = NY + NH / 2;

const nx = (i: number) => X0 + i * (W + GAP);

function WideFlow() {
  return (
    <svg
      viewBox="0 0 1240 400"
      className="hidden h-auto w-full sm:block"
      role="img"
      aria-labelledby="fd-flow-wide-title fd-flow-wide-desc"
    >
      <title id="fd-flow-wide-title">{TITLE}</title>
      <desc id="fd-flow-wide-desc">{DESC}</desc>

      <defs>
        <marker
          id="fd-arrow-wide"
          markerWidth="8"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0 0 L6 3 L0 6 Z" className="fill-ink-muted" />
        </marker>
        <marker
          id="fd-arrow-wide-accent"
          markerWidth="8"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0 0 L6 3 L0 6 Z" className="fill-accent-strong" />
        </marker>
      </defs>

      {/* Main path */}
      {STEPS.slice(0, -1).map((step, i) => (
        <line
          key={`c-${step.n}`}
          x1={nx(i) + W + 5}
          y1={MID}
          x2={nx(i + 1) - 7}
          y2={MID}
          className="stroke-ink-muted"
          strokeWidth={1.5}
          markerEnd="url(#fd-arrow-wide)"
        />
      ))}

      {/* Steps */}
      {STEPS.map((step, i) => {
        const x = nx(i);
        const two = step.label.length > 1;
        return (
          <g key={step.n}>
            <rect
              x={x}
              y={NY}
              width={W}
              height={NH}
              rx={12}
              className={`${step.fill} stroke-line`}
              strokeWidth={1}
            />
            {step.gated && (
              <path
                d={gateBar(x, NY, NH)}
                className="stroke-accent"
                strokeWidth={4}
                fill="none"
              />
            )}
            <text
              x={x + W / 2}
              y={172}
              textAnchor="middle"
              className="fill-ink-muted text-[10px] font-semibold tracking-[0.14em]"
            >
              {step.n}
            </text>
            <text
              x={x + W / 2}
              y={two ? 192 : 198}
              textAnchor="middle"
              className="fill-ink text-[12px] font-semibold"
            >
              {step.label.map((line, j) => (
                <tspan key={line} x={x + W / 2} dy={j === 0 ? 0 : 15}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}

      {/* Optional branch: Influences → Tone */}
      <path
        d="M 854 148 V 102 Q 854 88 868 88 H 996 Q 1010 88 1010 102 V 140"
        className="stroke-accent-strong"
        strokeWidth={1.5}
        strokeDasharray="5 4"
        fill="none"
        markerEnd="url(#fd-arrow-wide-accent)"
      />
      <text
        x={932}
        y={76}
        textAnchor="middle"
        className="fill-accent-deep text-[11px] font-semibold"
      >
        Skip for now
      </text>

      {/* Name annotation */}
      <path d="M 386 148 V 118" className="stroke-line" strokeWidth={1.5} fill="none" />
      <text x={386} y={94} textAnchor="middle" className="fill-ink-muted text-[11px]">
        <tspan x={386}>The name is captured before any personalization step,</tspan>
        <tspan x={386} dy={14}>
          so every screen after it can address the user directly.
        </tspan>
      </text>

      {/* Back rail */}
      <path
        d="M 1166 228 V 270 Q 1166 284 1152 284 H 400 Q 386 284 386 270 V 234"
        className="stroke-ink-muted"
        strokeWidth={1.5}
        strokeDasharray="5 4"
        fill="none"
        markerEnd="url(#fd-arrow-wide)"
      />
      <text
        x={776}
        y={304}
        textAnchor="middle"
        className="fill-ink-muted text-[11px] font-semibold"
      >
        Back, on every step from Name onward
      </text>

      {/* Legend */}
      <g>
        <rect
          x={15}
          y={332}
          width={28}
          height={18}
          rx={5}
          className="fill-surface stroke-line"
          strokeWidth={1}
        />
        <text x={51} y={345} className="fill-ink-muted text-[11px]">
          Onboarding step
        </text>

        <rect
          x={190}
          y={332}
          width={28}
          height={18}
          rx={5}
          className="fill-surface stroke-line"
          strokeWidth={1}
        />
        <path
          d={gateBar(190, 332, 18, 5)}
          className="stroke-accent"
          strokeWidth={4}
          fill="none"
        />
        <text x={226} y={345} className="fill-ink-muted text-[11px]">
          Gated: nothing advances until the user chooses or skips
        </text>

        <line
          x1={600}
          y1={341}
          x2={636}
          y2={341}
          className="stroke-accent-strong"
          strokeWidth={1.5}
          strokeDasharray="5 4"
        />
        <text x={644} y={345} className="fill-ink-muted text-[11px]">
          Optional path
        </text>

        <line
          x1={760}
          y1={341}
          x2={796}
          y2={341}
          className="stroke-ink-muted"
          strokeWidth={1.5}
          strokeDasharray="5 4"
        />
        <text x={804} y={345} className="fill-ink-muted text-[11px]">
          Back
        </text>
      </g>
    </svg>
  );
}

/* ============================================================
   Narrow layout — the same flow restructured as a vertical
   stack: Back rail on the left, optional branch on the right.
   ============================================================ */

const MX = 64;
const MW = 210;
const MH = 56;

/** Top edge of each step. The gap after Name is widened to hold its annotation. */
const MY = [100, 188, 276, 388, 476, 564, 652, 740];

function NarrowFlow() {
  return (
    <svg
      viewBox="0 0 360 960"
      className="h-auto w-full sm:hidden"
      role="img"
      aria-labelledby="fd-flow-narrow-title fd-flow-narrow-desc"
    >
      <title id="fd-flow-narrow-title">{TITLE}</title>
      <desc id="fd-flow-narrow-desc">{DESC}</desc>

      <defs>
        <marker
          id="fd-arrow-narrow"
          markerWidth="8"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0 0 L6 3 L0 6 Z" className="fill-ink-muted" />
        </marker>
        <marker
          id="fd-arrow-narrow-accent"
          markerWidth="8"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0 0 L6 3 L0 6 Z" className="fill-accent-strong" />
        </marker>
      </defs>

      {/* Main path */}
      {STEPS.slice(0, -1).map((step, i) => (
        <line
          key={`mc-${step.n}`}
          x1={MX + MW / 2}
          y1={MY[i] + MH + 5}
          x2={MX + MW / 2}
          y2={MY[i + 1] - 7}
          className="stroke-ink-muted"
          strokeWidth={1.5}
          markerEnd="url(#fd-arrow-narrow)"
        />
      ))}

      {/* Steps */}
      {STEPS.map((step, i) => (
        <g key={step.n}>
          <rect
            x={MX}
            y={MY[i]}
            width={MW}
            height={MH}
            rx={12}
            className={`${step.fill} stroke-line`}
            strokeWidth={1}
          />
          {step.gated && (
            <path
              d={gateBar(MX, MY[i], MH)}
              className="stroke-accent"
              strokeWidth={4}
              fill="none"
            />
          )}
          <text
            x={MX + 20}
            y={MY[i] + 23}
            className="fill-ink-muted text-[10px] font-semibold tracking-[0.14em]"
          >
            {step.n}
          </text>
          <text
            x={MX + 20}
            y={MY[i] + 42}
            className="fill-ink text-[13px] font-semibold"
          >
            {step.label.join(" ")}
          </text>
        </g>
      ))}

      {/* Optional branch: Influences → Tone */}
      <path
        d="M 274 592 H 286 Q 300 592 300 606 V 666 Q 300 680 286 680 H 282"
        className="stroke-accent-strong"
        strokeWidth={1.5}
        strokeDasharray="5 4"
        fill="none"
        markerEnd="url(#fd-arrow-narrow-accent)"
      />
      <text x={308} y={590} className="fill-accent-deep text-[10px] font-semibold">
        <tspan x={308}>Skip</tspan>
        <tspan x={308} dy={12}>
          for now
        </tspan>
      </text>

      {/* Name annotation */}
      <text x={MX + 20} y={352} className="fill-ink-muted text-[10px]">
        <tspan x={MX + 20}>Captured before any personalization step,</tspan>
        <tspan x={MX + 20} dy={13}>
          so later screens can address the user directly.
        </tspan>
      </text>

      {/* Back rail */}
      <path
        d="M 64 768 H 48 Q 34 768 34 754 V 318 Q 34 304 48 304 H 56"
        className="stroke-ink-muted"
        strokeWidth={1.5}
        strokeDasharray="5 4"
        fill="none"
        markerEnd="url(#fd-arrow-narrow)"
      />
      <text
        x={18}
        y={536}
        textAnchor="middle"
        transform="rotate(-90 18 536)"
        className="fill-ink-muted text-[10px] font-semibold"
      >
        Back, from Name onward
      </text>

      {/* Legend */}
      <g>
        <rect
          x={34}
          y={830}
          width={28}
          height={18}
          rx={5}
          className="fill-surface stroke-line"
          strokeWidth={1}
        />
        <text x={72} y={843} className="fill-ink-muted text-[11px]">
          Onboarding step
        </text>

        <rect
          x={34}
          y={858}
          width={28}
          height={18}
          rx={5}
          className="fill-surface stroke-line"
          strokeWidth={1}
        />
        <path
          d={gateBar(34, 858, 18, 5)}
          className="stroke-accent"
          strokeWidth={4}
          fill="none"
        />
        <text x={72} y={871} className="fill-ink-muted text-[11px]">
          Gated until a choice or skip
        </text>

        <line
          x1={34}
          y1={895}
          x2={62}
          y2={895}
          className="stroke-accent-strong"
          strokeWidth={1.5}
          strokeDasharray="5 4"
        />
        <text x={72} y={899} className="fill-ink-muted text-[11px]">
          Optional path
        </text>

        <line
          x1={34}
          y1={923}
          x2={62}
          y2={923}
          className="stroke-ink-muted"
          strokeWidth={1.5}
          strokeDasharray="5 4"
        />
        <text x={72} y={927} className="fill-ink-muted text-[11px]">
          Back
        </text>
      </g>
    </svg>
  );
}

/**
 * The shipped onboarding flow, drawn once for wide screens as a horizontal track
 * and once for narrow ones as a vertical stack. Only one is ever displayed, so the
 * hidden layout is also out of the accessibility tree; the ordered list below
 * carries the sequence and its rules for screen readers.
 */
export default function OnboardingFlowDiagram() {
  return (
    <div className="my-8 rounded-frame border border-line bg-surface-raised p-4 sm:p-6">
      <WideFlow />
      <NarrowFlow />
      <ol className="sr-only">
        <li>Welcome and sign-up.</li>
        <li>Intro.</li>
        <li>Name. Back becomes available here and on every step after it.</li>
        <li>Transition, which addresses the user by the name they just gave.</li>
        <li>Dimensions. The step is gated: it does not advance until the user selects.</li>
        <li>
          Influences. The step is gated but optional, so it advances on either a
          selection or Skip for now. Both routes lead to Tone.
        </li>
        <li>Tone. The step is gated: it does not advance until the user chooses a mode.</li>
        <li>Configuring, the final screen.</li>
      </ol>
    </div>
  );
}
