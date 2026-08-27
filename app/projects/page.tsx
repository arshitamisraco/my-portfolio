import type { Metadata } from "next";
import CaseStudyCard from "@/components/CaseStudyCard";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { CASE_STUDIES } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "End-to-end case studies from Arshita Misra's work in product design, UX, prompt engineering, design systems, research, and accessibility.",
};

export default function Projects() {
  return (
    <section className="py-section">
      <div className="container-site">
        <Reveal>
          <SectionLabel cloud>Projects</SectionLabel>
          <h1 className="mt-4 max-w-3xl font-display text-h1 font-semibold text-ink">
            End-to-end case studies, from founding AI product design to accessible play.
          </h1>
        </Reveal>

        {/* Narrowed, centered card column — the same layout as the home page's
            Selected Work, which shows only the COROS AI subset of this list. */}
        <div className="mx-auto mt-12 flex max-w-4xl flex-col gap-14">
          {CASE_STUDIES.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.08}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
