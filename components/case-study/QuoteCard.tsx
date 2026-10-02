interface QuoteCardProps {
  children: string;
  attribution?: string;
  /** Accepted for compatibility with existing pages; ignored. */
  tone?: "pink" | "lavender" | "sky";
}

/** Verbatim user-research quote, set as plain text. */
export default function QuoteCard({ children, attribution }: QuoteCardProps) {
  return (
    <figure className="my-4">
      <blockquote className="text-body text-ink">
        <span aria-hidden="true" className="font-display font-semibold text-accent-strong">
          &ldquo;
        </span>
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-2 text-caption text-ink-muted">— {attribution}</figcaption>
      )}
    </figure>
  );
}
