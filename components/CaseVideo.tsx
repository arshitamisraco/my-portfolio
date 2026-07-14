"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PixelCloud from "./PixelCloud";

type FrameTone = "pink" | "lavender" | "sky" | "mint" | "butter" | "peach";

const TONES: Record<FrameTone, string> = {
  pink: "bg-surface",
  lavender: "bg-lavender-soft",
  sky: "bg-sky-soft",
  mint: "bg-mint-soft",
  butter: "bg-butter-soft",
  peach: "bg-peach-soft",
};

const CLOUD: Record<FrameTone, "pink" | "lavender" | "sky"> = {
  pink: "pink",
  lavender: "lavender",
  sky: "sky",
  mint: "sky",
  butter: "pink",
  peach: "pink",
};

const SIZES = {
  mobile: "max-w-[320px]",
  sm: "max-w-[420px]",
  md: "max-w-[520px]",
  lg: "max-w-[680px]",
  full: "max-w-full",
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

interface CaseVideoProps {
  /** Web-safe mp4 under public/, e.g. "/videos/design-system/onboarding-web-dark.mp4". */
  src: string;
  /** Poster frame under public/ — shown until the clip starts (or instead of it under reduced motion). */
  poster: string;
  title: string;
  /** 1–2 sentences describing what the clip shows — read by screen readers. */
  description: string;
  caption?: string;
  /** Intrinsic poster dimensions — reserve the exact aspect so there's no layout shift or crop. */
  width: number;
  height: number;
  tone?: FrameTone;
  size?: keyof typeof SIZES;
  /** Drop the outer vertical margin — use when nested in a grid that provides spacing. */
  flush?: boolean;
  /**
   * "autoplay" (default): short loop that plays muted while in view.
   * "click": poster with a play button — use for longer clips that shouldn't run unasked.
   */
  mode?: "autoplay" | "click";
}

/**
 * A real case-study video: autoplays muted and loops while in the viewport, pauses when
 * scrolled away, and stays lazy (`preload="none"` — nothing downloads until the clip is
 * about to enter view). Under prefers-reduced-motion it never autoplays: the poster and a
 * play button render instead, click-to-play with controls. Framed to match ImageFrame's
 * real-image treatment so stills and clips read as one system.
 */
export default function CaseVideo({
  src,
  poster,
  title,
  description,
  caption,
  width,
  height,
  tone = "pink",
  size = "full",
  flush = false,
  mode = "autoplay",
}: CaseVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    setReducedMotion(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || mode !== "autoplay") return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Re-check the media query directly so a stale first render can't autoplay.
        if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px 160px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion, mode]);

  return (
    <figure
      className={`${flush ? "" : "my-8"} ${SIZES[size]} ${size === "full" ? "" : "mx-auto"}`}
    >
      <div
        className={`overflow-hidden rounded-frame border border-line p-2 sm:p-3 ${TONES[tone]}`}
      >
        {/* The poster is always rendered at its intrinsic size — it defines the box height
            (no collapse), and the <video> overlays it exactly. */}
        <div className="relative overflow-hidden rounded-[10px]">
          <Image
            src={poster}
            alt=""
            width={width}
            height={height}
            className="block h-auto w-full"
            sizes="(min-width: 1024px) 680px, 100vw"
          />
          {!reducedMotion && mode === "autoplay" ? (
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              muted
              loop
              playsInline
              preload="none"
              aria-label={`${title}. ${description}`}
              className="absolute inset-0 h-full w-full"
            >
              <track kind="captions" />
            </video>
          ) : active ? (
            <video
              src={src}
              poster={poster}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full bg-ink"
            >
              <track kind="captions" />
            </video>
          ) : (
            <button
              type="button"
              onClick={() => setActive(true)}
              aria-label={`Play video: ${title}. ${description}`}
              className="group absolute inset-0 h-full w-full cursor-pointer"
            >
              <span className="absolute inset-0 bg-ink/5 transition-colors group-hover:bg-ink/0" />
              <PixelCloud
                shape="puff"
                variant={CLOUD[tone]}
                size={32}
                className="absolute right-3 top-3 opacity-80"
              />
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill border border-line bg-surface-raised transition-transform group-hover:scale-105"
              >
                <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden="true">
                  <path d="M5 3.5v11l9-5.5-9-5.5z" fill="var(--color-accent-strong)" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-caption text-ink-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
