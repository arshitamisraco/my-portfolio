import TagChip, { type ChipTone } from "@/components/TagChip";

export interface StateRow {
  state: string;
  trigger: string;
  sees: string;
}

interface StateInventoryProps {
  rows: StateRow[];
}

const TONES: ChipTone[] = ["sky", "lavender", "mint", "butter", "peach", "pink"];

/** A conversation's full state inventory as a table on wide screens, restructured
    into stacked cards on narrow ones. One semantic <table> throughout; the header
    row hides below `sm` and its labels reappear as eyebrow micro-labels per cell. */
export default function StateInventory({ rows }: StateInventoryProps) {
  return (
    <div className="my-8 sm:overflow-hidden sm:rounded-card sm:border sm:border-accent-soft">
      <table className="w-full text-left text-body">
        <thead className="hidden sm:table-header-group">
          <tr className="text-style-eyebrow text-ink sm:bg-accent-soft">
            <th className="py-2 pl-4 pr-4 font-medium">State</th>
            <th className="py-2 pr-4 font-medium">What triggers it</th>
            <th className="py-2 pr-4 font-medium">What the user sees</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.state}
              className="mb-3 block rounded-frame border border-line bg-surface-raised p-4 last:mb-0 sm:mb-0 sm:table-row sm:rounded-none sm:border-0 sm:p-0 sm:align-top sm:odd:bg-surface-raised sm:even:bg-surface"
            >
              <td className="block pb-2 sm:table-cell sm:py-3 sm:pl-4 sm:pr-4">
                <TagChip tone={TONES[i % TONES.length]}>{row.state}</TagChip>
              </td>
              <td className="block pt-2 text-ink-muted sm:table-cell sm:py-3 sm:pr-4">
                <span className="text-style-eyebrow block text-ink-muted sm:hidden">
                  Triggered by
                </span>
                {row.trigger}
              </td>
              <td className="block pt-2 text-ink-muted sm:table-cell sm:py-3">
                <span className="text-style-eyebrow block text-ink-muted sm:hidden">
                  User sees
                </span>
                {row.sees}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
