"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { type Clip, COROS_MIX_CLIPS, type Tone } from "@/lib/carousel";
import PixelCloud from "./PixelCloud";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** After a manual scroll / drag / wheel, wait this long before auto-drift resumes. */
const RESUME_AFTER_INPUT_MS = 2200;

const TONES: Record<Tone, string> = {
  pink: "bg-surface",
  lavender: "bg-lavender-soft",
  sky: "bg-sky-soft",
  mint: "bg-mint-soft",
  butter: "bg-butter-soft",
  peach: "bg-peach-soft",
};

/**
 * Decorative preview marquee of framed clips: a continuous row that auto-drifts
 * left over the on-brand gradient, and that the viewer can also grab and scroll
 * horizontally by hand (drag, wheel, or trackpad). It reads at a glance as the
 * breadth of the work — many surfaces at once, always in motion, independent of
 * any single clip's length.
 *
 * Mechanics: the outer box is a native horizontal scroller. The clip set is
 * rendered 3× and a rAF loop nudges `scrollLeft` forward each frame, wrapping
 * within the middle copy so the loop is seamless in both directions. Any manual
 * input (pointer drag, wheel, touch) pauses the auto-nudge for a beat, then it
 * picks back up from wherever the viewer left it. Clips scrolled outside the
 * frame pause playback (per-card IntersectionObserver) to keep the decode count
 * down. The whole thing is aria-hidden — the containing card carries its own
 * accessible name, so it stays one link. Under prefers-reduced-motion nothing
 * auto-drifts and nothing autoplays (a static, still-scrollable shelf of framed
 * posters instead). Image-only clips (those without a `src`) render as framed
 * stills — used by projects that predate any recorded video.
 *
 * Defaults to the mixed COROS set (the featured landing-page card); pass `clips`
 * for a per-project shelf.
 */
export default function CorosCarousel({ clips = COROS_MIX_CLIPS }: { clips?: Clip[] }) {
  /** Render the set 3× so there's a full copy of slack on each side to wrap into. */
  const COPIES = 3;
  const marquee: Clip[] = Array.from({ length: COPIES }, () => clips).flat();
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const inBox = useRef<Set<HTMLVideoElement>>(new Set());
  const [reducedMotion, setReducedMotion] = useState(false);

  // Refs mirror state for use inside IntersectionObserver / rAF callbacks.
  const reducedMotionRef = useRef(false);
  const inViewRef = useRef(false);
  /** performance.now() timestamp until which auto-drift stays paused for input. */
  const holdUntilRef = useRef(0);

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

  // Auto-drift + seamless wrap, driven off scrollLeft so manual scrolling and
  // the drift share one coordinate. Speed scales with the clip count so the
  // glide reads at a constant pace regardless of how many clips are in the set.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const driftDurationSec = clips.length * 8;
    let started = false;
    let last = performance.now();
    let raf = 0;

    const oneCopy = () => el.scrollWidth / COPIES;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const copy = oneCopy();
      if (copy <= 0) {
        last = now;
        return;
      }

      // Start centered in the middle copy so there's slack to scroll either way.
      if (!started) {
        el.scrollLeft = copy;
        started = true;
        last = now;
        return;
      }

      const dt = Math.min(now - last, 100) / 1000;
      last = now;

      const autoDrift =
        !reducedMotionRef.current && inViewRef.current && now >= holdUntilRef.current;
      if (autoDrift) {
        el.scrollLeft += (copy / driftDurationSec) * dt;
      }

      // Keep the scroll position within the middle copy [copy, 2*copy).
      if (el.scrollLeft >= copy * 2) el.scrollLeft -= copy;
      else if (el.scrollLeft < copy) el.scrollLeft += copy;
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [clips.length]);

  // Manual horizontal control: mouse drag-to-scroll, plus a hold on the
  // auto-drift for any wheel / touch / drag input.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const hold = () => {
      holdUntilRef.current = performance.now() + RESUME_AFTER_INPUT_MS;
    };

    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return hold(); // touch scrolls natively
      dragging = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      hold();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      e.preventDefault();
      el.scrollLeft = startScroll - (e.clientX - startX);
      hold();
    };
    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };

    el.addEventListener("wheel", hold, { passive: true });
    el.addEventListener("touchstart", hold, { passive: true });
    el.addEventListener("touchmove", hold, { passive: true });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("pointerleave", endDrag);
    return () => {
      el.removeEventListener("wheel", hold);
      el.removeEventListener("touchstart", hold);
      el.removeEventListener("touchmove", hold);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("pointerleave", endDrag);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      /* Fixed height, not an aspect ratio: the band's height is a design
         constant, so narrowing the card just crops the shelf horizontally
         (fewer clips in frame at once) instead of shrinking the clips. */
      className="relative h-[220px] overflow-hidden bg-gradient-to-br from-accent-soft via-surface to-sky-soft sm:h-[280px] md:h-[340px]"
    >
      {/* On-brand clouds behind the shelf, echoing the hero. Outside the
          scroller so they hold still while the clips glide past. */}
      <PixelCloud
        shape="cumulus"
        variant="pink"
        size={120}
        className="pointer-events-none absolute left-[4%] top-[10%] z-0 opacity-50"
      />
      <PixelCloud
        shape="wisp"
        variant="lavender"
        size={150}
        className="pointer-events-none absolute bottom-[8%] right-[10%] z-0 opacity-40"
      />

      {/* Native horizontal scroller — auto-drifts, and grab / wheel / swipe all work. */}
      <div
        ref={boxRef}
        className="no-scrollbar relative flex h-full cursor-grab items-center overflow-x-auto overflow-y-hidden overscroll-x-contain [touch-action:pan-x] active:cursor-grabbing"
      >
        <div className="relative flex h-[90%] w-max shrink-0 select-none items-center will-change-scroll">
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
                    draggable={false}
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
    </div>
  );
}
