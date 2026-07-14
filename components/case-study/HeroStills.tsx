import Image from "next/image";
import PixelCloud from "@/components/PixelCloud";

type FrameTone = "pink" | "lavender" | "sky" | "mint" | "butter" | "peach";

const TONES: Record<FrameTone, string> = {
  pink: "bg-surface",
  lavender: "bg-lavender-soft",
  sky: "bg-sky-soft",
  mint: "bg-mint-soft",
  butter: "bg-butter-soft",
  peach: "bg-peach-soft",
};

export interface HeroStill {
  /** Image under public/. */
  src: string;
  /** Intrinsic pixel dimensions — they drive the mosaic's column math. */
  width: number;
  height: number;
  /** Short description for screen readers; nothing is rendered visibly. */
  alt: string;
  tone?: FrameTone;
}

/** One mosaic cell: a single still, or a vertical stack of stills. */
export type HeroCell = HeroStill | HeroStill[];

const ratio = (still: HeroStill) => still.width / still.height;

/** Aspect ratio of a whole cell — a stack behaves like one image of combined height. */
const cellRatio = (cell: HeroCell) =>
  Array.isArray(cell) ? 1 / cell.reduce((sum, s) => sum + 1 / ratio(s), 0) : ratio(cell);

function Tile({
  still,
  fill,
  sizes,
}: {
  still: HeroStill;
  /** Stretch to the row height (desktop only) instead of rendering at natural aspect —
      used for tiles sharing a row with a stack, whose extra frame chrome would
      otherwise misalign the bottom edge. */
  fill?: boolean;
  sizes: string;
}) {
  const tone = still.tone ?? "pink";
  return (
    <div
      className={`overflow-hidden rounded-frame border border-line p-1.5 ${TONES[tone]} ${
        fill ? "sm:flex sm:h-full sm:flex-col" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-[8px] ${fill ? "sm:min-h-0 sm:flex-1" : ""}`}
      >
        <Image
          src={still.src}
          alt={still.alt}
          width={still.width}
          height={still.height}
          sizes={sizes}
          className={`block h-auto w-full ${
            fill ? "sm:absolute sm:inset-0 sm:h-full sm:object-cover" : ""
          }`}
        />
      </div>
    </div>
  );
}

interface HeroStillsProps {
  /** Optional single framing line above the mosaic. */
  label?: string;
  /** Screen-reader name for the whole band. */
  ariaLabel?: string;
  /**
   * The mosaic, row by row. Within a row, each cell's width is proportional to its
   * aspect ratio, so every cell in a row lands at the same height — a justified
   * gallery. On small screens the rows unstack into a single column.
   */
  rows: HeroCell[][];
}

/**
 * The visual hero of a case study: a composed mosaic of product stills placed before
 * the written body. Deliberately caption-free — a rich first glance, not an
 * explanation. Stills are framed in the site's tinted-border system with tight
 * gutters; the videos these frames come from live in the feature sections below.
 */
export default function HeroStills({ label, ariaLabel, rows }: HeroStillsProps) {
  return (
    <section aria-label={ariaLabel ?? "A first look at the product"} className="relative mb-14">
      {label && <p className="text-style-eyebrow text-ink-muted">{label}</p>}
      <PixelCloud
        shape="wisp"
        variant="lavender"
        size={72}
        className="absolute -top-4 right-0 hidden opacity-50 sm:block"
        aria-hidden
      />
      <div className="mt-5 flex flex-col gap-2 sm:gap-3">
        {rows.map((row, rowIndex) => {
          const rowRatioSum = row.reduce((sum, cell) => sum + cellRatio(cell), 0);
          const rowHasStack = row.some((cell) => Array.isArray(cell));
          return (
            <div
              key={rowIndex}
              className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3"
            >
              {row.map((cell, cellIndex) => {
                const share = cellRatio(cell) / rowRatioSum;
                const sizes = `(min-width: 1024px) ${Math.round(share * 810)}px, (min-width: 640px) ${Math.round(share * 94)}vw, 94vw`;
                return (
                  <div
                    key={cellIndex}
                    className="min-w-0 sm:flex-[var(--cell)]"
                    style={{ "--cell": cellRatio(cell) } as React.CSSProperties}
                  >
                    {Array.isArray(cell) ? (
                      <div className="flex h-full flex-col gap-2 sm:gap-3">
                        {cell.map((still) => (
                          <Tile key={still.src} still={still} sizes={sizes} />
                        ))}
                      </div>
                    ) : (
                      <Tile
                        still={cell}
                        fill={rowHasStack && row.length > 1}
                        sizes={sizes}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
