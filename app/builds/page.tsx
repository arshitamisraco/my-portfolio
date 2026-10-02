import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyCard from "@/components/CaseStudyCard";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { PROJECTS_HREF, BUILD_CASE_STUDIES } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Full-stack builds",
  description:
    "Products Arshita Misra designed and built end to end with AI coding agents: a WCAG accessibility auditor that writes the fix, and a Gmail-powered job tracker, each shipped in a day.",
};

export default function Builds() {
  return (
    <section className="py-section">
      <div className="container-site">
        <Reveal>
          <SectionLabel cloud>Full-stack builds</SectionLabel>
          <h1 className="mt-4 max-w-3xl font-display text-h1 font-semibold text-ink">
            Products that I built end to end.
          </h1>
          <p className="mt-4 text-body text-ink-muted">
            Looking for the design case studies?{" "}
            <Link href={PROJECTS_HREF} className="text-accent-deep hover:underline">
              See the design projects →
            </Link>
          </p>
        </Reveal>

        {/* Narrowed, centered card column — the same layout as /projects. */}
        <div className="mx-auto mt-12 flex max-w-4xl flex-col gap-14">
          {BUILD_CASE_STUDIES.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.08}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
