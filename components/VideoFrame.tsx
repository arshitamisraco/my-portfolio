import type { CloudVariant } from "./PixelCloud";
import PixelCloud from "./PixelCloud";

type FrameTone = "pink" | "lavender" | "sky";

const TONE_CLASSES: Record<FrameTone, string> = {
  pink: "from-surface to-accent-soft",
  lavender: "from-surface to-lavender-soft",
  sky: "from-surface to-sky-soft",
};

const TONE_CLOUD: Record<FrameTone, CloudVariant> = {
  pink: "pink",
  lavender: "lavender",
  sky: "sky",
};

interface VideoFrameProps {
  title: string;
  /** 1–2 sentences describing what the video shows — read by screen readers too. */
  description: string;
  /**
   * Final serving path once the clip exists, e.g. "/videos/my-world/reminders-widget.mp4".
   * Raw clips live in content/videos/<case>/ during editing; drop the final file
   * into public/videos/<case>/ and swap this placeholder for a <video> embed.
   */
  src: string;
  tone?: FrameTone;
  aspect?: "video" | "tall";
}

/**
 * Placeholder frame for a case-study video that will be added post-launch.
 * Fully readable without the clip: title + description carry the story.
 */
export default function VideoFrame({
  title,
  description,
  src,
  tone = "pink",
  aspect = "video",
}: VideoFrameProps) {
  return (
    <figure className="my-10">
      <div
        role="img"
        aria-label={`Video placeholder — ${title}. ${description}`}
        className={`relative flex flex-col items-center justify-center gap-4 rounded-frame border border-line bg-gradient-to-br px-6 py-6 text-center ${TONE_CLASSES[tone]} ${
          aspect === "video" ? "aspect-video" : "aspect-[4/5] max-w-md mx-auto"
        }`}
      >
        {/* TODO: drop the edited clip into public{src} and replace this block with a
            lazy-loaded, captioned <video> element (muted, playsInline, controls). */}
        <PixelCloud
          shape="puff"
          variant={TONE_CLOUD[tone]}
          size={36}
          className="absolute right-4 top-4 opacity-70"
        />
        <span
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-pill border border-line bg-surface-raised"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M5 3.5v11l9-5.5-9-5.5z" fill="var(--color-accent-strong)" />
          </svg>
        </span>
        <div>
          <p className="text-h4 font-semibold text-ink">{title}</p>
          <p className="mx-auto mt-1 max-w-md text-caption text-ink-muted">{description}</p>
        </div>
        <p className="font-mono text-caption text-accent-deep/80">{src}</p>
      </div>
      <figcaption className="sr-only">
        {title} — {description}
      </figcaption>
    </figure>
  );
}
