import type { ReactNode } from "react";

export interface Tile {
  label: string;
  detail?: ReactNode;
}

const TONES = [
  "bg-surface",
  "bg-lavender-soft",
  "bg-sky-soft",
  "bg-mint-soft",
  "bg-butter-soft",
  "bg-peach-soft",
];

interface LabeledTilesProps {
  tiles: Tile[];
  /** Fewer, wider columns for content-heavy tiles like the expert-review pair. */
  columns?: 2 | 3;
}

/** A responsive grid of small bordered tiles — replaces a bulleted list when the
    items are short, parallel labels (surfaces, reviewer takeaways). */
export default function LabeledTiles({ tiles, columns = 3 }: LabeledTilesProps) {
  return (
    <div
      className={`my-6 grid gap-3 sm:grid-cols-2 ${
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
      }`}
    >
      {tiles.map((tile, i) => (
        <div
          key={tile.label}
          className={`rounded-frame border border-line p-4 ${TONES[i % TONES.length]}`}
        >
          <p className="font-display text-h4 font-semibold text-ink">{tile.label}</p>
          {tile.detail && <p className="mt-2 text-body text-ink-muted">{tile.detail}</p>}
        </div>
      ))}
    </div>
  );
}
