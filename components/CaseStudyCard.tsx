import Link from "next/link";
import CorosCarousel from "@/components/CorosCarousel";
import TagChip from "@/components/TagChip";
import { CASE_STUDY_CLIPS } from "@/lib/carousel";
import type { CorosCaseStudy } from "@/lib/coros";

/**
 * Full-width, stacked case-study card — the shared listing unit for the COROS
 * case studies. Used by both the home page and /projects so the two lists stay
 * identical. The whole card is one link; the cover carousel is aria-hidden so
 * the card keeps a single accessible name.
 */
export default function CaseStudyCard({ study }: { study: CorosCaseStudy }) {
  return (
    <Link
      href={study.href}
      className="group block overflow-hidden rounded-frame border border-line bg-surface-raised transition-all duration-300 hover:-translate-y-1 hover:border-accent motion-reduce:hover:translate-y-0"
    >
      {/* Cover: the project's own horizontally-drifting carousel. */}
      <div className="overflow-hidden border-b border-line">
        <CorosCarousel clips={CASE_STUDY_CLIPS[study.slug]} />
      </div>

      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-end md:justify-between md:p-7">
        <div className="max-w-2xl">
          {study.inProgress && (
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-mint-soft px-3 py-1 text-caption font-medium text-mint-deep">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-pill bg-mint-deep motion-safe:animate-pulse"
              />
              Current project
            </span>
          )}
          <h2
            className={`font-display text-h2 font-semibold text-ink group-hover:text-accent-deep ${
              study.inProgress ? "mt-4" : ""
            }`}
          >
            {study.title}
          </h2>
          <p className="mt-3 text-body text-ink-muted">{study.brief}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <TagChip key={tag} tone={study.tone}>
                {tag}
              </TagChip>
            ))}
          </div>
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
    </Link>
  );
}
