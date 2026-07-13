"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

const CLOUD: Record<FrameTone, "pink" | "lavender" | "sky"> = {
  pink: "pink",
  lavender: "lavender",
  sky: "sky",
  mint: "sky",
  butter: "pink",
  peach: "pink",
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export interface HeroClip {
  /** Web-safe mp4 under public/. */
  src: string;
  /** Poster frame under public/ — shown until the clip plays (or instead of it under reduced motion). */
  poster: string;
  /** Intrinsic poster dimensions — reserve the exact aspect so there's no layout shift. */
  width: number;
  height: number;
  /** Short name for screen readers. */
  title: string;
  /** 1–2 sentences describing what the clip shows — read by screen readers. */
  description: string;
  tone?: FrameTone;
}

const SIZES = {
  portrait: "(min-width: 1024px) 260px, (min-width: 640px) 30vw, 62vw",
  landscape: "(min-width: 1024px) 430px, (min-width: 640px) 46vw, 90vw",
};

function Clip({
  clip,
  orientation,
}: {
  clip: HeroClip;
  orientation: keyof typeof SIZES;
}) {
  const { src, poster, width, height, title, description, tone = "pink" } = clip;
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
    if (reducedMotion) return;
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
      { threshold: 0.3 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [reducedMotion]);

  return (
    <figure className={`overflow-hidden rounded-frame border border-line p-2 sm:p-3 ${TONES[tone]}`}>
      {/* The poster always renders at its intrinsic size — it defines the box height
          (no collapse), and the <video> overlays it exactly. */}
      <div className="relative overflow-hidden rounded-[10px]">
        <Image
          src={poster}
          alt=""
          width={width}
          height={height}
          className="block h-auto w-full"
          sizes={SIZES[orientation]}
        />
        {!reducedMotion ? (
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
              size={28}
              className="absolute right-3 top-3 opacity-80"
            />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill border border-line bg-surface-raised transition-transform group-hover:scale-105"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M5 3.5v11l9-5.5-9-5.5z" fill="var(--color-accent-strong)" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </figure>
  );
}

interface HeroMontageProps {
  /** Optional single framing line above the band. */
  label?: string;
  /** Portrait (mobile) clips — lead row. Staggered on desktop, a swipeable strip on small screens. */
  portrait: HeroClip[];
  /** Landscape (web) clips — supporting row beneath. */
  landscape: HeroClip[];
}

/**
 * The visual hero of a case study: a montage band of product clips placed before the
 * written body. No captions — it's a first impression, not an explanation. Clips
 * autoplay muted and loop while in view and pause when scrolled away; everything
 * lazy-loads behind its poster, and under prefers-reduced-motion each clip is a poster
 * with a play button instead.
 */
export default function HeroMontage({ label, portrait, landscape }: HeroMontageProps) {
  return (
    <section aria-label="A quick look at the redesigned product" className="relative my-10">
      {label && <p className="text-style-eyebrow text-ink-muted">{label}</p>}
      <PixelCloud
        shape="wisp"
        variant="sky"
        size={72}
        className="absolute -top-4 right-0 hidden opacity-50 sm:block"
        aria-hidden
      />

      {/* Lead row: mobile clips — a grid on desktop, a snap strip on small screens. */}
      <div className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:grid sm:snap-none sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:pb-0">
        {portrait.map((clip) => (
          <div key={clip.src} className="w-[62vw] flex-none snap-center sm:w-auto">
            <Clip clip={clip} orientation="portrait" />
          </div>
        ))}
      </div>

      {/* Supporting row: web clips. */}
      <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
        {landscape.map((clip) => (
          <Clip key={clip.src} clip={clip} orientation="landscape" />
        ))}
      </div>
    </section>
  );
}
