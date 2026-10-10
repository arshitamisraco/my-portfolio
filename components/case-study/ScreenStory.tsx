import Image from "next/image";
import type { ReactNode } from "react";
import type { ChipTone } from "@/components/TagChip";
import { LABEL } from "./DecisionLog";

interface ThumbImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface ScreenStoryProps {
  problem: ReactNode;
  approach: ReactNode;
  fix: ReactNode;
  result: ReactNode;
  /** The screen itself: ImageFrame / CaseVideo with `flush`. Two items stack with gap-4. */
  media: ReactNode;
  before?: ThumbImage & { caption?: string };
  /** Full-page screenshot with `region` (percentages) marked by a selection wash. */
  where?: ThumbImage & {
    region: { x: number; y: number; w: number; h: number };
    label: string;
  };
  tone?: ChipTone;
}

const TONES: Record<ChipTone, string> = {
  pink: "bg-surface",
  lavender: "bg-lavender-soft",
  sky: "bg-sky-soft",
  mint: "bg-mint-soft",
  butter: "bg-butter-soft",
  peach: "bg-peach-soft",
};

const BODY = "mt-2 text-body text-ink";

/**
 * One screen of a journey stage: problem, approach, fix and result beside the screen.
 * Desktop: text left (sticky), media right. Mobile order: where, problem, before, media,
 * approach, fix, result — from a single source tree.
 */
export default function ScreenStory({
  problem,
  approach,
  fix,
  result,
  media,
  before,
  where,
  tone = "pink",
}: ScreenStoryProps) {
  return (
    <div className="my-12 flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-start lg:gap-10">
      {/* display:contents on mobile lets lead / media / rest reorder as siblings;
          on lg the wrapper is one sticky block so the text stays together. */}
      <div className="contents lg:sticky lg:top-28 lg:col-start-1 lg:row-start-1 lg:block lg:self-start">
        <div className="order-1 space-y-6 lg:order-none">
          {where && (
            <figure className="max-w-xs">
              <div className={`overflow-hidden rounded-frame border border-line p-2 ${TONES[tone]}`}>
                <div className="relative">
                  <Image
                    src={where.src}
                    alt={where.alt}
                    width={where.width}
                    height={where.height}
                    className="block h-auto w-full rounded-[10px]"
                    sizes="320px"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute border border-accent-strong bg-accent-soft/40"
                    style={{
                      left: `${where.region.x}%`,
                      top: `${where.region.y}%`,
                      width: `${where.region.w}%`,
                      height: `${where.region.h}%`,
                    }}
                  />
                </div>
              </div>
              <figcaption className="mt-2 text-caption text-ink-muted">
                {where.label}
              </figcaption>
            </figure>
          )}
          <div>
            <p className={LABEL}>Problem</p>
            <div className="mt-2 font-display text-h3 font-semibold text-ink">{problem}</div>
          </div>
          {before && (
            <figure className="max-w-xs">
              <div
                className={`overflow-hidden rounded-frame border border-line p-2 ${TONES[tone]}`}
              >
                <Image
                  src={before.src}
                  alt={before.alt}
                  width={before.width}
                  height={before.height}
                  className="block h-auto w-full rounded-[10px]"
                  sizes="320px"
                />
              </div>
              <figcaption className="mt-2 text-caption text-ink-muted">
                {before.caption ?? "Before"}
              </figcaption>
            </figure>
          )}
        </div>
        <div className="order-3 mt-0 space-y-8 lg:order-none lg:mt-8">
          <div>
            <p className={LABEL}>Approach</p>
            <div className={BODY}>{approach}</div>
          </div>
          <div>
            <p className={LABEL}>Fix</p>
            <div className={BODY}>{fix}</div>
          </div>
          <div>
            <p className={LABEL}>Result</p>
            <div className={BODY}>{result}</div>
          </div>
        </div>
      </div>
      <div className="order-2 flex min-w-0 flex-col gap-4 lg:order-none lg:col-start-2 lg:row-start-1">
        {media}
      </div>
    </div>
  );
}
