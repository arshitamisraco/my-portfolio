import type { ChipTone } from "@/components/TagChip";

export interface CorosCaseStudy {
  slug: string;
  href: string;
  title: string;
  /** Compact label used in secondary links and prev/next navigation. */
  shortTitle: string;
  /** 1–2 sentence description used on the hub cards and home links. */
  brief: string;
  tags: string[];
  tone: ChipTone;
}

export const COROS_HUB_HREF = "/work/coros-ai";

export const COROS_CASE_STUDIES: CorosCaseStudy[] = [
  {
    slug: "founding-design",
    href: "/work/coros-ai/founding-design",
    title: "Founding AI Designer — Designing UI and AI Behavior as One System",
    shortTitle: "Founding design",
    brief:
      "Designing COROS's 0→1 onboarding and personality system — user research, competitive analysis, and three features that shape how the AI coaches, plus the brand identity.",
    tags: ["0→1", "User Research", "AI Behavior", "Brand"],
    tone: "pink",
  },
  {
    slug: "my-world",
    href: "/work/coros-ai/my-world",
    title: "My World — Designing an AI That Remembers You Back",
    shortTitle: "My World",
    brief:
      "End-to-end design of the feature that reflects a user's coaching history back to them — information architecture, widget design, and the LLM prompts behind every card.",
    tags: ["Product Design", "Prompt Engineering", "Design Engineering"],
    tone: "lavender",
  },
  {
    slug: "design-system",
    href: "/work/coros-ai/design-system",
    title: "Rebuilding COROS AI — From MUI Defaults to a Token-Driven Design System",
    shortTitle: "Design system rebuild",
    brief:
      "Migrating the product from stock MUI to a token-driven shadcn system — responsive redesign of every core surface plus a team-facing debug panel.",
    tags: ["Design Systems", "Responsive", "Design Engineering"],
    tone: "sky",
  },
];

export function getCaseStudy(slug: string): CorosCaseStudy {
  const study = COROS_CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) throw new Error(`Unknown COROS case study: ${slug}`);
  return study;
}

export function getPrevNext(slug: string): {
  prev: CorosCaseStudy;
  next: CorosCaseStudy;
} {
  const i = COROS_CASE_STUDIES.findIndex((s) => s.slug === slug);
  const n = COROS_CASE_STUDIES.length;
  return {
    prev: COROS_CASE_STUDIES[(i - 1 + n) % n],
    next: COROS_CASE_STUDIES[(i + 1) % n],
  };
}
