interface ToneComparisonProps {
  userMessage: string;
  supportive: string;
  provocative: string;
}

/** One user message, answered in both tone modes side by side (stacked below `sm`).
    Shows that a tone switch changes the response architecture and the word choice. */
export default function ToneComparison({
  userMessage,
  supportive,
  provocative,
}: ToneComparisonProps) {
  return (
    <div className="my-8">
      <div className="rounded-frame border border-line bg-surface p-5">
        <p className="text-style-eyebrow text-ink-muted">User</p>
        <p className="mt-2 text-body text-ink">{userMessage}</p>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 sm:gap-4">
        <div className="rounded-frame border border-line bg-surface-raised p-5">
          <p className="text-style-eyebrow text-ink-muted">Supportive</p>
          <p className="mt-2 text-body text-ink">{supportive}</p>
        </div>
        <div className="rounded-frame border border-line bg-surface-raised p-5">
          <p className="text-style-eyebrow text-ink-muted">Provocative</p>
          <p className="mt-2 text-body text-ink">{provocative}</p>
        </div>
      </div>
    </div>
  );
}
