"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PixelCloud from "@/components/PixelCloud";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

interface HeroVideoMediaProps {
  src: string;
  poster: string;
  width: number;
  height: number;
  title: string;
  description: string;
  sizes: string;
  cloud: "pink" | "lavender" | "sky";
  /** Stretch the poster to the row height (desktop only) — matches Tile's stack-row fix-up. */
  fill?: boolean;
  /** Same as fill, but applied at every breakpoint — used by fixed-height scroll tiles. */
  fillAlways?: boolean;
}

/**
 * The video counterpart to a still inside a HeroStills tile — same poster-reserves-height
 * trick as CaseVideo/HeroMontage, sized for the mosaic's tighter frame. Autoplays muted
 * while in view; under prefers-reduced-motion it's a poster with a play button instead.
 */
export default function HeroVideoMedia({
  src,
  poster,
  width,
  height,
  title,
  description,
  sizes,
  cloud,
  fill,
  fillAlways,
}: HeroVideoMediaProps) {
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
    <>
      <Image
        src={poster}
        alt=""
        width={width}
        height={height}
        sizes={sizes}
        className={`block h-auto w-full ${
          fillAlways
            ? "absolute inset-0 h-full object-cover"
            : fill
              ? "sm:absolute sm:inset-0 sm:h-full sm:object-cover"
              : ""
        }`}
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
          className="absolute inset-0 h-full w-full object-cover"
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
          className="absolute inset-0 h-full w-full bg-ink object-cover"
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
            variant={cloud}
            size={24}
            className="absolute right-2 top-2 opacity-80"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill border border-line bg-surface-raised transition-transform group-hover:scale-105"
          >
            <svg width="14" height="14" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M5 3.5v11l9-5.5-9-5.5z" fill="var(--color-accent-strong)" />
            </svg>
          </span>
        </button>
      )}
    </>
  );
}
