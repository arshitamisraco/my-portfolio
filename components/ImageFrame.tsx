import Image from "next/image";
import PixelCloud from "./PixelCloud";

interface ImageFrameProps {
  /** When provided, renders the real image; otherwise an intentional styled placeholder. */
  src?: string;
  alt: string;
  caption?: string;
  /** Intrinsic pixel dimensions of the real image — required with `src` so it renders uncropped. */
  width?: number;
  height?: number;
  /**
   * For placeholders: where the final asset should be dropped,
   * e.g. "/images/about/cofounders.jpg" (under public/).
   */
  plannedSrc?: string;
  /** Placeholder-only: forced aspect box. Ignored when a real `src`/`width`/`height` is given. */
  aspect?: "wide" | "photo" | "square";
  /** Real-image max-width. `full` fills the prose column; others cap and center. */
  size?: "mobile" | "sm" | "md" | "lg" | "full";
  /** Drop the outer vertical margin — use when nested in a grid that provides spacing. */
  flush?: boolean;
  tone?: "pink" | "lavender" | "sky" | "mint" | "butter" | "peach";
}

const ASPECTS = {
  wide: "aspect-video",
  photo: "aspect-[4/3]",
  square: "aspect-square",
};

const SIZES = {
  mobile: "max-w-[320px]",
  sm: "max-w-[420px]",
  md: "max-w-[520px]",
  lg: "max-w-[600px]",
  full: "max-w-full",
};

const TONES = {
  pink: "bg-surface",
  lavender: "bg-lavender-soft",
  sky: "bg-sky-soft",
  mint: "bg-mint-soft",
  butter: "bg-butter-soft",
  peach: "bg-peach-soft",
};

/**
 * Image slot. With `src`, a framed next/image rendered at its natural aspect (no crop);
 * without, a deliberate pastel placeholder that names the photo that belongs there.
 */
export default function ImageFrame({
  src,
  alt,
  caption,
  width,
  height,
  plannedSrc,
  aspect = "photo",
  size = "full",
  flush = false,
  tone = "pink",
}: ImageFrameProps) {
  return (
    <figure className={`${flush ? "" : "my-8"} ${SIZES[size]} ${size === "full" ? "" : "mx-auto"}`}>
      {src ? (
        <div className={`overflow-hidden rounded-frame border border-line p-2 sm:p-3 ${TONES[tone]}`}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-auto w-full rounded-[10px]"
            sizes="(min-width: 1024px) 660px, 100vw"
          />
        </div>
      ) : (
        <div
          role="img"
          aria-label={`Photo placeholder — ${alt}`}
          className={`relative flex flex-col items-center justify-center gap-3 rounded-frame border border-line px-6 text-center ${ASPECTS[aspect]} ${TONES[tone]}`}
        >
          {/* TODO: drop the photo into public{plannedSrc ?? "/images/..."} and pass it as `src`. */}
          <PixelCloud shape="puff" variant="pink" size={32} className="opacity-80" />
          <p className="max-w-sm text-caption font-medium text-ink">{alt}</p>
          {plannedSrc && (
            <p className="font-mono text-caption text-ink-muted">{plannedSrc}</p>
          )}
        </div>
      )}
      {caption && (
        <figcaption className="mt-3 text-caption text-ink-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
