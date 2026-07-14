"use client";

import { useState } from "react";

type PrincipleTone = "pink" | "peach" | "mint";

/**
 * Tone → existing @theme tokens. `rose/orange/emerald` from the brief were typos;
 * these are the real repo hues. Text uses the AA-passing `-deep` (or accent-deep)
 * token — never `text-accent` (pink-400), which fails contrast.
 */
const TONES: Record<
  PrincipleTone,
  { tint: string; border: string; gloss: string }
> = {
  pink: {
    tint: "group-hover:bg-accent-soft group-focus-within:bg-accent-soft",
    border:
      "group-hover:border-accent group-focus-within:border-accent",
    gloss: "text-accent-deep",
  },
  peach: {
    tint: "group-hover:bg-peach-soft group-focus-within:bg-peach-soft",
    border:
      "group-hover:border-peach-deep/30 group-focus-within:border-peach-deep/30",
    gloss: "text-peach-deep",
  },
  mint: {
    tint: "group-hover:bg-mint-soft group-focus-within:bg-mint-soft",
    border:
      "group-hover:border-mint-deep/30 group-focus-within:border-mint-deep/30",
    gloss: "text-mint-deep",
  },
};

interface PrincipleCardProps {
  heading: string;
  /** One-line gloss revealed on hover / focus / tap. */
  gloss: string;
  tone: PrincipleTone;
}

/**
 * A principle: heading always visible; the gloss reveals on hover AND on keyboard
 * focus (both via CSS group states), with a subtle lift + accent tint. On touch
 * there's no hover, so a tap toggles `open` to reveal it. Under
 * prefers-reduced-motion the gloss still reveals, but the lift/transition are
 * dropped (`motion-reduce:*`).
 */
export default function PrincipleCard({ heading, gloss, tone }: PrincipleCardProps) {
  const [open, setOpen] = useState(false);
  const t = TONES[tone];

  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={() => setOpen((v) => !v)}
      className={`group block w-full rounded-card border border-line bg-surface-raised p-5 text-left transition duration-200 ease-out hover:-translate-y-1 focus-within:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none ${t.tint} ${t.border} ${open ? "-translate-y-1 motion-reduce:transform-none" : ""}`}
    >
      <h3 className="font-display text-h4 font-semibold text-ink">{heading}</h3>
      <p
        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${t.gloss} ${
          open
            ? "mt-2 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 group-hover:mt-2 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:mt-2 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100"
        }`}
      >
        <span className="overflow-hidden text-body">{gloss}</span>
      </p>
    </button>
  );
}
