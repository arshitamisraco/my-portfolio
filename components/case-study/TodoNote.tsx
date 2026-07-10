interface TodoNoteProps {
  children: string;
}

/**
 * Visible placeholder for source-content gaps (metrics, dates, details)
 * that the author still needs to fill in. Intentionally noticeable.
 */
export default function TodoNote({ children }: TodoNoteProps) {
  return (
    <span className="inline-flex items-baseline gap-1.5 rounded-card bg-butter-soft px-2.5 py-0.5 text-caption font-medium text-butter-deep">
      <span aria-hidden="true">▲</span> TODO: {children}
    </span>
  );
}
