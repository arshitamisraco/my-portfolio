export type Tone = "pink" | "lavender" | "sky" | "mint" | "butter" | "peach";

export interface Clip {
  /**
   * Web-safe mp4 under public/. Optional: image-only clips (e.g. projects with
   * no video yet) omit it and render as a framed poster still.
   */
  src?: string;
  /** Poster/image under public/ — the frame shown before/without playback. */
  poster: string;
  /** Intrinsic media dimensions; the frame is sized to this exact aspect (no crop). */
  width: number;
  height: number;
  alt: string;
  tone: Tone;
  /** Show only the left half of the media (right half trimmed) — carousel-only crop. */
  cropLeftHalf?: boolean;
}

/*
 * The default mixed set for the featured landing-page carousel: a cross-section
 * of the COROS AI work, framed like the case studies and set adrift. Portrait
 * phone clips and landscape web clips both belong here — each sits in its own
 * frame at its own aspect. Trimmed/downscaled clips live under /coros-carousel/;
 * the rest reference their existing public paths. Tones alternate for rhythm.
 */
export const COROS_MIX_CLIPS: Clip[] = [
  {
    src: "/videos/design-system/landing-web-light.mp4",
    poster: "/images/design-system/posters/landing-web-light.jpg",
    width: 1440,
    height: 936,
    alt: "COROS AI web landing page",
    tone: "pink",
  },
  {
    src: "/videos/coros-carousel/chat-mobile.mp4",
    poster: "/images/coros-carousel/chat-mobile.jpg",
    width: 360,
    height: 784,
    alt: "AI coaching chat on mobile",
    tone: "lavender",
  },
  {
    src: "/videos/my-world/reminders-widget.mp4",
    poster: "/images/my-world/posters/reminders-widget.jpg",
    width: 1440,
    height: 398,
    alt: "My World reminders widget",
    tone: "sky",
    cropLeftHalf: true,
  },
  {
    src: "/videos/coros-carousel/chat-web-dark.mp4",
    poster: "/images/coros-carousel/chat-web-dark.jpg",
    width: 1000,
    height: 650,
    alt: "AI coaching chat conversation in dark mode",
    tone: "peach",
  },
  {
    src: "/videos/coros-carousel/influences-mobile.mp4",
    poster: "/images/coros-carousel/influences-mobile.jpg",
    width: 360,
    height: 784,
    alt: "Choosing influences during onboarding, on mobile",
    tone: "mint",
  },
  {
    src: "/videos/coros-carousel/topics-by-dimension.mp4",
    poster: "/images/coros-carousel/topics-by-dimension.jpg",
    width: 1000,
    height: 372,
    alt: "Coaching topics organised by life dimension",
    tone: "butter",
  },
  {
    src: "/videos/design-system/settings-web-light.mp4",
    poster: "/images/design-system/posters/settings-web-light.jpg",
    width: 1440,
    height: 936,
    alt: "COROS AI settings on web",
    tone: "sky",
  },
  {
    src: "/videos/coros-carousel/breakthrough-widget.mp4",
    poster: "/images/coros-carousel/breakthrough-widget.jpg",
    width: 1000,
    height: 400,
    alt: "Breakthroughs widget summarising insights over time",
    tone: "pink",
  },
];

/*
 * Per-project carousels for the Projects listing cards. Each array holds only
 * that project's own media, framed like the mixed set. my-world and
 * design-system carry real video; founding-design predates any recorded clips,
 * so it rides on framed screenshots (no `src`) — a still shelf that still drifts.
 * Keyed by CorosCaseStudy.slug.
 */
export const CASE_STUDY_CLIPS: Record<string, Clip[]> = {
  "my-world": [
    {
      src: "/videos/my-world/page-tour.mp4",
      poster: "/images/my-world/posters/page-tour.jpg",
      width: 1440,
      height: 900,
      alt: "A tour of the My World page",
      tone: "lavender",
    },
    {
      src: "/videos/my-world/topic-to-session.mp4",
      poster: "/images/my-world/posters/topic-to-session.jpg",
      width: 1440,
      height: 900,
      alt: "Turning a topic into a coaching session in My World",
      tone: "sky",
    },
    {
      src: "/videos/my-world/breakthrough-widget.mp4",
      poster: "/images/my-world/posters/breakthrough-widget.jpg",
      width: 1322,
      height: 528,
      alt: "The breakthroughs widget in My World",
      tone: "pink",
    },
    {
      src: "/videos/my-world/topics-by-dimension.mp4",
      poster: "/images/my-world/posters/topics-by-dimension.jpg",
      width: 1440,
      height: 536,
      alt: "Coaching topics organised by life dimension",
      tone: "butter",
    },
    {
      src: "/videos/my-world/reminders-widget.mp4",
      poster: "/images/my-world/posters/reminders-widget.jpg",
      width: 1440,
      height: 398,
      alt: "The reminders widget in My World",
      tone: "mint",
      cropLeftHalf: true,
    },
    {
      src: "/videos/my-world/playground.mp4",
      poster: "/images/my-world/posters/playground.jpg",
      width: 1440,
      height: 936,
      alt: "The My World playground",
      tone: "peach",
    },
  ],
  "design-system": [
    {
      src: "/videos/design-system/landing-web-light.mp4",
      poster: "/images/design-system/posters/landing-web-light.jpg",
      width: 1440,
      height: 936,
      alt: "The redesigned COROS AI landing page on web",
      tone: "pink",
    },
    {
      src: "/videos/design-system/chat-mobile-light.mp4",
      poster: "/images/design-system/posters/chat-mobile-light.jpg",
      width: 640,
      height: 1392,
      alt: "AI coaching chat on mobile, light mode",
      tone: "lavender",
    },
    {
      src: "/videos/design-system/chat-web-dark.mp4",
      poster: "/images/design-system/posters/chat-web-dark.jpg",
      width: 1440,
      height: 936,
      alt: "AI coaching chat on web, dark mode",
      tone: "sky",
    },
    {
      src: "/videos/design-system/onboarding-mobile-light.mp4",
      poster: "/images/design-system/posters/onboarding-mobile-light.jpg",
      width: 640,
      height: 1392,
      alt: "Onboarding on mobile, light mode",
      tone: "mint",
    },
    {
      src: "/videos/design-system/onboarding-web-dark.mp4",
      poster: "/images/design-system/posters/onboarding-web-dark.jpg",
      width: 1440,
      height: 936,
      alt: "Onboarding on web, dark mode",
      tone: "butter",
    },
    {
      src: "/videos/design-system/settings-web-light.mp4",
      poster: "/images/design-system/posters/settings-web-light.jpg",
      width: 1440,
      height: 936,
      alt: "Settings on web, light mode",
      tone: "peach",
    },
    {
      src: "/videos/design-system/personalization-web-light.mp4",
      poster: "/images/design-system/posters/personalization-web-light.jpg",
      width: 1440,
      height: 936,
      alt: "Personalization settings on web",
      tone: "pink",
    },
    {
      src: "/videos/design-system/my-memories-web-light.mp4",
      poster: "/images/design-system/posters/my-memories-web-light.jpg",
      width: 1440,
      height: 936,
      alt: "My Memories on web",
      tone: "lavender",
    },
    {
      src: "/videos/design-system/retrieved-context-web-light.mp4",
      poster: "/images/design-system/posters/retrieved-context-web-light.jpg",
      width: 1440,
      height: 936,
      alt: "Retrieved context surfaced in the product on web",
      tone: "sky",
    },
  ],
  "founding-design": [
    {
      poster: "/images/founding-design/onboarding/01-welcome-signup.png",
      width: 1520,
      height: 826,
      alt: "The welcome and signup step of onboarding",
      tone: "pink",
    },
    {
      poster: "/images/founding-design/chat/mobile-1-home.png",
      width: 401,
      height: 860,
      alt: "The COROS AI home screen on mobile",
      tone: "lavender",
    },
    {
      poster: "/images/founding-design/onboarding/05-dimensions.png",
      width: 1520,
      height: 826,
      alt: "Choosing life dimensions during onboarding",
      tone: "sky",
    },
    {
      poster: "/images/founding-design/onboarding/06-influences.png",
      width: 1520,
      height: 826,
      alt: "Choosing influences during onboarding",
      tone: "mint",
    },
    {
      poster: "/images/founding-design/dimensions/dimensions-hexagons.png",
      width: 737,
      height: 669,
      alt: "The life-dimensions hexagon diagram",
      tone: "butter",
    },
    {
      poster: "/images/founding-design/onboarding/07-personality.png",
      width: 1520,
      height: 826,
      alt: "Setting the AI's personality during onboarding",
      tone: "peach",
    },
    {
      poster: "/images/founding-design/research/final-logos.png",
      width: 3362,
      height: 3159,
      alt: "Final COROS logo explorations",
      tone: "pink",
    },
    {
      poster: "/images/founding-design/chat/web-chat.png",
      width: 1520,
      height: 953,
      alt: "The COROS AI chat on web",
      tone: "lavender",
    },
  ],
};
