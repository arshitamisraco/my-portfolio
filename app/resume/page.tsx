import type { Metadata } from "next";
import Button from "@/components/Button";
import PixelCloud from "@/components/PixelCloud";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import TagChip, { type ChipTone } from "@/components/TagChip";
import { PROJECTS_HREF } from "@/lib/coros";
import { RESUME_PDF_URL } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Arshita Misra — founding product designer at COROS AI. A concise, metric-led résumé of product design, design systems, and AI work.",
};

/* ---------- Headline impact metrics ---------- */
const STATS: { value: string; label: string; tone: ChipTone }[] = [
  { value: "55%", label: "Next-day return from early signups", tone: "pink" },
  { value: "+15%", label: "KPI lift at pilot venue", tone: "peach" },
  { value: "2nd / 100", label: "Teams worldwide — RESNA challenge", tone: "mint" },
  { value: "$20K", label: "Grant secured for museum platform", tone: "lavender" },
];

/* ---------- Experience (metric-led, trimmed to the strongest work) ---------- */
interface Role {
  date: string;
  title: string;
  company: string;
  points: React.ReactNode[];
  tags: string[];
}

const ROLES: Role[] = [
  {
    date: "Jul 2025 — Present",
    title: "Founding Product Designer",
    company: "COROS AI",
    points: [
      <>
        Redesigned onboarding and core interaction patterns so{" "}
        <strong className="text-ink">55%</strong> of early signups return the next day and{" "}
        <strong className="text-ink">40%</strong> of registered users are weekly actives,
        informed by user research.
      </>,
      <>
        Rebuilt the design system on a scalable token architecture with light/dark modes,
        shipped as a shared Figma library so multiple designers build in parallel across
        web and mobile.
      </>,
      <>
        Cut design-to-build cycles from <strong className="text-ink">days to hours</strong>{" "}
        with functional HTML/CSS/JS and AI-powered prototypes.
      </>,
    ],
    tags: ["Product design", "Design systems", "AI prototyping"],
  },
  {
    date: "Mar — Dec 2024",
    title: "UX Design Intern",
    company: "Nitecapp",
    points: [
      <>
        Lifted a key engagement metric <strong className="text-ink">15%</strong> at a pilot
        venue with a gamified performance system — badges, streaks, and real-time feedback.
      </>,
      <>
        Designed <strong className="text-ink">30+ screens</strong> across 5 flows and
        optimized core workflows to <strong className="text-ink">under 4 taps</strong> for
        low-visibility environments.
      </>,
    ],
    tags: ["UX design", "Gamification", "Field research"],
  },
  {
    date: "Sep 2024 — Jun 2025",
    title: "Product Designer",
    company: "Switcharoo — RESNA Accessibility Challenge",
    points: [
      <>
        Placed <strong className="text-ink">2nd of 100 teams worldwide</strong> for a
        switch-accessible tablet app co-designed with 13 children with motor and cognitive
        disabilities.
      </>,
      <>
        Built 6 WCAG-compliant games on a modular Figma framework, reducing adult mediation
        during peer play.
      </>,
    ],
    tags: ["Accessibility", "Inclusive design"],
  },
  {
    date: "Jan — Jun 2025",
    title: "UX Designer — Senior Capstone",
    company: "Edmonds Historical Museum",
    points: [
      <>
        Scaled exhibit publishing capacity from{" "}
        <strong className="text-ink">250 to 30,000+ items</strong> and secured a{" "}
        <strong className="text-ink">$20K grant</strong> with a modular platform, design
        system, and expansion roadmap.
      </>,
    ],
    tags: ["Design systems", "Strategy"],
  },
];

/* ---------- Skills, grouped ---------- */
const SKILLS: { group: string; tone: ChipTone; items: string[] }[] = [
  {
    group: "AI & emerging tech",
    tone: "pink",
    items: ["AI vibe coding", "Figma Make", "UX Pilot", "Claude Code", "RAG", "Agentic AI"],
  },
  {
    group: "Design",
    tone: "lavender",
    items: ["Figma", "Adobe CC", "Prototyping", "Micro-interactions", "Design systems"],
  },
  {
    group: "Technical",
    tone: "sky",
    items: ["HTML/CSS", "JavaScript", "Python", "SQL", "Tableau", "Power BI"],
  },
  {
    group: "Research",
    tone: "mint",
    items: ["Usability testing", "Interviews", "Journey mapping", "Personas", "Survey design"],
  },
];

const STAT_TONE: Record<ChipTone, string> = {
  pink: "bg-surface text-accent-deep",
  lavender: "bg-lavender-soft text-lavender-deep",
  sky: "bg-sky-soft text-sky-deep",
  mint: "bg-mint-soft text-mint-deep",
  butter: "bg-butter-soft text-butter-deep",
  peach: "bg-peach-soft text-peach-deep",
};

export default function Resume() {
  return (
    <>
      {/* ================= Header ================= */}
      <section className="relative overflow-hidden py-section">
        <PixelCloud
          shape="wisp"
          variant="sky"
          size={160}
          className="absolute right-[8%] top-12 opacity-50"
          aria-hidden
        />
        <div className="container-site relative">
          <SectionLabel cloud>Résumé</SectionLabel>
          <h1 className="mt-6 max-w-3xl font-display text-display font-semibold text-ink">
            Arshita Misra
          </h1>
          <p className="mt-4 font-display text-h2 font-medium text-accent-deep">
            Founding Product Designer
          </p>
          <p className="mt-6 max-w-2xl text-body-lg text-ink-muted">
            Product designer obsessed with human-centered AI — shipping end to end across
            product, design systems, and AI behavior.
            <br />
            B.S. in Human Centered Design &amp; Engineering, University of Washington.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {/* Opens the hosted résumé in Google Drive's viewer (new tab). */}
            <Button href={RESUME_PDF_URL} external>
              View PDF
            </Button>
            <Button href="/contact" variant="secondary">
              Contact me
            </Button>
            <Button
              href="https://www.linkedin.com/in/arshita-misra/"
              variant="secondary"
              external
            >
              LinkedIn
            </Button>
          </div>
        </div>
      </section>

      {/* ================= Impact metrics ================= */}
      <section className="pb-section">
        <div className="container-site">
          <Reveal>
            <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className={`rounded-frame p-6 ${STAT_TONE[s.tone]}`}
                >
                  <dt className="font-display text-h1 font-semibold leading-none">
                    {s.value}
                  </dt>
                  <dd className="mt-3 text-caption font-medium text-ink-muted">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ================= Experience ================= */}
      <section className="border-t border-line py-section">
        <div className="container-site">
          <SectionLabel cloud cloudVariant="lavender">
            Experience
          </SectionLabel>

          <div className="mt-10 space-y-0">
            {ROLES.map((role, i) => (
              <Reveal key={role.company} delay={i * 0.05}>
                <div className="grid gap-4 border-t border-line py-16 first:border-t-0 first:pt-0 md:grid-cols-[1fr_2fr] md:gap-12">
                  {/* Left: meta */}
                  <div>
                    <p className="text-style-eyebrow text-accent-deep">{role.date}</p>
                    <h2 className="mt-3 font-display text-h3 font-semibold text-ink">
                      {role.title}
                    </h2>
                    <p className="mt-1 text-body text-ink-muted">{role.company}</p>
                  </div>

                  {/* Right: metric-led points + tags */}
                  <div>
                    <ul className="space-y-3">
                      {role.points.map((p, j) => (
                        <li
                          key={j}
                          className="relative pl-6 text-body-lg text-ink-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-2.5 h-2 w-2 bg-accent"
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {role.tags.map((t) => (
                        <TagChip key={t}>{t}</TagChip>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Education + Skills ================= */}
      <section className="border-t border-line bg-surface py-section">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_2fr] lg:gap-24">
          {/* Education */}
          <Reveal>
            <div>
              <SectionLabel cloud cloudVariant="sky">
                Education
              </SectionLabel>
              <h2 className="mt-6 font-display text-h3 font-semibold text-ink">
                University of Washington
              </h2>
              <p className="mt-1 text-body text-ink-muted">
                B.S., Human Centered Design &amp; Engineering (Data Science)
              </p>
              <p className="mt-3 text-caption text-ink-muted">
                Dean&rsquo;s List · GPA 3.8 / 4.0 · Jun 2025
              </p>
            </div>
          </Reveal>

          {/* Skills */}
          <Reveal delay={0.05}>
            <div>
              <SectionLabel cloud cloudVariant="pink">
                Skills
              </SectionLabel>
              <div className="mt-6 space-y-6">
                {SKILLS.map((s) => (
                  <div key={s.group}>
                    <p className="text-caption font-semibold text-ink">{s.group}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {s.items.map((item) => (
                        <TagChip key={item} tone={s.tone}>
                          {item}
                        </TagChip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Closing CTA ================= */}
      <section className="py-section">
        <div className="container-site flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <div className="flex items-start gap-5">
              <PixelCloud shape="puff" variant="lavender" size={56} className="mt-1 shrink-0" />
              <p className="max-w-xl font-display text-h2 font-medium text-ink">
                Want the full story behind these numbers?
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-4">
              <Button href={PROJECTS_HREF}>See my work</Button>
              <Button href="/contact" variant="secondary">
                Contact me
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
