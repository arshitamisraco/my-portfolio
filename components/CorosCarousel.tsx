"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { type Clip, COROS_MIX_CLIPS, type Tone } from "@/lib/carousel";
import PixelCloud from "./PixelCloud";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const TONES: Record<Tone, string> = {
  pink: "bg-surface",
  lavender: "bg-lavender-soft",
  sky: "bg-sky-soft",
  mint: "bg-mint-soft",
  butter: "bg-butter-soft",
  peach: "bg-peach-soft",
};

/**
 * Decorative preview marquee of framed clips: a continuous, linear row drifting
 * left over the on-brand gradient. It reads at a glance as the breadth of the
 * work — many surfaces at once, always in motion, independent of any single
 * clip's length. Multiple clips play together; those scrolled outside the frame
 * pause (per-card IntersectionObserver) to keep the decode count down. The whole
 * thing is aria-hidden — the containing card carries its own accessible name, so
 * it stays one link. Under prefers-reduced-motion nothing drifts and nothing
 * autoplays: a static shelf of framed posters instead. Image-only clips (those
 * without a `src`) render as framed stills — used by projects that predate any
 * recorded video.
 *
 * Defaults to the mixed COROS set (the featured landing-page card); pass `clips`
 * for a per-project shelf.
 */
export default function CorosCarousel({ clips = COROS_MIX_CLIPS }: { clips?: Clip[] }) {
  /** Render the set twice so a −50% track slide loops seamlessly. */
  const marquee: Clip[] = [...clips, ...clips];
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
            "--coros-marquee-duration": `${clips.length * 5.75}s`,
            animationPlayState: paused ? "paused" : "running",
          } as React.CSSProperties
        }
      >
        {marquee.map((clip, i) => (
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
                {!reducedMotion && clip.src && (
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
