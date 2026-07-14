"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PixelCloud from "./PixelCloud";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type Tone = "pink" | "lavender" | "sky" | "mint" | "butter" | "peach";

const TONES: Record<Tone, string> = {
  pink: "bg-surface",
  lavender: "bg-lavender-soft",
  sky: "bg-sky-soft",
  mint: "bg-mint-soft",
  butter: "bg-butter-soft",
  peach: "bg-peach-soft",
};

interface Clip {
  /** Web-safe mp4 under public/. */
  src: string;
  /** Poster frame under public/ — holds the frame before/without playback. */
  poster: string;
  /** Intrinsic media dimensions; the frame is sized to this exact aspect (no crop). */
  width: number;
  height: number;
  alt: string;
  tone: Tone;
  /** Show only the left half of the media (right half trimmed) — carousel-only crop. */
  cropLeftHalf?: boolean;
}

/*
 * A cross-section of the COROS AI work, framed like the case studies and set
 * adrift. Portrait phone clips and landscape web clips both belong here — each
 * sits in its own frame at its own aspect, so the row reads as a shelf of real
 * screens gliding past. Trimmed/downscaled clips live under /coros-carousel/;
 * the rest reference their existing public paths. Tones alternate for rhythm.
 */
const CLIPS: Clip[] = [
  {
    src: "/videos/design-system/landing-web-light.mp4",
    poster: "/images/design-system/posters/landing-web-light.jpg",
    width: 1440,
    height: 936,
    alt: "COROS AI web landing page",
    tone: "pink",
  },
  {
    src: "/videos/coros-carousel/chat-mobile.mp4",
    poster: "/images/coros-carousel/chat-mobile.jpg",
    width: 360,
    height: 784,
    alt: "AI coaching chat on mobile",
    tone: "lavender",
  },
  {
    src: "/videos/my-world/reminders-widget.mp4",
    poster: "/images/my-world/posters/reminders-widget.jpg",
    width: 1440,
    height: 398,
    alt: "My World reminders widget",
    tone: "sky",
    cropLeftHalf: true,
  },
  {
    src: "/videos/coros-carousel/chat-web-dark.mp4",
    poster: "/images/coros-carousel/chat-web-dark.jpg",
    width: 1000,
    height: 650,
    alt: "AI coaching chat conversation in dark mode",
    tone: "peach",
  },
  {
    src: "/videos/coros-carousel/influences-mobile.mp4",
    poster: "/images/coros-carousel/influences-mobile.jpg",
    width: 360,
    height: 784,
    alt: "Choosing influences during onboarding, on mobile",
    tone: "mint",
  },
  {
    src: "/videos/coros-carousel/topics-by-dimension.mp4",
    poster: "/images/coros-carousel/topics-by-dimension.jpg",
    width: 1000,
    height: 372,
    alt: "Coaching topics organised by life dimension",
    tone: "butter",
  },
  {
    src: "/videos/design-system/settings-web-light.mp4",
    poster: "/images/design-system/posters/settings-web-light.jpg",
    width: 1440,
    height: 936,
    alt: "COROS AI settings on web",
    tone: "sky",
  },
  {
    src: "/videos/coros-carousel/breakthrough-widget.mp4",
    poster: "/images/coros-carousel/breakthrough-widget.jpg",
    width: 1000,
    height: 400,
    alt: "Breakthroughs widget summarising insights over time",
    tone: "pink",
  },
];

/** Render the set twice so a −50% track slide loops seamlessly. */
const MARQUEE = [...CLIPS, ...CLIPS];

/**
 * Decorative preview for the featured COROS AI card: a continuous, linear
 * marquee of framed clips drifting left over the on-brand gradient. It reads at
 * a glance as the breadth of the work — many surfaces at once, always in motion,
 * independent of any single clip's length. Multiple clips play together; those
 * scrolled outside the frame pause (per-card IntersectionObserver) to keep the
 * decode count down. The whole thing is aria-hidden — the card carries its own
 * accessible name, so it stays one link. Under prefers-reduced-motion nothing
 * drifts and nothing autoplays: a static shelf of framed posters instead.
 */
export default function CorosCarousel() {
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const inBox = useRef<Set<HTMLVideoElement>>(new Set());
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);

  // Refs mirror state for use inside IntersectionObserver callbacks.
  const reducedMotionRef = useRef(false);
  const inViewRef = useRef(false);

  const settle = (video: HTMLVideoElement) => {
    if (!reducedMotionRef.current && inViewRef.current && inBox.current.has(video)) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  // Track prefers-reduced-motion live (matches CaseVideo).
  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    const apply = (matches: boolean) => {
      reducedMotionRef.current = matches;
      setReducedMotion(matches);
      if (matches) videoRefs.current.forEach((v) => v?.pause());
    };
    apply(mq.matches);
    const onChange = (event: MediaQueryListEvent) => apply(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Pause the whole marquee (drift + playback) when the card is off-screen.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        setInView(entry.isIntersecting);
        videoRefs.current.forEach((v) => v && settle(v));
      },
      { threshold: 0.1, rootMargin: "0px 0px 160px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Per-clip playback gate: only clips currently within the frame play, so the
  // number of decoding videos stays close to what's actually visible.
  useEffect(() => {
    if (reducedMotion) return;
    const box = boxRef.current;
    if (!box) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) inBox.current.add(video);
          else inBox.current.delete(video);
          settle(video);
        }
      },
      { root: box, threshold: 0.01 },
    );
    videoRefs.current.forEach((v) => v && observer.observe(v));
    return () => observer.disconnect();
  }, [reducedMotion]);

  const paused = reducedMotion || !inView;

  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      className="relative flex aspect-[2/1] items-center overflow-hidden bg-gradient-to-br from-accent-soft via-surface to-sky-soft md:aspect-[5/2]"
    >
      {/* On-brand clouds drifting behind the shelf, echoing the hero. */}
      <PixelCloud
        shape="cumulus"
        variant="pink"
        size={120}
        className="pointer-events-none absolute left-[4%] top-[10%] opacity-50"
      />
      <PixelCloud
        shape="wisp"
        variant="lavender"
        size={150}
        className="pointer-events-none absolute bottom-[8%] right-[10%] opacity-40"
      />

      <div
        className="coros-marquee-track relative flex h-[54%] w-max items-center will-change-transform md:h-[60%]"
        style={
          {
            // Scale duration to the clip count so the glide speed stays constant.
            "--coros-marquee-duration": `${CLIPS.length * 5.75}s`,
            animationPlayState: paused ? "paused" : "running",
          } as React.CSSProperties
        }
      >
        {MARQUEE.map((clip, i) => (
          <div key={i} className="h-full shrink-0 pr-3 sm:pr-4">
            <div
              className={`inline-flex h-full rounded-frame border border-line p-1.5 shadow-sm sm:p-2 ${TONES[clip.tone]}`}
            >
              <div
                className="relative h-full overflow-hidden rounded-[8px] bg-surface"
                style={{
                  aspectRatio: `${clip.cropLeftHalf ? clip.width / 2 : clip.width} / ${clip.height}`,
                }}
              >
                <Image
                  src={clip.poster}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 360px, 40vw"
                  className={`object-cover ${clip.cropLeftHalf ? "object-left" : ""}`}
                />
                {!reducedMotion && (
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={clip.src}
                    poster={clip.poster}
                    muted
                    loop
                    playsInline
                    preload="none"
                    className={`absolute inset-0 h-full w-full object-cover ${clip.cropLeftHalf ? "object-left" : ""}`}
                  >
                    <track kind="captions" />
                  </video>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
