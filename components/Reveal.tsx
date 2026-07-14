"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  className?: string;
}

/**
 * Fade-up-on-scroll wrapper. Under prefers-reduced-motion the
 * content renders static and fully visible.
 *
 * Reduced motion is detected after mount (not via framer's useReducedMotion),
 * so the server and first client render always agree — both render the
 * motion.div. Branching on the media query during render instead produced a
 * hydration mismatch that left the SSR'd `opacity: 0` stuck (invisible content)
 * for reduced-motion users.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    setReduce(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setReduce(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
