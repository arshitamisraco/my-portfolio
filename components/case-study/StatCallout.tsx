import type { ReactNode } from "react";
import CountUp from "@/components/CountUp";

interface StatCalloutProps {
  /** The headline number or short phrase. Strings with a leading number count up on first view. */
  value?: ReactNode;
  /** One line under the value. */
  label?: ReactNode;
  /** Fallback for pages not yet migrated: children render as the value, with no label. */
  children?: ReactNode;
  /** Larger display size for a section's headline number (e.g. a final result). */
  size?: "md" | "lg";
}

/** A headline number with a one-line label. No card, no bar. */
export default function StatCallout({ value, label, children, size = "md" }: StatCalloutProps) {
  const shown = value ?? children;
  const valueClass = `font-display font-semibold leading-none text-ink ${
    size === "lg" ? "text-display" : "text-h1"
  }`;

  return (
    <div className="my-8">
      <p className={valueClass}>
        {typeof shown === "string" ? <CountUp value={shown} /> : shown}
      </p>
      {label && <p className="mt-3 max-w-md text-body text-ink-muted">{label}</p>}
    </div>
  );
}
