import Image from "next/image";
import PixelCloud from "./PixelCloud";

interface ImageFrameProps {
  /** When provided, renders the real image; otherwise an intentional styled placeholder. */
  src?: string;
  alt: string;
  caption?: string;
  /**
   * For placeholders: where the final asset should be dropped,
   * e.g. "/images/about/cofounders.jpg" (under public/).
   */
  plannedSrc?: string;
  aspect?: "wide" | "photo" | "square";
  tone?: "pink" | "lavender" | "sky" | "mint" | "butter" | "peach";
}

const ASPECTS = {
  wide: "aspect-video",
  photo: "aspect-[4/3]",
  square: "aspect-square",
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
 * Image slot. With `src`, a framed next/image; without, a deliberate
 * pastel placeholder that names the photo that belongs there.
 */
export default function ImageFrame({
  src,
  alt,
  caption,
  plannedSrc,
  aspect = "photo",
  tone = "pink",
}: ImageFrameProps) {
  return (
    <figure className="my-8">
      {src ? (
        <div className={`relative overflow-hidden rounded-frame border border-line ${ASPECTS[aspect]}`}>
          <Image src={src} alt={alt} fill className="object-cover" sizes="(min-width: 1024px) 720px, 100vw" />
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
