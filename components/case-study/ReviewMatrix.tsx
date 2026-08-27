interface Row {
  field: string;
  rule: string;
  failure: string;
  tone: string;
}

const ROWS: Row[] = [
  {
    field: "Session summary (v6)",
    rule: "The ownership gate. The summary reflects only what the user actually said or agreed to.",
    failure:
      "The summary asserts a realization the user never reached, and the user reads back a memory that did not happen.",
    tone: "bg-sky-soft",
  },
  {
    field: "Topic detection",
    rule: "A topic is a situation, never a feeling. “Conversation with dad,” not “Self-worth.”",
    failure:
      "Sessions collapse into an abstract emotional label, and the user loses the thread of what they were actually working through.",
    tone: "bg-lavender-soft",
  },
  {
    field: "Topic summary (v7)",
    rule: "The summary describes the territory across sessions rather than restating the most recent one.",
    failure:
      "A topic reads as a duplicate of its newest session and the sense of return over time disappears.",
    tone: "bg-mint-soft",
  },
  {
    field: "Coaching invitation",
    rule: "Synthesize across recent sessions and end in a question back to the user.",
    failure:
      "The card closes the loop instead of opening one, and there is no way back into coaching.",
    tone: "bg-butter-soft",
  },
];

/** The review matrix: what gets generated, the rule it is checked against, what a failure
    looks like. A real table on wide screens; the same four rows as tone-tinted cards on
    narrow ones, so it stays readable without side-scrolling. */
export default function ReviewMatrix() {
  return (
    <div className="my-8">
      {/* Wide screens: table. */}
      <div className="case-table hidden overflow-x-auto sm:block">
        <table className="w-full text-left text-body">
          <thead>
            <tr className="text-style-eyebrow text-ink">
              <th className="py-2 pr-4 font-medium">What gets generated</th>
              <th className="py-2 pr-4 font-medium">The rule it is checked against</th>
              <th className="py-2 font-medium">What a failure looks like</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.field} className="border-b border-line last:border-0">
                <td className="py-3 pr-4 align-top font-medium text-ink">{row.field}</td>
                <td className="py-3 pr-4 align-top text-ink-muted">{row.rule}</td>
                <td className="py-3 align-top text-ink-muted">{row.failure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Narrow screens: one card per field. */}
      <div className="flex flex-col gap-3 sm:hidden">
        {ROWS.map((row) => (
          <div
            key={row.field}
            className={`rounded-frame border border-line p-4 ${row.tone}`}
          >
            <p className="font-display text-h4 font-semibold text-ink">{row.field}</p>
            <p className="mt-3 text-style-eyebrow text-ink-muted">Rule</p>
            <p className="mt-1 text-body text-ink-muted">{row.rule}</p>
            <p className="mt-3 text-style-eyebrow text-ink-muted">Fails when</p>
            <p className="mt-1 text-body text-ink-muted">{row.failure}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
