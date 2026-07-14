import type { Metadata } from "next";
import Link from "next/link";
import CorosCarousel from "@/components/CorosCarousel";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import TagChip from "@/components/TagChip";
import { CASE_STUDY_CLIPS } from "@/lib/carousel";
import { COROS_CASE_STUDIES } from "@/lib/coros";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Three end-to-end case studies from Arshita Misra's work as founding AI designer at COROS AI — spanning product design, UX, prompt engineering, design systems, and brand.",
};

export default function Projects() {
  return (
    <section className="py-section">
      <div className="container-site">
        <Reveal>
          <SectionLabel cloud>Projects</SectionLabel>
          <h1 className="mt-4 max-w-3xl font-display text-h1 font-semibold text-ink">
            Three end-to-end case studies, all from my work as founding designer at COROS AI.
          </h1>
        </Reveal>

        <div className="mt-12 flex flex-col gap-8">
          {COROS_CASE_STUDIES.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.08}>
              <Link
                href={study.href}
                className="group block overflow-hidden rounded-frame border border-line bg-surface-raised transition-all duration-300 hover:-translate-y-1 hover:border-accent motion-reduce:hover:translate-y-0"
              >
                {/* Cover: the project's own horizontally-drifting carousel (aria-hidden;
                    this card carries the accessible name, so it stays one link). */}
                <div className="overflow-hidden border-b border-line">
                  <CorosCarousel clips={CASE_STUDY_CLIPS[study.slug]} />
                </div>

                <div className="flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between md:p-8">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
