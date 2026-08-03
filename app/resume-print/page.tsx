import type { Metadata } from "next";
import PixelCloud from "@/components/PixelCloud";

export const metadata: Metadata = {
  title: "Résumé (print)",
  description: "Print-ready résumé, rendered to PDF by scripts/resume-pdf.mjs.",
  robots: { index: false },
};

/* ============================================================
   Print résumé — a Letter-sized sheet in the site's design
   language. Unlinked from site navigation; `npm run resume:pdf`
   renders this route to public/documents/Arshita-Misra-Resume.pdf
   with headless Chrome. Keep all content one page tall.
   ============================================================ */

const CONTACT: { label: string; href?: string }[] = [
  { label: "arshita.co", href: "https://arshita.co" },
  { label: "Seattle, WA" },
  { label: "arshitamisraco@gmail.com", href: "mailto:arshitamisraco@gmail.com" },
  { label: "+1 (206) 777-5333" },
  {
    label: "linkedin.com/in/arshita-misra",
    href: "https://www.linkedin.com/in/arshita-misra",
  },
];

interface PrintRole {
  title: string;
  org: string;
  date: string;
  location?: string;
  points: React.ReactNode[];
}

const EXPERIENCE: PrintRole[] = [
  {
    title: "Founding Product Designer",
    org: "COROS AI (AI coaching startup)",
    date: "Jul 2025 – Present",
    location: "Seattle, WA",
    points: [
      <>
        Designed and shipped an AI coaching product 0 to 1 across web, iOS, and Android,
        from IA to high-fidelity responsive UI, taking it from concept to launch in{" "}
        <strong>2 months</strong>.
      </>,
      <>
        Shipped widgets in production code (TypeScript + React on Next.js using Claude
        Code), delivering working builds to engineers instead of static handoffs.
      </>,
      <>
        Redesigned onboarding and the app experience post-launch; <strong>55%</strong> of
        early signups returned the next day and <strong>40%</strong> of registered users
        are weekly actives.
      </>,
      <>
        Wrote and versioned the LLM prompts generating every on-screen element and
        designed the memory/RAG retrieval logic behind the session history system.
      </>,
      <>
        Built a Streamlit QA harness that validates model outputs field-by-field against
        schema rules, cutting prompt-iteration cycles from <strong>days to minutes</strong>.
      </>,
      <>
        Led migration from Material UI to a token-driven shadcn/Tailwind system (54+
        semantic tokens, light/dark, published Figma library), cutting design-to-review
        cycles from <strong>days to hours</strong>.
      </>,
    ],
  },
  {
    title: "UX Design Intern",
    org: "Nitecapp (Hospitality training startup)",
    date: "Mar – Dec 2024",
    location: "Seattle, WA",
    points: [
      <>
        Increased average tip size <strong>15%</strong> at a pilot bar venue by designing
        a gamified system (badges, streaks, progress bars) that turned backend metrics
        into real-time, actionable feedback.
      </>,
      <>
        Designed <strong>30+ screens</strong> across 5 core flows handling real-time
        updates, offline sync, and delayed-data states, cutting core workflows to{" "}
        <strong>under 4 taps</strong>.
      </>,
    ],
  },
];

const PROJECTS: PrintRole[] = [
  {
    title: "Switcharoo",
    org: "Product Designer, RESNA Student Accessibility Design Challenge",
    date: "Sep 2024 – Jun 2025",
    points: [
      <>
        Won <strong>2nd of 100 teams worldwide</strong> with a WCAG-compliant,
        switch-accessible tablet app that reduced adult mediation during peer play for 13
        children with motor and cognitive disabilities.
      </>,
    ],
  },
  {
    title: "Edmonds Historical Museum",
    org: "UX Designer, Senior Capstone",
    date: "Jan – Jun 2025",
    points: [
      <>
        Increased exhibit publishing capacity from <strong>250 to 30,000+ items</strong>{" "}
        and helped secure a <strong>$20,000 grant</strong> by designing a modular
        publishing platform and design system.
      </>,
    ],
  },
];

const SKILLS: { group: string; items: string[] }[] = [
  {
    group: "AI & emerging tech",
    items: [
      "Prompt engineering",
      "RAG",
      "Agentic AI",
      "LLM prompt QA",
      "Claude Code",
      "Figma Make",
      "UX Pilot",
    ],
  },
  {
    group: "Design",
    items: [
      "Figma",
      "Adobe CC",
      "Design systems & tokens",
      "Prototyping",
      "Micro-interactions",
      "Accessible design (WCAG)",
    ],
  },
  {
    group: "Engineering",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Python", "SQL"],
  },
  {
    group: "Research",
    items: [
      "Usability testing",
      "Interviews",
      "Journey mapping",
      "Personas",
      "Competitive analysis",
    ],
  },
];

function SectionHeading({ children }: { children: string }) {
  return (
    <div className="mt-[16px]">
      <h2 className="text-[13px] font-semibold uppercase leading-none tracking-[0.14em] text-accent-deep">
        {children}
      </h2>
      <div aria-hidden="true" className="mb-[9px] mt-[3px] border-t border-line" />
    </div>
  );
}

function Entry({ role, compact = false }: { role: PrintRole; compact?: boolean }) {
  return (
    <div className={compact ? "mb-[8px]" : "mb-[11px]"}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-[16px] font-semibold text-ink">
          {role.title}
          {!role.location && (
            <span className="whitespace-nowrap font-sans text-[12px] font-normal text-ink">
              {" · "}
              {role.org}
            </span>
          )}
        </h3>
        <p className="shrink-0 text-[12px] font-medium text-ink-muted">{role.date}</p>
      </div>
      {role.location && (
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[12px] text-ink">{role.org}</p>
          <p className="shrink-0 text-[12px] text-ink-muted">{role.location}</p>
        </div>
      )}
      <ul className="mt-[4px] space-y-[5px] pl-[8px]">
        {role.points.map((p, i) => (
          <li
            key={i}
            className="relative pl-[13px] text-[12px] leading-[17px] text-ink [&>strong]:font-semibold [&>strong]:text-ink"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-[6px] h-[5px] w-[5px] bg-accent"
            />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ResumePrint() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @page { size: letter; margin: 0; }
            body:has(.resume-sheet) > header,
            body:has(.resume-sheet) > footer,
            body:has(.resume-sheet) > a { display: none; }
            .resume-sheet {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            @media print {
              .resume-screen-wrap { padding: 0 !important; background: none !important; }
              .resume-sheet { box-shadow: none !important; margin: 0 !important; }
            }
          `,
        }}
      />
      <div className="resume-screen-wrap flex justify-center bg-surface py-10 print:py-0">
        <div className="resume-sheet relative h-[11in] w-[8.5in] shrink-0 overflow-hidden bg-bg p-[0.3in] shadow-xl">
          <PixelCloud
            shape="puff"
            variant="pink"
            size={40}
            className="absolute right-[0.3in] top-[0.3in]"
          />
          {/* ---- Header ---- */}
          <header>
            <div className="text-center">
              <h1 className="font-display text-[26px] font-semibold leading-none text-ink">
                Arshita Misra
              </h1>
            </div>
            <p className="mt-[4px] text-center text-[12px] font-medium text-ink-muted">
              {CONTACT.map((c, i) => (
                <span key={c.label}>
                  {i > 0 && "   ·   "}
                  {c.href ? (
                    <a href={c.href} className="text-ink-muted underline underline-offset-2">
                      {c.label}
                    </a>
                  ) : (
                    c.label
                  )}
                </span>
              ))}
            </p>
            <p className="mt-[4px] text-center text-[12px] leading-[1.4] text-ink-muted">
              Product designer and design engineer at the intersection of UX, AI systems, and design systems, shipping end-to-end from
research and IA to high-fidelity UI, LLM prompts, and production frontend.
            </p>
          </header>

          {/* ---- Body: single column ---- */}
          <div>
            <SectionHeading>Experience</SectionHeading>
            {EXPERIENCE.map((r) => (
              <Entry key={r.title} role={r} />
            ))}

            <SectionHeading>Projects</SectionHeading>
            {PROJECTS.map((r) => (
              <Entry key={r.title} role={r} compact />
            ))}

            <SectionHeading>Skills</SectionHeading>
            <div className="mb-[10px] space-y-[2px]">
              {SKILLS.map((s) => (
                <p key={s.group} className="text-[12px] leading-[1.5] text-ink">
                  <strong className="font-semibold text-ink">{s.group}: </strong>
                  {s.items.join(", ")}
                </p>
              ))}
            </div>

            <SectionHeading>Education</SectionHeading>
            <div className="mb-[14px]">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-[16px] font-semibold text-ink">
                  University of Washington
                </h3>
                <p className="shrink-0 text-[12px] text-ink-muted">Seattle, WA</p>
              </div>
              <div className="mt-[1px] flex items-baseline justify-between gap-3">
                <p className="text-[12px] leading-[1.5] text-ink">
                  B.S., Human Centered Design &amp; Engineering (Data Science
                  concentration)
                </p>
                <p className="shrink-0 text-[12px] font-medium text-ink-muted">
                  Sep 2021 – Jun 2025
                </p>
              </div>
              <p className="mt-[3px] text-[12px] font-medium text-ink">
                Dean&rsquo;s List · GPA 3.8 / 4.0
              </p>
              <p className="mt-[2px] text-[12px] leading-[1.5] text-ink-muted">
                Coursework: Designing for AI, Human-Computer Interaction, Data &amp;
                Information Visualization, Accessible Design, Design Systems and
                Libraries, Service Design, Intro to Machine Learning
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
