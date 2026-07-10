export type ChipTone = "pink" | "lavender" | "sky" | "mint" | "butter" | "peach";

const TONE_CLASSES: Record<ChipTone, string> = {
  pink: "bg-surface text-accent-deep",
  lavender: "bg-lavender-soft text-lavender-deep",
  sky: "bg-sky-soft text-sky-deep",
  mint: "bg-mint-soft text-mint-deep",
  butter: "bg-butter-soft text-butter-deep",
  peach: "bg-peach-soft text-peach-deep",
};

interface TagChipProps {
  children: string;
  tone?: ChipTone;
}

export default function TagChip({ children, tone = "pink" }: TagChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-pill px-3 py-1 text-caption font-medium ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
