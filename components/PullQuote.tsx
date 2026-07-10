import type { ReactNode } from "react";

interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
}

/** Display-serif pull quote with a pixel-pink rule. Used sparingly. */
export default function PullQuote({ children, attribution }: PullQuoteProps) {
  return (
    <blockquote className="my-12 border-l-4 border-accent pl-6 md:pl-8">
      <p className="font-display text-h2 font-medium leading-snug text-ink">{children}</p>
      {attribution && (
        <footer className="mt-4 text-caption text-ink-muted">— {attribution}</footer>
      )}
    </blockquote>
  );
}
