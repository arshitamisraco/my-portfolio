import type { Metadata } from "next";
import Link from "next/link";
import ImageFrame from "@/components/ImageFrame";
import PixelCloud from "@/components/PixelCloud";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import TagChip from "@/components/TagChip";
import { COROS_CASE_STUDIES } from "@/lib/coros";

export const metadata: Metadata = {
  title: "COROS AI — Ontological AI Coach",
  description:
    "Arshita Misra is the founding AI designer at COROS AI, an ontological coaching platform — spanning product design, UX, prompt engineering, research, and brand.",
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
              <li>Work</li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                COROS AI
              </li>
            </ol>
          </nav>

          <p className="text-style-eyebrow mt-10 text-accent-deep">
            Founding AI Designer · June 2025 – Present
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-h1 font-semibold text-ink">
            COROS AI — an ontological coach built on conversations that transform.
          </h1>

          <div className="case-prose mt-8">
            <p>
              COROS AI is an ontological coaching platform that helps professionals
              navigate moods, repair relationships, and take action when they&rsquo;re
              stuck. It is built on a simple but profound thesis:{" "}
              <strong>
                the transformation of human beings is the transformation of our language.
              </strong>{" "}
              Our capacity to listen, to trust, to coordinate promises, to handle
              breakdowns in language — these are not &ldquo;soft skills.&rdquo; They are
              hard and critical skills that have been systematically neglected.
            </p>
            <p>COROS helps users:</p>
            <ul>
              <li>Track and shift moods before breakdowns spiral into bigger messes.</li>
              <li>Reflect on key relationships and how people show up in conversations.</li>
              <li>Coordinate promises and recover from breakdowns with agility.</li>
              <li>Reframe challenges as games worth playing.</li>
              <li>
                Create different futures than the obvious outcomes by shifting moods.
              </li>
            </ul>
            <p>
              I joined as the founding designer — and since June 2025 my work has spanned
              product design, UX, prompt engineering, user research, and brand.
            </p>
          </div>

          <ImageFrame
            alt="COROS AI product hero — the coaching chat interface in the redesigned light theme"
            plannedSrc="/images/coros/product-hero.png"
            aspect="wide"
            tone="sky"
            caption="The COROS AI coaching surface."
          />
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

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {COROS_CASE_STUDIES.map((study, i) => (
              <Reveal key={study.slug} delay={i * 0.08}>
                <Link
                  href={study.href}
                  className="group flex h-full flex-col rounded-frame border border-line bg-surface-raised p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent motion-reduce:hover:translate-y-0"
                >
                  <PixelCloud
                    shape="puff"
                    variant={study.tone === "lavender" ? "lavender" : study.tone === "sky" ? "sky" : "pink"}
                    size={44}
                  />
                  <h3 className="mt-5 font-display text-h3 font-semibold text-ink group-hover:text-accent-deep">
                    {study.title}
                  </h3>
                  <p className="mt-3 flex-1 text-body text-ink-muted">{study.brief}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <TagChip key={tag} tone={study.tone}>
                        {tag}
                      </TagChip>
                    ))}
                  </div>
                  <p className="mt-5 text-caption font-medium text-accent-deep">
                    Read the case study{" "}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                    >
                      →
                    </span>
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
