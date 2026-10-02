import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyCard from "@/components/CaseStudyCard";
import CountUp from "@/components/CountUp";
import PixelCloud from "@/components/PixelCloud";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { CASE_STUDIES, PROJECTS_HREF } from "@/lib/projects";

const COROS_CASE_STUDIES = CASE_STUDIES.filter((s) => s.company?.name === "COROS AI");

const STATS = [
  { value: "55%", label: "next-day return" },
  { value: "40%", label: "weekly active users" },
  { value: "3", label: "platforms shipped" },
];

export const metadata: Metadata = {
  title: "COROS AI: an AI Coaching Platform",
  description:
    "Arshita Misra was the founding designer at COROS AI from 2025 to 2026, covering product design, UX, prompt engineering, research, and brand.",
};

export default function CorosHub() {
  return (
    <>
      {/* ================= Overview ================= */}
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <PixelCloud
          shape="cumulus"
          variant="sky"
          size={120}
          className="absolute right-[8%] top-10 opacity-50"
          aria-hidden
        />
        <div className="container-site relative py-14 md:py-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-caption text-ink-muted">
              <li>
                <Link href={PROJECTS_HREF} className="hover:text-accent-deep">
                  Work
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                COROS AI
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
            <div>
              <p className="text-style-eyebrow mt-10 text-accent-deep">
                Founding Product Designer · Jul 2025 – Aug 2026
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-h1 font-semibold text-ink">
                COROS AI: an AI coach for professionals.
              </h1>
            </div>

            <a
              href="https://app.coros.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex shrink-0 items-center gap-2 rounded-frame border border-line px-4 py-2 text-caption font-medium text-accent-deep transition-all duration-300 hover:border-accent hover:bg-surface-raised"
            >
              Try what I built
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
              >
                →
              </span>
            </a>
          </div>

          <p className="mt-6 max-w-2xl text-body-lg text-ink-muted">
            I led product design, UX, prompt engineering, research and brand from day one.
          </p>

          <div className="mt-10 grid max-w-3xl grid-cols-3 gap-4 border-t border-line pt-8 sm:gap-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-h2 font-semibold leading-none text-ink sm:text-h1">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-2 text-caption text-ink-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Explore the work ================= */}
      <section className="py-section">
        <div className="container-site">
          <Reveal>
            <SectionLabel>Explore the work</SectionLabel>
            <h2 className="mt-4 max-w-2xl font-display text-h2 font-semibold text-ink">
              Three case studies, one product.
            </h2>
          </Reveal>

          <div className="mx-auto mt-12 flex max-w-4xl flex-col gap-14">
            {COROS_CASE_STUDIES.map((study, i) => (
              <Reveal key={study.slug} delay={i * 0.08}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
