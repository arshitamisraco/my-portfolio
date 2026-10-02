import Link from "next/link";
import CorosCarousel from "@/components/CorosCarousel";
import TagChip from "@/components/TagChip";
import { CASE_STUDY_CLIPS } from "@/lib/carousel";
import type { CaseStudy } from "@/lib/projects";

interface CaseStudyCardProps {
  study: CaseStudy;
  /** "full" fills a stacked column; "half" suits a 2-column grid. */
  size?: "full" | "half";
}

/**
 * Case-study card: the shared listing unit used by the home page, /projects,
 * /builds and the COROS hub. The whole card is one link; the cover carousel is
 * aria-hidden so the card keeps a single accessible name. Body is the title, a
 * one-line summary, up to three chips and one headline stat.
 */
export default function CaseStudyCard({ study, size = "full" }: CaseStudyCardProps) {
  const half = size === "half";

  return (
    <Link
      href={study.href}
      className="group block h-full overflow-hidden rounded-frame border border-line bg-surface-raised transition-all duration-300 hover:-translate-y-1 hover:border-accent motion-reduce:hover:translate-y-0"
    >
      {/* Cover: the project's own horizontally-drifting carousel. */}
      <div className="overflow-hidden border-b border-line">
        <div className="transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:group-hover:scale-100">
          <CorosCarousel clips={CASE_STUDY_CLIPS[study.slug]} height={half ? "sm" : "md"} />
        </div>
      </div>

      <div className={`flex flex-col gap-4 ${half ? "p-5" : "p-5 md:p-7"}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2
              className={`font-display font-semibold text-ink group-hover:text-accent-deep ${
                half ? "text-h3" : "text-h2"
              }`}
            >
              {study.title}
            </h2>
            <p className="mt-2 text-body text-ink-muted">{study.oneLiner}</p>
          </div>

          <span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-pill border border-line bg-surface text-accent-deep transition-all duration-300 group-hover:translate-x-1 group-hover:bg-accent-soft motion-reduce:group-hover:translate-x-0"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4 10h12m0 0l-5-5m5 5l-5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div className="flex flex-wrap gap-2">
            {study.tags.slice(0, 3).map((tag) => (
              <TagChip key={tag} tone={study.tone}>
                {tag}
              </TagChip>
            ))}
          </div>
          {study.stat && (
            <p className="flex items-baseline gap-2 whitespace-nowrap">
              <span className="font-display text-h4 font-semibold text-ink">{study.stat.value}</span>
              <span className="text-caption text-ink-muted">{study.stat.label}</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
