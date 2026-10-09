export interface JourneyStage {
  id: string;
  label: string;
  detail: string;
  /** Small eyebrow text, e.g. the complaint numbers this stage answers ("02 04"). */
  tag?: string;
}

interface JourneyMapProps {
  stages: JourneyStage[];
}

/** An overview of the whole journey: a row of step marks on a hairline rail (vertical on
    mobile), each stage linking to its section. */
export default function JourneyMap({ stages }: JourneyMapProps) {
  return (
    <ol
      aria-label="Journey"
      className="my-8 grid list-none gap-0 p-0 sm:[grid-template-columns:repeat(var(--stages),minmax(0,1fr))] sm:gap-4"
      style={{ "--stages": stages.length } as React.CSSProperties}
    >
      {stages.map((stage, i) => (
        <li key={stage.id} className="relative m-0 min-w-0 pb-6 pl-9 last:pb-0 sm:pb-0 sm:pl-0 sm:pt-9">
          {/* Rail: vertical on mobile, horizontal on sm+. Each segment runs from this
              mark to the next, so the first and last stages have no overshoot. */}
          {i < stages.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-[7px] top-4 w-px bg-line sm:bottom-auto sm:left-4 sm:right-[-1rem] sm:top-[7px] sm:h-px sm:w-auto"
            />
          )}
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-4 w-4 rounded-pill bg-accent ring-4 ring-bg sm:left-0"
          />
          <a
            href={`#${stage.id}`}
            className="group block text-ink no-underline hover:no-underline"
          >
            <span className="block text-style-eyebrow text-accent-deep">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="block text-body font-semibold text-ink transition-colors group-hover:text-accent-deep">
              {stage.label}
            </span>
            <span className="mt-1 block text-caption text-ink-muted">{stage.detail}</span>
            {stage.tag && (
              <span className="mt-2 block text-caption text-ink-muted">
                Answers {stage.tag.split(" ").join(", ")}
              </span>
            )}
          </a>
        </li>
      ))}
    </ol>
  );
}
