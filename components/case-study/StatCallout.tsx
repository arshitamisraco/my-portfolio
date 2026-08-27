import type { ReactNode } from "react";

interface StatCalloutProps {
  children: ReactNode;
  /** Larger display size for a section's headline number (e.g. a final result). */
  size?: "md" | "lg";
}

/** A highlighted finding or number — the same visual language as the page header's
    Impact aside, reused inline within a section. */
export default function StatCallout({ children, size = "md" }: StatCalloutProps) {
  return (
    <aside
      className={`my-6 rounded-frame border border-line border-l-4 border-l-accent bg-surface-raised p-5 md:p-6 font-display font-semibold text-ink ${
        size === "lg" ? "text-h3" : "text-h4"
      }`}
    >
      {children}
    </aside>
  );
}
