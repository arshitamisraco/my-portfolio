const STAGES: string[] = [
  "20-session batch in",
  "Score every field (semantic + LLM judge)",
  "Read a stratified sample",
  "Fix the prompt",
];

const RETURN_LABEL = "Re-run the same 20 sessions";

/** The transcript-review loop as a diagram: four stages that feed forward, then a rail
    back to the start. Stacks vertically below lg, runs across in four columns above it.
    One tone throughout so the sequence reads as a single process, not four topics. */
export default function ReviewLoop() {
  return (
    <div className="my-8">
      <ol className="flex flex-col gap-0 lg:grid lg:grid-cols-4 lg:gap-3">
        {STAGES.map((stage, i) => (
          <li key={stage} className="flex flex-col lg:h-full">
            <div className="flex h-full items-center gap-3 rounded-frame border border-line bg-surface p-4">
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-pill bg-pink-200 text-caption font-semibold text-accent-deep"
              >
                {i + 1}
              </span>
              <p className="font-display text-h4 font-semibold text-ink">{stage}</p>
            </div>
            {i < STAGES.length - 1 && (
              <span
                aria-hidden="true"
                className="flex items-center justify-center py-2 text-caption text-accent-strong lg:hidden"
              >
                ▾
              </span>
            )}
          </li>
        ))}
      </ol>

      {/* The loop back to the start. A labeled dashed rail on wide screens; a plain
          dashed row on narrow ones, where a rail would have nothing to span. */}
      <p className="mt-4 flex items-center gap-3 rounded-frame border border-dashed border-line px-4 py-3 text-caption text-ink-muted lg:mt-5 lg:border-0 lg:px-0 lg:py-0">
        <span aria-hidden="true" className="hidden h-px flex-1 bg-line lg:block" />
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="text-accent-strong">
            ↻
          </span>
          {RETURN_LABEL}
        </span>
        <span aria-hidden="true" className="hidden h-px flex-1 bg-line lg:block" />
      </p>
    </div>
  );
}
