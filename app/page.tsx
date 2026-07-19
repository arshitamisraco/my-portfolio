import Link from "next/link";
import Button from "@/components/Button";
import CorosCarousel from "@/components/CorosCarousel";
import PixelCloud from "@/components/PixelCloud";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { COROS_CASE_STUDIES, COROS_HUB_HREF } from "@/lib/coros";

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
  // Two light clouds anchor the left in its empty pockets (above the eyebrow,
  // below the buttons) so the sky isn't lopsided; the fuller cluster sits right.
  { shape: "puff", variant: "pink", size: 96, top: "6%", left: 3, opacity: 0.28, drift: "cloud-drift-slow", delay: "-29s" },
  { shape: "wisp", variant: "lavender", size: 120, top: "82%", left: 6, opacity: 0.4, drift: "cloud-drift-fast", delay: "-19s" },
  { shape: "wisp", variant: "sky", size: 170, top: "12%", left: 52, opacity: 0.5, drift: "cloud-drift-slow", delay: "-103s" },
  { shape: "cumulus", variant: "pink", size: 125, top: "22%", left: 74, opacity: 0.6, drift: "cloud-drift-mid", delay: "-106s" },
  { shape: "puff", variant: "lavender", size: 88, top: "50%", left: 68, opacity: 0.6, drift: "cloud-drift-fast", delay: "-73s" },
  { shape: "cumulus", variant: "sky", size: 108, top: "68%", left: 84, opacity: 0.5, drift: "cloud-drift-slow", delay: "-152s" },
  { shape: "wisp", variant: "pink", size: 140, top: "38%", left: 90, opacity: 0.45, drift: "cloud-drift-mid", delay: "-124s" },
] as const;

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
      {/* ================= Hero — "Arshita Misra, as an offer" ================= */}
      <section className="relative overflow-hidden">
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

        <div className="container-site relative z-10 flex min-h-[78vh] flex-col justify-center py-section">
          <p className="text-style-eyebrow text-accent-deep">Hey, I&rsquo;m</p>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.5rem,9vw+1rem,7rem)] font-semibold leading-[1.05] text-ink">
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
          <p className="mt-6 max-w-5xl text-balance font-display text-h1 font-medium text-ink">
            A <span className="text-accent-deep">Product designer who engineers</span>,{" "}
            crafting technology that evolves humans.
          </p>
          <div className="mt-8 flex max-w-3xl flex-col gap-y-1 text-body-lg text-ink-muted">
            <p>
              Currently leading{" "}
              <Link href={COROS_HUB_HREF} className="text-accent-strong underline-offset-4 hover:underline">
                AI Design @ COROS AI
              </Link>
            </p>
            <p>Human Centered Design and Engineering at the University of Washington 2025</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#selected-work">See my work ↓</Button>
            <Button href="/about" variant="secondary">
              About me
            </Button>
          </div>
        </div>

        {/* Cloud-themed scroll cue, floating at the base of the hero */}
        <Link
          href="#selected-work"
          aria-label="Scroll to selected work"
          className="group absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center opacity-80 transition-opacity duration-300 hover:opacity-100"
        >
          <span className="scroll-hint relative flex flex-col items-center">
            <PixelCloud shape="puff" variant="sky" size={40} />
            <span aria-hidden="true" className="-mt-1 text-accent-deep">
              ↓
            </span>
          </span>
        </Link>
      </section>

      {/* ================= Selected Work ================= */}
      <section id="selected-work" className="scroll-mt-16 py-section">
        <div className="container-site">
          <Reveal>
            <SectionLabel cloud>Selected Work</SectionLabel>
          </Reveal>

          {/* Card + its direct-entrance links reveal together as one unit — the
              links belong to the card, so a single Reveal keeps them from fading
              in a scroll behind it. */}
          <Reveal delay={0.1}>
            <div className="mt-8">
              <ProjectCard
                href={COROS_HUB_HREF}
                title="COROS AI: an AI coaching platform"
                subtitle="Founding AI Designer"
                description="Designing an AI coaching platform end to end — product, AI behavior, design system, and brand. Onboarding and interaction redesigns drove 55% next-day return from early signups and 40% weekly actives."
                tags={[
                  { label: "Product Design", tone: "pink" },
                  { label: "AI/UX", tone: "lavender" },
                  { label: "Prompt Engineering", tone: "sky" },
                  { label: "Design Systems", tone: "mint" },
                  { label: "0→1", tone: "butter" },
                ]}
                cover={<CorosCarousel />}
              />
            </div>

            {/* Direct entrances for recruiters who want to jump straight in */}
            <ul className="mt-6 flex flex-wrap gap-3">
              {COROS_CASE_STUDIES.map((study) => (
                <li key={study.slug}>
                  <Link
                    href={study.href}
                    className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface-raised px-4 py-2 text-caption font-medium text-ink-muted transition-colors hover:border-accent hover:text-accent-deep"
                  >
                    {study.shortTitle}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ================= Closing band ================= */}
      <section className="border-t border-line bg-surface py-section">
        <div className="container-site flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <div className="flex items-start gap-5">
              <PixelCloud shape="cumulus" variant="pink" size={72} className="mt-1 shrink-0" />
              <p className="max-w-xl font-display text-h2 font-medium text-ink">
                Currently designing the future of AI coaching at COROS AI.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-4 md:flex-nowrap">
              <Button
                href="https://www.linkedin.com/in/arshita-misra/"
                external
                className="shrink-0 whitespace-nowrap"
              >
                Say hi on LinkedIn
              </Button>
              <Button href="/about" variant="secondary" className="shrink-0 whitespace-nowrap">
                More about me
              </Button>
              <Button href="/contact" variant="secondary" className="shrink-0 whitespace-nowrap">
                Get in touch
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
