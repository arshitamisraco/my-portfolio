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
  /** Shown as an "In progress" badge on the hub card when the work is still shipping. */
  inProgress?: boolean;
}

/** The COROS AI blurb/overview page. Reached only from the landing thumbnail. */
export const COROS_HUB_HREF = "/coros-ai";

/** The Projects listing page — three case-study cards, reached from the main nav. */
export const PROJECTS_HREF = "/projects";

export const COROS_CASE_STUDIES: CorosCaseStudy[] = [
  {
    slug: "my-world",
    href: "/projects/my-world",
    title: "Designing an AI that remembers you",
    shortTitle: "AI memory",
    brief:
      "End-to-end design of the feature that reflects a user's coaching history back to them: information architecture, widget design, and the LLM prompts behind every card.",
    tags: ["Prompt Engineering", "UX/UI", "Design Engineering", "Product Design"],
    tone: "lavender",
    inProgress: true,
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
