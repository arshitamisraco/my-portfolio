import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyCard from "@/components/CaseStudyCard";
import PixelCloud from "@/components/PixelCloud";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { CASE_STUDIES, PROJECTS_HREF } from "@/lib/projects";

const COROS_CASE_STUDIES = CASE_STUDIES.filter((s) => s.company?.name === "COROS AI");

export const metadata: Metadata = {
  title: "COROS AI: an AI Coaching Platform",
  description:
    "Arshita Misra is the founding AI designer at COROS AI, an ontological coaching platform, spanning product design, UX, prompt engineering, research, and brand.",
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
                  Projects
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
                Founding AI Designer · June 2025 – Present
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-h1 font-semibold text-ink">
                COROS AI: an AI coach that transforms people in conversation.
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

          <div className="case-prose mt-8">
            <p>
              COROS AI is an AI coach based on linguistic ontology that helps professionals
              navigate moods, repair relationships, and take action when they&rsquo;re
              stuck. It helps you build skills that AI can&rsquo;t replace: capacity to
              listen, to trust, to coordinate promises, to handle breakdowns in language.
            </p>
            <p>COROS helps users:</p>
            <ul>
              <li>Track and shift moods before breakdowns spiral into bigger messes.</li>
              <li>Reflect on key relationships and how people show up in conversations.</li>
              <li>Coordinate promises and recover from breakdowns with agility.</li>
              <li>Create different futures by shifting moods.</li>
            </ul>
            <p>
              I joined as the founding designer, and since June 2025 my work has spanned{" "}
              <strong>
                product design, UX, prompt engineering, user research, and brand
              </strong>
              , with onboarding and interaction redesigns that got{" "}
              <strong>55%</strong> of early signups returning the next day and{" "}
              <strong>40%</strong> of registered users active weekly.
            </p>
          </div>
        </div>
      </section>

      {/* ================= Explore the work ================= */}
      <section className="py-section">
        <div className="container-site">
          <Reveal>
            <SectionLabel cloud>Explore the work</SectionLabel>
            <h2 className="mt-4 max-w-2xl font-display text-h2 font-semibold text-ink">
              Three end-to-end case studies, one product.
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
