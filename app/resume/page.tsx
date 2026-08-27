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
    "Arshita Misra, UI/UX designer and design engineer at COROS AI. A concise, metric-led résumé of product design, design systems, and AI work.",
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
    title: "UI/UX Designer",
    company: "COROS AI",
    points: [
      <>
        Designed an AI coaching product <strong className="text-ink">0 to 1</strong> across
        web, iOS, and Android — ideation, wireframes, and user flows through high-fidelity
        responsive UI and front-end — taking it from concept to launch in{" "}
        <strong className="text-ink">2 months</strong>.
      </>,
      <>
        Shipped prototypes and interactive widgets as production code (TypeScript, React,
        Next.js with Claude Code), replacing static handoffs with working builds.
      </>,
      <>
        Redesigned onboarding and core experiences like chat and settings from 1:1 customer
        interviews, lifting new-signup next-day return to{" "}
        <strong className="text-ink">55%</strong> and weekly active users to{" "}
        <strong className="text-ink">40%</strong>.
      </>,
      <>
        Led migration from MUI to a token-driven shadcn/Tailwind design system (54+ semantic
        tokens, reusable components, light/dark, published Figma library), cutting
        design-to-review cycles from <strong className="text-ink">days to hours</strong>.
      </>,
      <>
        Authored the LLM prompts generating every on-screen element, prompt-engineered the
        memory/RAG retrieval behind session history, and built a Streamlit QA harness to
        validate model outputs.
      </>,
      <>
        Established brand identity — logo, typography, marketing posts, short-form video,
        and an investment pitch deck — that helped land the first round of investment.
      </>,
    ],
    tags: ["Product design", "Design systems", "AI prototyping", "Prompt engineering"],
  },
  {
    date: "Mar — Dec 2024",
    title: "UI/UX Design Intern",
    company: "Nitecapp",
    points: [
      <>
        Increased average tip size <strong className="text-ink">15%</strong> at a pilot bar
        venue with a gamified system (badges, streaks, progress bars) that turned backend
        metrics into real-time, actionable feedback.
      </>,
      <>
        Designed <strong className="text-ink">30+ screens</strong> across 5 core flows
        handling real-time updates, offline sync, and delayed-data states, cutting core
        workflows to <strong className="text-ink">under 4 taps</strong>.
      </>,
    ],
    tags: ["UX design", "Gamification", "Field research"],
  },
  {
    date: "Jul — Sep 2023",
    title: "UI/UX Design Intern",
    company: "Droisys",
    points: [
      <>
        Lifted retention and session duration in a spiritual wellness app by redesigning
        its mobile interface in Adobe XD, restructuring information architecture and user
        flows against user research findings.
      </>,
    ],
    tags: ["Mobile design", "Information architecture"],
  },
  {
    date: "Sep 2024 — Jun 2025",
    title: "UI/UX Designer & User Researcher",
    company: "Switcharoo, RESNA Accessibility Challenge",
    points: [
      <>
        Won <strong className="text-ink">2nd of 100 teams worldwide</strong> in the RESNA
        Accessibility Design Challenge with a WCAG-compliant, switch-accessible tablet app
        that reduced adult mediation during play for children with motor and cognitive
        disabilities.
      </>,
      <>
        Ran 1:1 interviews with teachers, classroom field observations, and scripted
        usability tests with <strong className="text-ink">25 children</strong> to shape the
        interface and app experience.
      </>,
    ],
    tags: ["Accessibility", "User research"],
  },
  {
    date: "Jan — Jun 2025",
    title: "UX Designer, Senior Capstone",
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
    items: [
      "Prompt engineering",
      "Context engineering",
      "RAG",
      "Agentic AI",
      "LLM prompt QA",
      "AI-assisted prototyping",
      "Claude Code",
      "Cursor",
      "Figma Make",
      "UX Pilot",
    ],
  },
  {
    group: "Design",
    tone: "lavender",
    items: [
      "Figma",
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
      "Tailwind CSS",
      "HTML/CSS",
      "JavaScript",
      "Python",
      "Git",
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
            At the intersection of UX, AI, systems thinking, and design systems, shipping
            end-to-end from research, information architecture, and visual design to
            high-fidelity UI, LLM prompts, and production front-end.
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
                B.S., Human Centered Design &amp; Engineering (Data Science concentration)
              </p>
              <p className="mt-3 text-caption text-ink-muted">
                Dean&rsquo;s List · GPA 3.93 / 4.0 · Sep 2021 – Jun 2025
              </p>
              <p className="mt-2 text-caption text-ink-muted">
                Coursework: Designing for AI, Human-Computer Interaction, Data
                Visualization, Accessible Design, Design Systems &amp; Libraries, Visual
                Communication Design, UI Design, UX Design
              </p>

              <div className="mt-8">
                <SectionLabel cloud cloudVariant="sky">
                  Leadership
                </SectionLabel>
                <h3 className="mt-6 font-display text-h3 font-semibold text-ink">
                  Engineering Peer Educator
                </h3>
                <p className="mt-1 text-body text-ink-muted">
                  UW College of Engineering · Sep – Dec 2023
                </p>
                <p className="mt-3 text-caption text-ink-muted">
                  Earned a 92% excellent-and-friendly rating across weekly mentorship
                  sessions on communication and collaboration skills.
                </p>
              </div>
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
