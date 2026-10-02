import type { ReactNode } from "react";

interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
}

/** Display-serif pull quote. Used sparingly. */
export default function PullQuote({ children, attribution }: PullQuoteProps) {
  return (
    <blockquote className="my-12 max-w-3xl">
      <p className="font-display text-h2 font-medium leading-snug text-ink">
        <span aria-hidden="true" className="text-accent-strong">
          &ldquo;
        </span>
        {children}
      </p>
      {attribution && (
        <footer className="mt-4 text-caption text-ink-muted">— {attribution}</footer>
      )}
    </blockquote>
  );
}
