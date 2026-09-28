/**
 * The session network behind the build and the redesign: two rows, each a contract
 * passed through parallel sessions. Server component, inline SVG, tokens only.
 * Two layouts: a horizontal two-row flow from lg up, a vertical one below it.
 */

type Chip = "me" | "fable" | "sonnet" | "opus";

interface Node {
  title: string;
  lines: string[];
  chip?: { label: string; tone: Chip };
  done?: boolean;
}

interface Row {
  name: string;
  note: string;
  before: Node[];
  pair: [Node, Node];
  after: Node[];
}

const ROWS: Row[] = [
  {
    name: "Build",
    note: "In parallel, blind to each other's code",
    before: [
      { title: "Brief", lines: ["Goal and", "constraints"], chip: { label: "Me", tone: "me" } },
      { title: "Planner", lines: ["Writes the contract,", "PROJECT.md"], chip: { label: "Fable", tone: "fable" } },
    ],
    pair: [
      { title: "Backend", lines: ["Data, API, mock"], chip: { label: "Sonnet", tone: "sonnet" } },
      { title: "Frontend", lines: ["Board, components"], chip: { label: "Sonnet", tone: "sonnet" } },
    ],
    after: [
      { title: "Integration", lines: ["Playwright smoke", "test, README"], chip: { label: "Sonnet", tone: "sonnet" } },
      { title: "Security review", lines: ["Auth, input checks"], chip: { label: "Opus", tone: "opus" } },
    ],
  },
  {
    name: "Redesign",
    note: "In parallel",
    before: [
      { title: "Design doc", lines: ["DESIGN.md: tokens,", "components, motion"] },
      { title: "Primitives", lines: ["Tokens, glass,", "motion, one session"] },
    ],
    pair: [
      { title: "Board session", lines: ["Columns and cards"] },
      { title: "Detail sheet", lines: ["Panel, sign-in"] },
    ],
    after: [
      { title: "Screenshot", lines: ["review, then fixes"] },
      { title: "Shipped", lines: ["Same day"], done: true },
    ],
  },
];

const TITLE = "The session network behind the build and the redesign";
const DESC =
  "Build: my brief goes to a planner on Fable that writes the PROJECT.md contract; a backend session and a frontend session, both on Sonnet, build in parallel; a Sonnet integration session runs a Playwright smoke test; an Opus reviewer does a security pass. Redesign: a DESIGN.md doc with tokens and component contracts goes to a primitives session; a board session and a detail sheet session work in parallel; a screenshot review follows, and it ships.";

const FRAME = "overflow-hidden rounded-frame border border-line bg-lavender-soft p-2 sm:p-3";

const CHIP: Record<Chip, { rect: string; text: string }> = {
  me: { rect: "fill-butter-soft", text: "fill-butter-deep" },
  fable: { rect: "fill-lavender-soft", text: "fill-lavender-deep" },
  sonnet: { rect: "fill-mint-soft", text: "fill-mint-deep" },
  opus: { rect: "fill-peach-soft", text: "fill-peach-deep" },
};

const HEAD = "font-sans fill-ink text-[14px] font-semibold";
const BODY = "font-sans fill-ink-muted text-[13px]";
const BODY_NARROW = "font-sans fill-ink-muted text-[14px]";
const ROW_LABEL = "font-sans fill-accent-deep text-[13px] font-semibold tracking-[0.14em]";

function Markers({ id }: { id: string }) {
  return (
    <defs>
      <marker id={`${id}-a`} markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
        <path d="M0 0 L6 3 L0 6 Z" className="fill-ink-muted" />
      </marker>
    </defs>
  );
}

function Box({
  node,
  x,
  y,
  w,
  h,
  narrow,
}: {
  node: Node;
  x: number;
  y: number;
  w: number;
  h: number;
  narrow?: boolean;
}) {
  const chip = node.chip;
  const cw = chip ? chip.label.length * 8 + 20 : 0;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        className={`${node.done ? "fill-mint-soft" : "fill-surface-raised"} stroke-line`}
        strokeWidth={1}
      />
      <text x={x + 14} y={y + 30} className={HEAD}>
        {node.title}
      </text>
      <text className={narrow ? BODY_NARROW : BODY}>
        {(narrow && w > 200 ? [node.lines.join(" ")] : node.lines).map((l, i) => (
          <tspan key={l} x={x + 14} y={y + 52 + i * 18}>
            {l}
          </tspan>
        ))}
      </text>
      {chip && (
        <g>
          <rect
            x={x + w - cw - 10}
            y={y - 11}
            width={cw}
            height={22}
            rx={11}
            className={`${CHIP[chip.tone].rect} stroke-line`}
            strokeWidth={1}
          />
          <text
            x={x + w - cw / 2 - 10}
            y={y + 4}
            textAnchor="middle"
            className={`font-sans text-[13px] font-semibold ${CHIP[chip.tone].text}`}
          >
            {chip.label}
          </text>
        </g>
      )}
    </g>
  );
}

const ARROW = { className: "stroke-ink-muted", strokeWidth: 1.5, fill: "none" } as const;

/* ---------------- Wide: two horizontal rows ---------------- */

const W = 152;
const GAP = 42;
const X0 = 36;
const NH = 84;
const PAIR_GAP = 16;
const ROW_H = NH * 2 + PAIR_GAP;
const colX = (c: number) => X0 + c * (W + GAP);

function Wide() {
  const mkRow = (row: Row, top: number, id: string) => {
    const cy = top + ROW_H / 2;
    const single = (n: Node, c: number) => (
      <Box key={`${id}-${n.title}`} node={n} x={colX(c)} y={cy - NH / 2} w={W} h={NH} />
    );
    const y1 = top + NH / 2;
    const y2 = top + NH + PAIR_GAP + NH / 2;
    const xPair = colX(2);
    const xAfter = colX(3);
    const xMidL = xPair - GAP / 2;
    const xMidR = xPair + W + GAP / 2;
    return (
      <g key={id}>
        <text x={X0} y={top - 26} className={ROW_LABEL}>
          {row.name.toUpperCase()}
        </text>
        {row.before.map((n, i) => single(n, i))}
        <Box node={row.pair[0]} x={xPair} y={top} w={W} h={NH} />
        <Box node={row.pair[1]} x={xPair} y={top + NH + PAIR_GAP} w={W} h={NH} />
        {row.after.map((n, i) => single(n, 3 + i))}

        {/* brief -> planner */}
        <path d={`M ${colX(0) + W + 4} ${cy} H ${colX(1) - 6}`} {...ARROW} markerEnd="url(#sn-a)" />
        {/* planner -> pair (fork) */}
        <path d={`M ${colX(1) + W + 4} ${cy} H ${xMidL}`} {...ARROW} />
        <path d={`M ${xMidL} ${cy} V ${y1} H ${xPair - 6}`} {...ARROW} markerEnd="url(#sn-a)" />
        <path d={`M ${xMidL} ${cy} V ${y2} H ${xPair - 6}`} {...ARROW} markerEnd="url(#sn-a)" />
        {/* pair -> after (merge) */}
        <path d={`M ${xPair + W + 4} ${y1} H ${xMidR} V ${cy}`} {...ARROW} />
        <path d={`M ${xPair + W + 4} ${y2} H ${xMidR} V ${cy}`} {...ARROW} />
        <path d={`M ${xMidR} ${cy} H ${xAfter - 6}`} {...ARROW} markerEnd="url(#sn-a)" />
        {/* after -> last */}
        <path d={`M ${xAfter + W + 4} ${cy} H ${colX(4) - 6}`} {...ARROW} markerEnd="url(#sn-a)" />

        {/* parallel note */}
        <text x={xPair + W / 2} y={top + ROW_H + 22} textAnchor="middle" className={BODY}>
          {row.note}
        </text>
      </g>
    );
  };

  const top1 = 62;
  const top2 = top1 + ROW_H + 86;
  return (
    <svg
      viewBox={`0 0 1000 ${top2 + ROW_H + 40}`}
      className="hidden h-auto w-full lg:block"
      role="img"
      aria-labelledby="sn-wide-title sn-wide-desc"
    >
      <title id="sn-wide-title">{TITLE}</title>
      <desc id="sn-wide-desc">{DESC}</desc>
      <Markers id="sn" />
      {mkRow(ROWS[0], top1, "r1")}
      {mkRow(ROWS[1], top2, "r2")}
    </svg>
  );
}

/* ---------------- Narrow: two vertical stacks ---------------- */

const NW = 308;
const NX = 16;
const NNH = 60;
const V_GAP = 24;

function Narrow() {
  let cursor = 12;
  const els: React.ReactNode[] = [];
  const arrow = (x: number, y1: number, y2: number, key: string) =>
    els.push(
      <line key={key} x1={x} y1={y1} x2={x} y2={y2} {...ARROW} markerEnd="url(#snn-a)" />,
    );

  ROWS.forEach((row, ri) => {
    els.push(
      <text key={`l${ri}`} x={NX} y={cursor + 12} className={ROW_LABEL}>
        {row.name.toUpperCase()}
      </text>,
    );
    cursor += 34;
    const nodes: (Node | [Node, Node])[] = [...row.before, row.pair, ...row.after];
    nodes.forEach((n, i) => {
      const isPair = Array.isArray(n);
      const h = isPair ? 74 : NNH;
      if (isPair) {
        const pw = (NW - 12) / 2;
        els.push(
          <Box key={`p${ri}a`} node={n[0]} x={NX} y={cursor} w={pw} h={h} narrow />,
          <Box key={`p${ri}b`} node={n[1]} x={NX + pw + 12} y={cursor} w={pw} h={h} narrow />,
        );
      } else {
        els.push(<Box key={`n${ri}${i}`} node={n} x={NX} y={cursor} w={NW} h={h} narrow />);
      }
      cursor += h;
      if (i < nodes.length - 1) {
        // Arrows leave and enter at the box centre(s); a pair gets two.
        const next = nodes[i + 1];
        const xs = (m: Node | [Node, Node]) =>
          Array.isArray(m) ? [NX + 30, NX + (NW - 12) / 2 + 12 + 30] : [NX + NW / 2];
        const from = xs(n);
        const to = xs(next);
        const xsAll = from.length >= to.length ? from : to;
        xsAll.forEach((x, k) => arrow(x, cursor + 3, cursor + V_GAP - 3, `a${ri}${i}${k}`));
        cursor += V_GAP;
      }
    });
    cursor += 40;
  });

  return (
    <svg
      viewBox={`0 0 340 ${cursor - 12}`}
      className="mx-auto block h-auto w-full max-w-[460px] lg:hidden"
      role="img"
      aria-labelledby="snn-title snn-desc"
    >
      <title id="snn-title">{TITLE}</title>
      <desc id="snn-desc">{DESC}</desc>
      <Markers id="snn" />
      {els}
    </svg>
  );
}

export default function SessionNetwork() {
  return (
    <figure className="my-8">
      <div className={FRAME}>
        <Wide />
        <Narrow />
      </div>
    </figure>
  );
}
