import type { CSSProperties } from "react";

export type CloudShape = "cumulus" | "puff" | "wisp";
export type CloudVariant = "pink" | "lavender" | "sky";

/*
 * Pixel maps: each string is a row on the pixel grid.
 * "X" = filled cell. Edges (cells touching sky) render one
 * step deeper for that 8-bit dithered-outline definition.
 */
const SHAPES: Record<CloudShape, string[]> = {
  cumulus: [
    "....XXX.....",
    "..XXXXXX.XX.",
    ".XXXXXXXXXX.",
    "XXXXXXXXXXXX",
    "XXXXXXXXXXXX",
    ".XXXXXXXXXX.",
  ],
  puff: [
    "..XXXX..",
    ".XXXXXX.",
    "XXXXXXXX",
    "XXXXXXXX",
    ".XXXXXX.",
  ],
  wisp: [
    "...XXXX....XXX..",
    ".XXXXXXXXXXXXXX.",
    "XXXXXXXXXXXXXXXX",
    "..XXXXXXXXXXX...",
  ],
};

const VARIANT_VARS: Record<CloudVariant, { fill: string; edge: string }> = {
  pink: { fill: "var(--color-cloud-pink)", edge: "var(--color-cloud-pink-edge)" },
  lavender: {
    fill: "var(--color-cloud-lavender)",
    edge: "var(--color-cloud-lavender-edge)",
  },
  sky: { fill: "var(--color-cloud-sky)", edge: "var(--color-cloud-sky-edge)" },
};

interface PixelCloudProps {
  shape?: CloudShape;
  variant?: CloudVariant;
  /** Rendered width in px; height follows the pixel grid's aspect ratio. */
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export default function PixelCloud({
  shape = "cumulus",
  variant = "pink",
  size = 96,
  className,
  style,
}: PixelCloudProps) {
  const grid = SHAPES[shape];
  const rows = grid.length;
  const cols = grid[0].length;
  const colors = VARIANT_VARS[variant];

  const filled = (r: number, c: number) =>
    r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c] === "X";

  const cells: { r: number; c: number; edge: boolean }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!filled(r, c)) continue;
      const edge =
        !filled(r - 1, c) || !filled(r + 1, c) || !filled(r, c - 1) || !filled(r, c + 1);
      cells.push({ r, c, edge });
    }
  }

  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      width={size}
      height={(size / cols) * rows}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      {cells.map(({ r, c, edge }) => (
        <rect
          key={`${r}-${c}`}
          x={c}
          y={r}
          width={1}
          height={1}
          fill={edge ? colors.edge : colors.fill}
        />
      ))}
    </svg>
  );
}
