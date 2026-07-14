export type HobbyIconName = "gym" | "hiking" | "vlogging" | "cooking";

/*
 * Pixel-art icons in the same idiom as PixelCloud: a char grid rendered as 1×1
 * <rect> cells with crispEdges. "X" = ink body, "O" = accent highlight, "." = empty.
 * All colors come from @theme tokens — no raw hex. Kept blocky and simple to match
 * the 8-bit cloud motif.
 */
const GRIDS: Record<HobbyIconName, string[]> = {
  // Dumbbell
  gym: [
    "............",
    "............",
    "............",
    ".XX......XX.",
    ".XX......XX.",
    "XXXX....XXXX",
    "XXXXOOOOXXXX",
    "XXXXOOOOXXXX",
    "XXXX....XXXX",
    ".XX......XX.",
    ".XX......XX.",
    "............",
  ],
  // Mountain with a snow cap
  hiking: [
    "............",
    "............",
    "......O.....",
    ".....OXO....",
    "....XXXXX...",
    "...XXXXXXX..",
    "..XXX.XXXXX.",
    ".XXXXXXXXXXX",
    "XXXXXXXXXXXX",
    "XXXXXXXXXXXX",
    "............",
    "............",
  ],
  // Video camera: body block + a lens/record light (accent) on the right
  vlogging: [
    "............",
    "............",
    "........O...",
    ".XXXXXX.OO..",
    ".XXXXXX.OOO.",
    ".XXXXXXOOOO.",
    ".XXXXXXOOOO.",
    ".XXXXXX.OOO.",
    ".XXXXXX.OO..",
    ".XXXXXX.O...",
    "............",
    "............",
  ],
  // Frying pan (top view): round pan with an accent interior + a handle to the right
  cooking: [
    "............",
    "............",
    "...XXXXX....",
    "..XXXXXXX...",
    ".XXOOOOOXX..",
    ".XXOOOOOXXXX",
    ".XXOOOOOXX..",
    "..XXXXXXX...",
    "...XXXXX....",
    "............",
    "............",
    "............",
  ],
};

const COLORS: Record<string, string> = {
  X: "var(--color-ink)",
  O: "var(--color-accent-strong)",
};

interface HobbyIconProps {
  name: HobbyIconName;
  /** Rendered width in px; height follows the square pixel grid. */
  size?: number;
  className?: string;
}

export default function HobbyIcon({ name, size = 44, className }: HobbyIconProps) {
  const grid = GRIDS[name];
  const rows = grid.length;
  const cols = grid[0].length;

  const cells: { r: number; c: number; color: string }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const ch = grid[r][c];
      if (ch === ".") continue;
      cells.push({ r, c, color: COLORS[ch] });
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
    >
      {cells.map(({ r, c, color }) => (
        <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill={color} />
      ))}
    </svg>
  );
}
