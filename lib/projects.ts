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
}

/** The COROS AI blurb/overview page. Reached only from the landing thumbnail. */
export const COROS_HUB_HREF = "/coros-ai";

/** The Projects listing page — case-study cards, reached from the main nav. */
export const PROJECTS_HREF = "/projects";

const COROS: CaseStudy["company"] = { name: "COROS AI", href: COROS_HUB_HREF };

export const CASE_STUDIES: CaseStudy[] = [
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
  },
];

export function getCaseStudy(slug: string): CaseStudy {
  const study = CASE_STUDIES.find((s) => s.slug === slug);
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
