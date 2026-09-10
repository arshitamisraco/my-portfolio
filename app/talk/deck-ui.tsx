"use client";

/**
 * Presentation primitives for the /talk deck.
 *
 * Slides are authored on a fixed 1600×900 canvas and scaled to fit whatever
 * display they land on. That is why every size here is an absolute pixel value
 * rather than the site's fluid rem scale: on a fixed canvas, "18px" means the
 * same proportion of the slide on a laptop and on a conference-room projector,
 * and nothing reflows between rehearsal and the real room.
 */

import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export const SLIDE_W = 1600;
export const SLIDE_H = 900;
const PAD_X = 88;
const PAD_Y = 64;

/* ------------------------------------------------------------------ *
 * Active-slide plumbing
 *
 * Every slide renders inside this provider. Videos read it so only the
 * visible slide's media plays — otherwise a dozen <video> elements decode
 * at once and the deck drops frames mid-talk.
 * ------------------------------------------------------------------ */

export const ActiveSlideContext = createContext(true);

/* ------------------------------------------------------------------ *
 * Stage — scales the fixed canvas into the available space
 * ------------------------------------------------------------------ */

export function Stage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.min(width / SLIDE_W, height / SLIDE_H));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 grid place-items-center overflow-hidden">
      <div
        // Hidden until measured, so the canvas never flashes at 1:1 and
        // overflows the viewport on first paint.
        className="relative shrink-0"
        style={{
          width: SLIDE_W,
          height: SLIDE_H,
          paddingInline: PAD_X,
          paddingBlock: PAD_Y,
          transform: `scale(${scale})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Motion
 * ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

const staggerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.975 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE } },
};

/** Stagger container. Children wrapped in <Item> animate in sequence on mount. */
export function Stack({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={staggerVariants}
      initial={reduced ? false : "hidden"}
      animate="show"
    >
      {children}
    </motion.div>
  );
}

export function Item({
  children,
  className = "",
  grow = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Scale in rather than rise — reads better for a big piece of media. */
  grow?: boolean;
}) {
  return (
    <motion.div className={className} variants={grow ? scaleInVariants : riseVariants}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Tones — the site palette, so the deck and the portfolio read as one system
 * ------------------------------------------------------------------ */

export type Tone = "pink" | "sky" | "lavender" | "mint" | "butter" | "peach";

const TONE_BG: Record<Tone, string> = {
  pink: "bg-pink-200",
  sky: "bg-sky-soft",
  lavender: "bg-lavender-soft",
  mint: "bg-mint-soft",
  butter: "bg-butter-soft",
  peach: "bg-peach-soft",
};

const TONE_INK: Record<Tone, string> = {
  pink: "text-pink-700",
  sky: "text-sky-deep",
  lavender: "text-lavender-deep",
  mint: "text-mint-deep",
  butter: "text-butter-deep",
  peach: "text-peach-deep",
};

export const toneInk = (tone: Tone) => TONE_INK[tone];
export const toneBg = (tone: Tone) => TONE_BG[tone];

const FRAME =
  "overflow-hidden rounded-[18px] border-2 border-line shadow-[0_22px_60px_-28px_rgba(43,34,48,0.5)]";

/* ------------------------------------------------------------------ *
 * Media
 * ------------------------------------------------------------------ */

interface MediaProps {
  src: string;
  /** Intrinsic aspect ratio, e.g. "1440 / 936". Reserves the box before load. */
  ratio?: string;
  tone?: Tone;
  className?: string;
  /** Fit the media inside its box rather than filling and cropping. */
  contain?: boolean;
}

/**
 * A muted video that plays only while its slide is on screen and restarts
 * from zero each time you land on it, so a demo always reads from the top no
 * matter how many times you arrow back to it. It plays once and holds on the
 * last frame unless `loop` is set.
 */
export function SlideVideo({
  src,
  poster,
  ratio = "1440 / 936",
  tone = "lavender",
  className = "",
  contain = false,
  loop = false,
}: MediaProps & { poster?: string; loop?: boolean }) {
  const active = useContext(ActiveSlideContext);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (active) {
      // Plays once and holds on its last frame by default — a loop running
      // behind a speaker is a distraction. Short clips that are the point of
      // the slide opt back in with `loop`. Returning to a slide restarts it.
      video.currentTime = 0;
      // Autoplay can still be refused (a battery-saver profile, say); the
      // poster stays up in that case, which is an acceptable fallback.
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);

  return (
    <div
      className={`${FRAME} ${TONE_BG[tone]} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop={loop}
        playsInline
        preload="metadata"
        className={`h-full w-full ${contain ? "object-contain" : "object-cover"}`}
      />
    </div>
  );
}

export function Shot({
  src,
  alt,
  ratio = "16 / 10",
  tone = "lavender",
  className = "",
  contain = false,
  priority = false,
}: MediaProps & { alt: string; priority?: boolean }) {
  return (
    <div
      className={`relative ${FRAME} ${TONE_BG[tone]} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="70vw"
        priority={priority}
        className={contain ? "object-contain" : "object-cover object-top"}
      />
    </div>
  );
}

/** A short line under a piece of media. Keep these to one line. */
export function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2.5 text-[15px] leading-snug text-ink-muted">{children}</p>
  );
}

/* ------------------------------------------------------------------ *
 * Type
 * ------------------------------------------------------------------ */

export function Kicker({
  children,
  tone = "pink",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <p
      className={`text-[15px] font-semibold uppercase tracking-[0.16em] ${TONE_INK[tone]}`}
    >
      {children}
    </p>
  );
}

export function Title({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-[54px] font-semibold leading-[1.08] tracking-[-0.015em] text-balance text-ink ${className}`}
    >
      {children}
    </h2>
  );
}

export function Lede({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`max-w-[46ch] text-[23px] leading-[1.5] text-pretty text-ink-muted ${className}`}>
      {children}
    </p>
  );
}

/** A bulleted list with the site's dot marker, sized for a projector. */
export function Points({
  items,
  tone = "pink",
  className = "",
}: {
  items: React.ReactNode[];
  tone?: Tone;
  className?: string;
}) {
  return (
    <ul className={`grid gap-4 ${className}`}>
      {items.map((item, i) => (
        <li
          key={i}
          className="relative pl-8 text-[21px] leading-[1.45] text-pretty text-ink"
        >
          <span
            aria-hidden
            className={`absolute left-0 top-[0.5em] h-3 w-3 rounded-full border-2 border-accent-strong ${TONE_BG[tone]}`}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Quote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution?: string;
}) {
  return (
    <figure className="border-l-[6px] border-accent pl-6">
      <blockquote className="font-display text-[38px] font-medium leading-[1.24] text-balance text-ink">
        {children}
      </blockquote>
      {attribution ? (
        <figcaption className="mt-4 text-[14px] uppercase tracking-[0.14em] text-ink-muted">
          {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** A labelled number. The deck carries only a few on purpose. */
export function Stat({
  value,
  label,
  tone = "lavender",
}: {
  value: string;
  label: string;
  tone?: Tone;
}) {
  return (
    <div className={`rounded-[14px] border border-line px-5 py-4 ${TONE_BG[tone]}`}>
      <p className="font-display text-[30px] font-semibold leading-none text-balance text-ink">
        {value}
      </p>
      <p className="mt-3 text-[15px] leading-snug text-ink-muted">{label}</p>
    </div>
  );
}

export function Chip({
  children,
  tone = "pink",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-block rounded-pill border border-line px-4 py-1.5 text-[16px] font-medium ${TONE_BG[tone]} ${TONE_INK[tone]}`}
    >
      {children}
    </span>
  );
}

/** A callout for the one line on a slide that has to land. */
export function Punch({
  children,
  sub,
}: {
  children: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <div className="rounded-[18px] border-2 border-dashed border-accent bg-accent-soft/40 px-6 py-5">
      <p className="font-display text-[26px] font-semibold leading-[1.25] text-balance text-ink">
        {children}
      </p>
      {sub ? (
        <p className="mt-3 text-[17px] leading-snug text-pretty text-ink-muted">{sub}</p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Layout
 * ------------------------------------------------------------------ */

/** The standard slide: narrative on the left, media on the right. */
export function Split({
  left,
  right,
  ratio = "5fr 7fr",
  gap = 56,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  ratio?: string;
  gap?: number;
}) {
  return (
    <div
      className="grid h-full min-h-0 items-center"
      style={{ gridTemplateColumns: ratio, columnGap: gap }}
    >
      <div className="flex min-w-0 flex-col justify-center">{left}</div>
      <div className="flex min-h-0 min-w-0 flex-col justify-center">{right}</div>
    </div>
  );
}

/** A centred, single-column slide for the big moments. */
export function Centered({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: "center" | "start";
}) {
  return (
    <div
      className={`flex h-full flex-col justify-center ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <div className="w-full">{children}</div>
    </div>
  );
}

/** A full-width slide whose content stacks vertically and fills the canvas. */
export function Stacked({ children }: { children: React.ReactNode }) {
  return <div className="flex h-full flex-col justify-center">{children}</div>;
}

/* ------------------------------------------------------------------ *
 * The case-study spine
 *
 * The same three questions on every substantive slide, so the audience
 * learns the lens once and then knows where to look.
 * ------------------------------------------------------------------ */

export function Arc({
  problem,
  move,
  result,
  labels = ["What was wrong", "What I did", "What changed"],
  tone = "sky",
}: {
  problem?: React.ReactNode;
  move?: React.ReactNode;
  result?: React.ReactNode;
  labels?: [string, string, string];
  tone?: Tone;
}) {
  const rows: [string, React.ReactNode][] = [];
  if (problem) rows.push([labels[0], problem]);
  if (move) rows.push([labels[1], move]);
  if (result) rows.push([labels[2], result]);

  return (
    <div className="grid">
      {rows.map(([label, body], i) => (
        <div
          key={label}
          className={`grid grid-cols-[196px_1fr] gap-x-6 ${
            i > 0 ? "mt-5 border-t border-line pt-5" : ""
          }`}
        >
          <p
            className={`pt-[6px] text-[14px] font-semibold uppercase leading-tight tracking-[0.13em] ${TONE_INK[tone]}`}
          >
            {label}
          </p>
          <p className="text-[20px] leading-[1.45] text-pretty text-ink">{body}</p>
        </div>
      ))}
    </div>
  );
}

/** An off-the-record line — the bit you would say looking up from the slide. */
export function Aside({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-2 border-dashed border-accent/70 pl-4 text-[17px] italic leading-[1.45] text-pretty text-ink-muted">
      {children}
    </p>
  );
}
