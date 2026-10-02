"use client";

import { motion } from "framer-motion";
import { Children, useEffect, useState, type ReactNode } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

interface HeroIntroProps {
  children: ReactNode;
  className?: string;
}

/**
 * Staggers its direct children in on load (fade + 16px rise). Under
 * prefers-reduced-motion the children render static and fully visible.
 * Reduced motion is detected after mount (same pattern as Reveal.tsx), so the
 * server and first client render are identical.
 */
export default function HeroIntro({ children, className }: HeroIntroProps) {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    setReduce(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setReduce(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reduce) {
    return (
      <div className={className}>
        {Children.map(children, (child) => (
          <div>{child}</div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
    >
      {Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.45, ease: [0.25, 0.4, 0.25, 1] },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
