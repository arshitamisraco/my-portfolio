"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const NUMBER_PATTERN = /^(\D*)(\d+(?:\.\d+)?)(.*)$/;

interface CountUpProps {
  /** Display string, e.g. "55%", "54+", "1 day". A leading number is animated; the rest stays put. */
  value: string;
  className?: string;
}

/**
 * Counts the numeric part of `value` up from 0 the first time it scrolls into view.
 * The server and the first client render both show the final value; the starting
 * "0" is only applied in an effect, and only when motion is allowed (detected after
 * mount, like Reveal.tsx), so reduced-motion users always see the final value.
 */
export default function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [text, setText] = useState(value);
  const [armed, setArmed] = useState(false);

  const match = NUMBER_PATTERN.exec(value);
  const prefix = match?.[1] ?? "";
  const target = match ? Number(match[2]) : 0;
  const suffix = match?.[3] ?? "";
  const decimals = match?.[2].split(".")[1]?.length ?? 0;
  // Skip values that are not a plain leading number: zero, or a thousands separator in the suffix.
  const animatable = !!match && target > 0 && !/^,\d/.test(suffix);

  // After mount: if motion is allowed, rewind to 0 and wait for the element to scroll into view.
  useEffect(() => {
    setText(value);
    setArmed(false);
    if (!animatable) return;
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;
    setText(`${prefix}${(0).toFixed(decimals)}${suffix}`);
    setArmed(true);
  }, [value, animatable, prefix, suffix, decimals]);

  useEffect(() => {
    if (!armed || !inView) return;
    const controls = animate(0, target, {
      duration: 0.9,
      ease: [0.25, 0.4, 0.25, 1],
      onUpdate: (latest) => setText(`${prefix}${latest.toFixed(decimals)}${suffix}`),
      onComplete: () => setText(value),
    });
    return () => controls.stop();
  }, [armed, inView, target, prefix, suffix, decimals, value]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
