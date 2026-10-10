import type { ReactNode } from "react";
import type { ChipTone } from "@/components/TagChip";

export interface TriedItem {
  label: string;
  /** The reason it won or lost. */
  detail?: ReactNode;
  /** Rendered muted with the label struck through; `detail` then reads as why it lost. */
  rejected?: boolean;
}

interface DecisionLogProps {
  /** Optional short title for the fork, e.g. "The journey animation". */
  title?: string;
  hypothesis: ReactNode;
  tried: TriedItem[];
  saw: ReactNode;
  decided: ReactNode;
  tone?: ChipTone;
}

const TONES: Record<ChipTone, string> = {
  pink: "bg-surface",
  lavender: "bg-lavender-soft",
  sky: "bg-sky-soft",
  mint: "bg-mint-soft",
  butter: "bg-butter-soft",
  peach: "bg-peach-soft",
};

export const ROW = "grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[7rem_1fr] sm:gap-4 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-line";
export const LABEL = "text-style-eyebrow text-accent-deep";
export const VALUE = "text-body text-ink";

/**
 * Marks one fork in a case study: what was bet (hypothesis), what was tried
 * (rejected options muted with the reason), what was observed, and what was chosen.
 * Use once or twice per case study at the key decisions, not on every section.
 */
export default function DecisionLog({
  title,
  hypothesis,
  tried,
  saw,
  decided,
  tone = "pink",
}: DecisionLogProps) {
  return (
    <aside
      aria-label={title ?? "Decision log"}
      className={`my-8 rounded-frame border border-line p-5 md:p-6 ${TONES[tone]}`}
    >
      {title && <p className="mb-4 font-display text-h4 font-semibold text-ink">{title}</p>}
      <dl className="m-0">
        <div className={ROW}>
          <dt className={LABEL}>Hypothesis</dt>
          <dd className={VALUE}>{hypothesis}</dd>
        </div>
        <div className={ROW}>
          <dt className={LABEL}>Tried</dt>
          <dd className={VALUE}>
            <ul className="m-0 list-none space-y-3 p-0">
              {tried.map((item) => (
                <li key={item.label}>
                  <span
                    className={
                      item.rejected ? "font-medium text-ink-muted line-through" : "font-medium text-ink"
                    }
                  >
                    {item.label}
                  </span>
                  {item.rejected && <span className="sr-only"> (rejected)</span>}
                  {item.detail && <div className="text-ink-muted">{item.detail}</div>}
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div className={ROW}>
          <dt className={LABEL}>Saw</dt>
          <dd className={VALUE}>{saw}</dd>
        </div>
        <div className={ROW}>
          <dt className={LABEL}>Decided</dt>
          <dd className={VALUE}>{decided}</dd>
        </div>
      </dl>
    </aside>
  );
}
