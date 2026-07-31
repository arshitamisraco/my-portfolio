import type { Metadata } from "next";
import CaseStudyCard from "@/components/CaseStudyCard";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
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
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
