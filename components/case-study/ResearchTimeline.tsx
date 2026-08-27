import type { ReactNode } from "react";
import PixelCloud, { type CloudShape, type CloudVariant } from "@/components/PixelCloud";

export interface ResearchStep {
  cloud: { shape: CloudShape; variant: CloudVariant };
  method: string;
  detail: string;
  finding: ReactNode;
}

interface ResearchTimelineProps {
  steps: ResearchStep[];
}

/** A vertical research timeline: one cloud-marked node per method, each ending in its
    own highlighted finding. Replaces prose paragraphs with a scannable sequence. */
export default function ResearchTimeline({ steps }: ResearchTimelineProps) {
  return (
    <ol className="relative my-8 flex flex-col gap-10">
      {steps.map((step, i) => (
        <li key={step.method} className="relative pl-16 sm:pl-20">
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute left-[27px] top-14 hidden h-[calc(100%+1.5rem)] w-px bg-line sm:left-[35px] sm:block"
            />
          )}
          <span className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-pill border border-line bg-surface sm:h-[70px] sm:w-[70px]">
            <PixelCloud shape={step.cloud.shape} variant={step.cloud.variant} size={36} />
          </span>
          <p className="text-style-eyebrow text-accent-deep">{step.method}</p>
          <p className="mt-1 text-body text-ink-muted">{step.detail}</p>
          <div className="rounded-frame border border-line border-l-4 border-l-accent bg-surface-raised p-4 mt-3 text-body font-medium text-ink">
            {step.finding}
          </div>
        </li>
      ))}
    </ol>
  );
}
