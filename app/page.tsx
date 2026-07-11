import Link from "next/link";
import Button from "@/components/Button";
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
 * of the ~65-120s loop.
 */
const DRIFT_MARGIN_VW = 16;

const HERO_CLOUDS = [
  { shape: "wisp", variant: "sky", size: 170, top: "12%", left: 4, opacity: 0.6, drift: "cloud-drift-slow", delay: "-30s" },
  { shape: "cumulus", variant: "pink", size: 140, top: "20%", left: 38, opacity: 0.8, drift: "cloud-drift-mid", delay: "-63s" },
  { shape: "puff", variant: "lavender", size: 88, top: "50%", left: 14, opacity: 0.7, drift: "cloud-drift-fast", delay: "-26s" },
  { shape: "cumulus", variant: "sky", size: 108, top: "68%", left: 62, opacity: 0.55, drift: "cloud-drift-slow", delay: "-118s" },
  { shape: "wisp", variant: "pink", size: 150, top: "38%", left: 76, opacity: 0.5, drift: "cloud-drift-mid", delay: "-108s" },
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

function CorosCover() {
  /*
   * Composed cover graphic for the featured card: pastel sky + pixel clouds
   * + an abstract, token-styled chat vignette. Swap this element for a real
   * product image or video via ProjectCard's `cover` slot when ready.
   */
  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-[2/1] items-center justify-center overflow-hidden bg-gradient-to-br from-accent-soft via-surface to-sky-soft md:aspect-[5/2]"
    >
      <PixelCloud shape="cumulus" variant="pink" size={130} className="absolute left-[6%] top-[14%] opacity-80" />
      <PixelCloud shape="puff" variant="sky" size={70} className="absolute right-[10%] top-[20%] opacity-70" />
      <PixelCloud shape="wisp" variant="lavender" size={150} className="absolute bottom-[12%] left-[16%] opacity-60" />

      {/* Abstract chat-UI vignette built from tokens */}
      <div className="relative w-[68%] max-w-md rounded-frame border border-line bg-surface-raised/90 p-4 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0 md:p-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-pill bg-accent" />
          <span className="h-2 w-16 rounded-pill bg-line" />
        </div>
        <div className="mt-4 space-y-3">
          <div className="max-w-[75%] space-y-1.5 rounded-card rounded-bl-[4px] bg-surface p-3">
            <span className="block h-2 w-4/5 rounded-pill bg-accent-soft" />
            <span className="block h-2 w-3/5 rounded-pill bg-accent-soft" />
          </div>
          <div className="ml-auto max-w-[60%] space-y-1.5 rounded-card rounded-br-[4px] bg-lavender-soft p-3">
            <span className="block h-2 w-full rounded-pill bg-surface-raised/80" />
          </div>
          <div className="max-w-[70%] space-y-1.5 rounded-card rounded-bl-[4px] bg-surface p-3">
            <span className="block h-2 w-3/4 rounded-pill bg-accent-soft" />
          </div>
        </div>
      </div>
    </div>
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
                Arsh<CloudI variant="lavender" />ta M<CloudI variant="sky" />sra
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

          <Reveal delay={0.1}>
            <div className="mt-8">
              <ProjectCard
                href={COROS_HUB_HREF}
                title="COROS AI — Ontological AI Coach"
                subtitle="Founding AI Designer"
                description="Designing an AI coaching platform end to end — product, AI behavior, design system, and brand."
                tags={[
                  { label: "Product Design", tone: "pink" },
                  { label: "AI/UX", tone: "lavender" },
                  { label: "Prompt Engineering", tone: "sky" },
                  { label: "Design Systems", tone: "mint" },
                  { label: "0→1", tone: "butter" },
                ]}
                cover={<CorosCover />}
              />
            </div>
          </Reveal>

          {/* Direct entrances for recruiters who want to jump straight in */}
          <Reveal delay={0.2}>
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
            <div className="flex flex-wrap gap-4">
              <Button href="https://www.linkedin.com/in/arshita-misra/" external>
                Say hi on LinkedIn
              </Button>
              <Button href="/about" variant="secondary">
                More about me
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
