import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import CaseStudyCard from "@/components/CaseStudyCard";
import CorosCarousel from "@/components/CorosCarousel";
import HeroIntro from "@/components/HeroIntro";
import PixelCloud from "@/components/PixelCloud";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { CONTACT_EMAIL } from "@/lib/contact";
import {
  BUILD_CASE_STUDIES,
  BUILDS_HREF,
  CASE_STUDIES,
  COROS_HUB_HREF,
  PROJECTS_HREF,
} from "@/lib/projects";

const COROS_CASE_STUDIES = CASE_STUDIES.filter((s) => s.company?.name === "COROS AI");

/*
 * Hero sky: each cloud gets a resting position (its `left`/`top`) — the
 * scattered sky users with reduced motion see — plus a long drift loop.
 * cloud-drift sweeps translateX from `from` to `to`, set per-cloud (via
 * --cloud-drift-from/-to) so every cloud clears the viewport by a fixed
 * 16vw margin on both sides regardless of its anchor — otherwise a cloud
 * anchored away from the edges (e.g. left: 38%) would wrap mid-air onto
 * a still-on-screen position instead of drifting back in from off-screen.
 * The negative delay is chosen so each cloud's transform lands at ~0 at
 * t=0 — i.e. right at its resting `left` — so the full sky is already
 * populated on first paint instead of drifting into view over the course
 * of the loop. delay = (left + DRIFT_MARGIN_VW) / 132 * duration, since
 * every cloud travels the same 132vw (100vw + 2 * margin) span — recompute
 * it whenever `left` or `drift` changes, or the cloud starts mid-flight.
 */
const DRIFT_MARGIN_VW = 16;

const HERO_CLOUDS = [
  // Three clouds spread across the width: one left, one center-right, one far right.
  { shape: "wisp", variant: "lavender", size: 120, top: "58%", left: 6, opacity: 0.4, drift: "cloud-drift-fast", delay: "-19s" },
  { shape: "wisp", variant: "sky", size: 170, top: "12%", left: 52, opacity: 0.45, drift: "cloud-drift-slow", delay: "-103s" },
  { shape: "wisp", variant: "pink", size: 140, top: "30%", left: 90, opacity: 0.45, drift: "cloud-drift-mid", delay: "-124s" },
] as const;

const LINKEDIN_HREF = "https://www.linkedin.com/in/arshita-misra/";

function CloudI({ variant }: { variant: "lavender" | "sky" }) {
  /*
   * A dotless "i" (U+0131) with our own tittle, so the real font dot never
   * shows. At rest the custom dot reads as a normal i-dot; on hovering the name
   * it fades out and a tiny cloud fades in its place (no sway — the cloud is
   * static). The cloud is sized in `em` (via w-[0.32em], overriding
   * PixelCloud's px width/height attributes) so it scales with the fluid
   * heading and stays dot-sized over the tittle.
   */
  return (
    <span className="relative inline-block">
      {"ı"}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-[0.16em] h-[0.12em] w-[0.12em] -translate-x-1/2 rounded-[1px] bg-ink transition-opacity duration-300 group-hover/name:opacity-0 motion-reduce:transition-none"
      />
      <PixelCloud
        shape="puff"
        variant={variant}
        size={24}
        className="absolute left-1/2 top-[0.10em] h-auto w-[0.32em] -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover/name:opacity-100 motion-reduce:transition-none"
      />
    </span>
  );
}

export default function Home() {
  return (
    <>
      {/* ================= Hero ================= */}
      <section className="relative overflow-hidden">
        {/* Sky sits behind the hero text only; the carousel band below stays clear. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {HERO_CLOUDS.map((cloud, i) => (
            <PixelCloud
              key={i}
              shape={cloud.shape}
              variant={cloud.variant}
              size={cloud.size}
              className={`absolute ${cloud.drift}`}
              style={{
                top: cloud.top,
                left: `${cloud.left}%`,
                opacity: cloud.opacity,
                animationDelay: cloud.delay,
                "--cloud-drift-from": `${-(cloud.left + DRIFT_MARGIN_VW)}vw`,
                "--cloud-drift-to": `${100 - cloud.left + DRIFT_MARGIN_VW}vw`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="container-site relative z-10 pb-10 pt-12 md:pb-12 md:pt-16">
          <HeroIntro>
            <p className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface-raised px-3 py-1 text-caption font-medium text-ink">
              <span aria-hidden="true" className="h-2 w-2 rounded-pill bg-mint-deep" />
              Open to work
            </p>

            <h1 className="mt-6 max-w-5xl font-display text-display font-semibold text-ink">
              <span className="group/name relative inline-block">
                <span className="sr-only">Arshita Misra</span>
                <span aria-hidden="true">
                  {/* Each name is nowrap so it never splits mid-word; the space
                      between them is the only break point, keeping "Arshita" and
                      "Misra" whole on tight aspect ratios (e.g. iPhone SE). */}
                  <span className="whitespace-nowrap">
                    Arsh<CloudI variant="lavender" />ta
                  </span>{" "}
                  <span className="whitespace-nowrap">
                    M<CloudI variant="sky" />sra
                  </span>
                </span>
              </span>
            </h1>

            <p className="mt-4 max-w-4xl text-balance font-display text-h1 font-medium text-ink">
              Product designer who <span className="text-accent-deep">ships the code</span>.
            </p>

            <div className="mt-5 max-w-2xl">
              <p className="text-body-lg text-ink-muted">
                From user research to production React on web, iOS and Android, I owned the
                whole product surface at an AI startup.
              </p>
              <Link
                href={COROS_HUB_HREF}
                className="mt-3 inline-flex flex-wrap items-center gap-x-1 gap-y-1 text-body text-accent-strong underline-offset-4 hover:underline"
              >
                <span className="whitespace-nowrap">Previously Founding Product Designer @</span>
                <Image
                  src="/images/logos/coros-ai.png"
                  alt="COROS AI"
                  width={116}
                  height={30}
                  className="inline-block"
                />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#selected-work" variant="secondary">
                See the work ↓
              </Button>
              <Button href="/resume" variant="secondary">
                Résumé
              </Button>
              <Button href={`mailto:${CONTACT_EMAIL}`} variant="secondary">
                Email me
              </Button>
            </div>
          </HeroIntro>
        </div>
      </section>

      {/* Full-bleed band of COROS AI screens, decorative. */}
      <div className="overflow-hidden">
        <div className="full-bleed" aria-hidden="true">
          <CorosCarousel />
        </div>
        <p className="sr-only">Screens from COROS AI</p>
      </div>

      {/* ================= Selected Work ================= */}
      <section id="selected-work" className="scroll-mt-16 py-section">
        <div className="container-site">
          <Reveal>
            <SectionLabel>Selected work</SectionLabel>
            <h2 className="mt-4 max-w-3xl font-display text-h2 font-semibold text-ink">
              Three case studies from COROS AI.
            </h2>
          </Reveal>

          <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-10">
            {COROS_CASE_STUDIES.map((study, i) => (
              <Reveal key={study.slug} delay={i * 0.08}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Builds ================= */}
      <section className="pb-section">
        <div className="container-site">
          <Reveal>
            <SectionLabel>Built end to end</SectionLabel>
            <h2 className="mt-4 max-w-3xl font-display text-h2 font-semibold text-ink">
              Two products designed, built and shipped solo, each in a day.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {BUILD_CASE_STUDIES.map((study, i) => (
              <Reveal key={study.slug} delay={i * 0.08}>
                <CaseStudyCard study={study} size="half" />
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <Link
              href={PROJECTS_HREF}
              className="text-body font-medium text-accent-deep underline-offset-4 hover:underline"
            >
              All design work →
            </Link>
            <Link
              href={BUILDS_HREF}
              className="text-body font-medium text-accent-deep underline-offset-4 hover:underline"
            >
              All builds →
            </Link>
          </div>
        </div>
      </section>

      {/* ================= Closing band ================= */}
      <section className="border-t border-line bg-surface py-section">
        <div className="container-site flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <div className="flex items-start gap-5">
              <PixelCloud shape="cumulus" variant="pink" size={72} className="mt-1 shrink-0" />
              <p className="max-w-xl font-display text-h2 font-medium text-ink">
                Hiring a designer who can ship the whole thing?
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-4 md:flex-nowrap">
              <Button href={`mailto:${CONTACT_EMAIL}`} variant="secondary">
                Email me
              </Button>
              <Button href="/resume" variant="secondary" className="shrink-0 whitespace-nowrap">
                Résumé
              </Button>
              <Button
                href={LINKEDIN_HREF}
                external
                variant="secondary"
                className="shrink-0 whitespace-nowrap"
              >
                LinkedIn
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
