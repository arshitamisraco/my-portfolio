interface QuoteCardProps {
  children: string;
  attribution?: string;
  tone?: "pink" | "lavender" | "sky";
}

const TONES = {
  pink: "bg-surface",
  lavender: "bg-lavender-soft",
  sky: "bg-sky-soft",
};

/** Verbatim user-research quote, styled as a soft pastel card. */
export default function QuoteCard({ children, attribution, tone = "pink" }: QuoteCardProps) {
  return (
    <figure className={`rounded-frame border border-line p-5 ${TONES[tone]}`}>
      <span aria-hidden="true" className="font-display text-h2 font-semibold leading-none text-accent">
        &ldquo;
      </span>
      <blockquote className="mt-1 text-body text-ink">{children}</blockquote>
      {attribution && (
        <figcaption className="mt-3 text-caption text-ink-muted">— {attribution}</figcaption>
      )}
    </figure>
  );
}
