import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyCard from "@/components/CaseStudyCard";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { BUILDS_HREF, DESIGN_CASE_STUDIES } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Design projects",
  description:
    "End-to-end design case studies from Arshita Misra's work in product design, UX, prompt engineering, design systems, research, and accessible play.",
};

export default function Projects() {
  return (
    <section className="py-section">
      <div className="container-site">
        <Reveal>
          <SectionLabel>Work</SectionLabel>
          <h1 className="mt-4 max-w-3xl font-display text-h1 font-semibold text-ink">
            Design case studies.
          </h1>
          <Link
            href={BUILDS_HREF}
            className="mt-3 inline-block text-body font-medium text-accent-deep underline-offset-4 hover:underline"
          >
            Builds →
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {DESIGN_CASE_STUDIES.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.08}>
              <CaseStudyCard study={study} size="half" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
