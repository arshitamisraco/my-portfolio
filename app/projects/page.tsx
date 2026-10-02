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
          <SectionLabel cloud>Design projects</SectionLabel>
          <h1 className="mt-4 max-w-3xl font-display text-h1 font-semibold text-ink">
            End-to-end design case studies, from founding AI product design to accessible play.
          </h1>
          <p className="mt-4 text-body text-ink-muted">
            Looking for the things I shipped end to end?{" "}
            <Link href={BUILDS_HREF} className="text-accent-deep hover:underline">
              See the full-stack builds →
            </Link>
          </p>
        </Reveal>

        {/* Narrowed, centered card column — the same layout as the home page's
            Selected Work, which shows only the COROS AI subset of the design projects. */}
        <div className="mx-auto mt-12 flex max-w-4xl flex-col gap-14">
          {DESIGN_CASE_STUDIES.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.08}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
