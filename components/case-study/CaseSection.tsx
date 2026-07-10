import type { ReactNode } from "react";

interface CaseSectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}

/** One case-study section: anchor target, eyebrow, serif heading, prose body. */
export default function CaseSection({ id, eyebrow, title, children }: CaseSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-line pt-12 pb-4 first:border-t-0 first:pt-0">
      {eyebrow && <p className="text-style-eyebrow text-accent-deep">{eyebrow}</p>}
      <h2
        id={`${id}-title`}
        className="mt-3 max-w-3xl font-display text-h2 font-semibold text-ink"
      >
        {title}
      </h2>
      <div className="case-prose mt-6">{children}</div>
    </section>
  );
}
