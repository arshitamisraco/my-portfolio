import type { ChipTone } from "@/components/TagChip";

export interface CaseStudy {
  slug: string;
  href: string;
  title: string;
  /** Compact label used in secondary links and prev/next navigation. */
  shortTitle: string;
  /** 1–2 sentence description used on the hub cards and home links. */
  brief: string;
  tags: string[];
  tone: ChipTone;
  /**
   * The company/hub this case study belongs to, if any. When set, CaseStudyLayout
   * renders a breadcrumb crumb for it (Projects / {company.name} / {study}). Omit for
   * standalone projects not tied to a company hub.
   */
  company?: { name: string; href: string };
  /** Hidden on the production deployment (still visible locally and on Vercel previews). Delete the flag to publish. */
  hidden?: boolean;
}

/** The COROS AI blurb/overview page. Reached only from the landing thumbnail. */
export const COROS_HUB_HREF = "/coros-ai";

/** The Projects listing page — case-study cards, reached from the main nav. */
export const PROJECTS_HREF = "/projects";

const COROS: CaseStudy["company"] = { name: "COROS AI", href: COROS_HUB_HREF };

export const ALL_CASE_STUDIES: CaseStudy[] = [
  {
    slug: "accessibility-auditor",
    href: "/projects/accessibility-auditor",
    title: "An accessibility auditor that writes the fix",
    shortTitle: "Accessibility auditor",
    brief:
      "Paste a URL and get every WCAG violation explained in plain language, with the corrected HTML to paste back. I planned it, designed it and shipped it in a day with Claude Code, then built an eval harness to check the fixes actually work.",
    tags: ["Design Engineering", "AI Product", "Accessibility", "Full-stack"],
    tone: "butter",
  },
  {
    slug: "gmail-job-tracker",
    href: "/projects/gmail-job-tracker",
    title: "Gmail Job Tracker",
    shortTitle: "Gmail Job Tracker",
    brief:
      "A kanban board that reads my Gmail, sorts every job application into Applied, Interviewing, Offer or Rejected, and keeps itself up to date. Designed the product and the build process, then directed a network of AI coding sessions to ship it in a day.",
    tags: ["Design Engineering", "AI Product", "Agent Orchestration", "Full-stack"],
    tone: "sky",
  },
  {
    slug: "moritz-intake",
    href: "/projects/moritz-intake",
    title: "Redesigning a law firm's front door",
    shortTitle: "Moritz intake",
    brief:
      "Moritz is an AI-native law firm. Clients came out of its intake flow unsure whether they'd submitted, which step they were on, or where to upload a file. I redesigned the flow end to end and built it as a working TypeScript prototype in the firm's own codebase, in three days.",
    tags: ["Design Engineering", "UX/UI", "AI Product Design", "UX Writing"],
    tone: "peach",
  },
  {
    slug: "my-world",
    href: "/projects/my-world",
    title: "Designing an AI that remembers you",
    shortTitle: "AI memory",
    brief:
      "End-to-end design of the feature that reflects a user's coaching history back to them: information architecture, widget design, and the LLM prompts behind every card.",
    tags: ["Prompt Engineering", "UX/UI", "Design Engineering", "Product Design"],
    tone: "lavender",
    company: COROS,
  },
  {
    slug: "design-system",
    href: "/projects/design-system",
    title: "Rebuilding the design system across three platforms",
    shortTitle: "Design system rebuild",
    brief:
      "Migrating the product from stock MUI to a token-driven shadcn system: responsive redesign of every core surface plus a team-facing debug panel.",
    tags: ["Design Systems", "UX/UI", "Responsive", "Design Engineering"],
    tone: "sky",
    company: COROS,
  },
  {
    slug: "founding-design",
    href: "/projects/founding-design",
    title: "Founding design: shaping the product and the AI together",
    shortTitle: "Founding design",
    brief:
      "Designing COROS's 0→1 onboarding and personality system: user research, competitive analysis, and three features that shape how the AI coaches, plus the brand identity.",
    tags: ["0→1", "UX/UI", "User Research", "AI Behavior", "Brand"],
    tone: "pink",
    company: COROS,
  },
  {
    slug: "switcharoo",
    href: "/projects/switcharoo",
    title: "One switch, infinite possibilities",
    shortTitle: "Switcharoo",
    brief:
      "A switch-accessible tablet game library for pre-K and kindergarten children with motor and cognitive disabilities — 2nd place out of 100+ teams at the RESNA Student Design Challenge.",
    tags: ["UX Research", "Accessibility", "UX/UI", "Product Design"],
    tone: "mint",
  },
  {
    slug: "foryou-playmat",
    href: "/projects/foryou-playmat",
    title: "ForYou Playmat",
    shortTitle: "ForYou Playmat",
    brief:
      "An interactive 'floor is lava' play mat — a light-up surface with hand-sewn sensory blocks — for preschoolers with neurodivergence and motor and cognitive disabilities, built with the EEU in Seattle to bring active, social play indoors on rainy days.",
    tags: ["User Research", "Field Observation", "Physical Prototyping", "Inclusive Design"],
    tone: "butter",
    hidden: true,
  },
];

/** True only on the production Vercel deployment; local dev and previews show everything. */
const IS_PRODUCTION = process.env.VERCEL_ENV === "production";

export function isHidden(study: CaseStudy): boolean {
  return IS_PRODUCTION && !!study.hidden;
}

/** Case studies visible on this deployment. Use this for listings and navigation. */
export const CASE_STUDIES: CaseStudy[] = ALL_CASE_STUDIES.filter((s) => !isHidden(s));

export function getCaseStudy(slug: string): CaseStudy {
  const study = ALL_CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) throw new Error(`Unknown case study: ${slug}`);
  return study;
}

export function getPrevNext(slug: string): {
  prev: CaseStudy;
  next: CaseStudy;
} {
  const i = CASE_STUDIES.findIndex((s) => s.slug === slug);
  const n = CASE_STUDIES.length;
  return {
    prev: CASE_STUDIES[(i - 1 + n) % n],
    next: CASE_STUDIES[(i + 1) % n],
  };
}
