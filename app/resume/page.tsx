import type { Metadata } from "next";
import Button from "@/components/Button";
import PixelCloud from "@/components/PixelCloud";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import TagChip, { type ChipTone } from "@/components/TagChip";
import { PROJECTS_HREF } from "@/lib/projects";
import { RESUME_PDF_URL } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Arshita Misra, product designer and design engineer at COROS AI. A short, results-focused résumé covering product design, design systems, and AI work.",
};

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
    date: "Jul 2025 — Aug 2026",
    title: "Founding Product Designer",
    company: "COROS AI",
    points: [
      <>
        Executed end-to-end design of an AI coaching product{" "}
        <strong className="text-ink">0 to 1</strong> across web, iOS, and
        Android, from ideation, mockups, and user flows to high-fidelity
        responsive UI and front-end, taking it from concept to launch in{" "}
        <strong className="text-ink">2 months</strong>.
      </>,
      <>
        Created prototypes and interactive widgets demonstrating
        micro-interactions, then shipped them as production code (TypeScript,
        React, Next.js using Claude Code), replacing static handoffs with
        working builds.
      </>,
      <>
        Redesigned onboarding and core app experiences from 1:1 customer
        interviews and usability findings, lifting new-signup next-day return to{" "}
        <strong className="text-ink">55%</strong> and weekly active users to{" "}
        <strong className="text-ink">40%</strong>, measured by Mixpanel.
      </>,
      <>
        Led migration from MUI to a token-driven shadcn/Tailwind design system
        (54+ semantic tokens, design patterns, light/dark, published Figma
        component libraries), cutting design-to-review cycles from{" "}
        <strong className="text-ink">days to hours</strong>.
      </>,
      <>
        Authored the LLM prompts generating every on-screen element,
        prompt-engineered the memory/RAG retrieval logic behind session history,
        and built a Streamlit QA harness to validate model outputs.
      </>,
      <>
        Invented design narratives to communicate decisions to diverse
        stakeholders and created an internal tool that let founders, PMs, and
        engineers evaluate AI responses and collaborate in an agile environment.
      </>,
      <>
        Established brand identity, logo, and typography in Adobe Creative
        Cloud, and designed marketing visuals (posts, short-form video, and an
        investment pitch deck) that led to the first round of investment.
      </>,
    ],
    tags: [
      "Product design",
      "Design systems",
      "AI prototyping",
      "Prompt engineering",
    ],
  },
  {
    date: "Jun — Sep 2024",
    title: "UI/UX Design Intern",
    company: "Nitecapp",
    points: [
      <>
        Increased average tip size <strong className="text-ink">15%</strong> at
        a pilot bar venue by designing a gamified system (badges, streaks,
        progress bars) that turned backend analytics into real-time, actionable
        feedback.
      </>,
      <>
        Designed <strong className="text-ink">30+ screens</strong> across 5 core
        flows and wrote documentation, handling real-time updates, offline sync,
        and delayed-data states, cutting core workflows to{" "}
        <strong className="text-ink">under 4 taps</strong>.
      </>,
    ],
    tags: ["UX design", "Gamification", "Field research"],
  },
];

/* ---------- Projects ---------- */
const PROJECTS: Role[] = [
  {
    date: "Sep 2026",
    title: "Gmail Job Tracker",
    company: "Full-stack Product Builder",
    points: [
      <>
        Built a full-stack Gmail job tracker end to end with Claude Code
        (TypeScript, React, Next.js, SQLite), using an LLM classifier to
        auto-sort <strong className="text-ink">200+</strong> application emails
        into pipeline stages with <strong className="text-ink">96%</strong>{" "}
        needing no manual correction.
      </>,
    ],
    tags: ["Next.js", "LLM classifier", "SQLite"],
  },
  {
    date: "Sep 2026",
    title: "WCAG Accessibility Auditor",
    company: "Full-stack Product Builder",
    points: [
      <>
        Built an AI accessibility auditor with Claude Code that queues scans
        (Inngest), tests pages (Playwright, axe-core), stores history
        (Postgres), and tracks usage (PostHog), flagging{" "}
        <strong className="text-ink">900+</strong> WCAG issues across{" "}
        <strong className="text-ink">25</strong> sites.
      </>,
    ],
    tags: ["Playwright", "axe-core", "Postgres"],
  },
  {
    date: "Sep 2024 — Jun 2025",
    title: "Switcharoo",
    company: "UX Designer & User Researcher",
    points: [
      <>
        Won <strong className="text-ink">2nd of 100 teams worldwide</strong> in
        the RESNA Accessibility Design Challenge with a WCAG-compliant,
        switch-accessible game library that cut caretaker support from{" "}
        <strong className="text-ink">
          1 per child to 1 per classroom of 20
        </strong>
        , scoped through teacher interviews and usability tests with 25
        children.
      </>,
    ],
    tags: ["Accessibility", "User research"],
  },
  {
    date: "Jan — Jun 2025",
    title: "Edmonds Historical Museum",
    company: "UI/UX Designer, Senior Capstone",
    points: [
      <>
        Increased exhibit publishing capacity from{" "}
        <strong className="text-ink">250 to 30,000+ items</strong> and helped
        negotiate and secure a{" "}
        <strong className="text-ink">$20,000 grant</strong> by designing a
        user-friendly modular publishing web application and reliable design
        system.
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
    items: [
      "Prompt engineering",
      "Context engineering",
      "RAG",
      "Agentic AI",
      "LLM prompt QA",
      "AI-assisted prototyping",
      "Claude Code",
      "Figma Make",
      "UX Pilot",
      "Cursor",
      "Dynamic meta prompting",
    ],
  },
  {
    group: "Design",
    tone: "lavender",
    items: [
      "Figma",
      "Adobe XD",
      "Adobe CC",
      "Design systems & tokens",
      "Wireframing & prototyping",
      "Interaction & micro-interaction design",
      "Responsive design",
      "Accessible design (WCAG)",
    ],
  },
  {
    group: "Engineering",
    tone: "sky",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Three.js",
      "Tailwind CSS",
      "HTML/CSS",
      "JavaScript",
      "Python",
    ],
  },
  {
    group: "Research",
    tone: "mint",
    items: [
      "Qualitative & quantitative research",
      "Competitive analysis",
      "Usability testing",
      "Personas",
      "Journey mapping",
    ],
  },
];

function EntryList({ items }: { items: Role[] }) {
  return (
    <div className="mt-10 space-y-0">
      {items.map((role, i) => (
        <Reveal key={role.title} delay={i * 0.05}>
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
  );
}

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
            Product Designer &amp; Design Engineer
          </p>
          <p className="mt-6 max-w-2xl text-body-lg text-ink-muted">
            Working at the intersection of UX, AI, systems thinking, and design
            systems, and shipping end-to-end: research, information
            architecture, and visual design through to high-fidelity UI, LLM
            prompts, and production front-end.
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

      {/* ================= Experience ================= */}
      <section className="border-t border-line py-section">
        <div className="container-site">
          <SectionLabel cloud cloudVariant="lavender">
            Experience
          </SectionLabel>

          <EntryList items={ROLES} />
        </div>
      </section>

      {/* ================= Projects ================= */}
      <section className="border-t border-line py-section">
        <div className="container-site">
          <SectionLabel cloud cloudVariant="pink">
            Projects
          </SectionLabel>
          <EntryList items={PROJECTS} />
        </div>
      </section>

      {/* ================= Education ================= */}
      <section className="border-t border-line bg-surface py-section">
        <div className="container-site">
          {/* Education */}
          <Reveal>
            <div>
              <SectionLabel cloud cloudVariant="sky">
                Education
              </SectionLabel>
              <div className="mt-10 grid gap-4 md:grid-cols-[1fr_2fr] md:gap-12">
                {/* Left: meta */}
                <div>
                  <p className="text-style-eyebrow text-accent-deep">
                    Sep 2021 – Jun 2025
                  </p>
                  <h2 className="mt-3 font-display text-h3 font-semibold text-ink">
                    University of Washington
                  </h2>
                  <p className="mt-1 text-body text-ink-muted">
                    B.S., Human Centered Design &amp; Engineering (Data Science
                    concentration)
                  </p>
                </div>

                {/* Right: details */}
                <div>
                  <p className="text-body-lg text-ink-muted">
                    Dean&rsquo;s List · Major GPA 3.93 / 4.0
                  </p>
                  <p className="mt-3 text-body-lg text-ink-muted">
                    Relevant coursework: Designing for AI, Human-Computer
                    Interaction (HCI), Data Visualization, Accessible Design,
                    Design Systems &amp; Libraries, Visual Communication Design,
                    User Interface Design (UI), User Experience Design (UX)
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Skills ================= */}
      <section className="border-t border-line py-section">
        <div className="container-site">
          <Reveal>
            <SectionLabel cloud cloudVariant="pink">
              Skills
            </SectionLabel>
            <div className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {SKILLS.map((s) => (
                <div key={s.group}>
                  <p className="text-caption font-semibold text-ink">
                    {s.group}
                  </p>
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
          </Reveal>
        </div>
      </section>

      {/* ================= Closing CTA ================= */}
      <section className="py-section">
        <div className="container-site flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <div className="flex items-start gap-5">
              <PixelCloud
                shape="puff"
                variant="lavender"
                size={56}
                className="mt-1 shrink-0"
              />
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
