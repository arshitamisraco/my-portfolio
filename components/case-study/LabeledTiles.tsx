import type { ReactNode } from "react";

export interface Tile {
  label: string;
  detail?: ReactNode;
}

interface LabeledTilesProps {
  tiles: Tile[];
  /** Accepted for compatibility with existing pages; the list has no columns. */
  columns?: 2 | 3;
}

/** A compact plain list of short labels, each with an optional one-line detail. */
export default function LabeledTiles({ tiles }: LabeledTilesProps) {
  return (
    <ul className="my-6 flex flex-col gap-2">
      {tiles.map((tile) => (
        <li key={tile.label} className="text-body">
          <span className="font-medium text-ink">{tile.label}</span>
          {tile.detail && (
            <>
              {" · "}
              <span className="text-ink-muted">{tile.detail}</span>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
