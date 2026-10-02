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
          <SectionLabel>Builds</SectionLabel>
          <h1 className="mt-4 max-w-3xl font-display text-h1 font-semibold text-ink">
            Products I designed, built and shipped.
          </h1>
          <Link
            href={PROJECTS_HREF}
            className="mt-3 inline-block text-body font-medium text-accent-deep underline-offset-4 hover:underline"
          >
            Design work →
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {BUILD_CASE_STUDIES.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.08}>
              <CaseStudyCard study={study} size="half" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
