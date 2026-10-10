interface JourneyMarkerProps {
  step: number;
  of: number;
  label: string;
}

/** One-line position marker for a journey-ordered section: dots up to `step` are filled,
    then "Step 3 of 7 · Label" in eyebrow style. */
export default function JourneyMarker({ step, of, label }: JourneyMarkerProps) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-style-eyebrow text-accent-deep">
      <span aria-hidden="true" className="flex items-center gap-1">
        {Array.from({ length: of }, (_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-pill border ${
              i + 1 <= step ? "border-accent bg-accent" : "border-line bg-transparent"
            }`}
          />
        ))}
      </span>
      <span>
        Step {step} of {of} · {label}
      </span>
    </p>
  );
}
