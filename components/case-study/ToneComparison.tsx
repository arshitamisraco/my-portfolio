interface ToneComparisonProps {
  userMessage: string;
  supportive: string;
  provocative: string;
}

/** One user message, answered in both tone modes side by side (stacked below `sm`).
    Shows that a tone switch changes the response architecture, not just word choice. */
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
        <div className="rounded-frame border border-line bg-mint-soft p-5">
          <p className="text-style-eyebrow text-mint-deep">Supportive</p>
          <p className="mt-2 text-body text-mint-deep">{supportive}</p>
        </div>
        <div className="rounded-frame border border-line bg-peach-soft p-5">
          <p className="text-style-eyebrow text-peach-deep">Provocative</p>
          <p className="mt-2 text-body text-peach-deep">{provocative}</p>
        </div>
      </div>
    </div>
  );
}
