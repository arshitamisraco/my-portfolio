/**
 * Typed analytics wrappers. Components call these — never posthog directly.
 * Every function is a safe no-op when PostHog isn't initialised (no key,
 * localhost, opted-out, SSR). Event dictionary: docs/analytics/tracking.md.
 */
import posthog from "posthog-js";

export type CtaType = "contact" | "resume" | "email" | "linkedin" | "about" | "other";

interface SectionProps {
  /** Normalised pathname, e.g. "/" or "/projects/moritz-intake". */
  page: string;
  section: string;
  /** 0-based position among [data-section] elements in DOM order. */
  section_index: number;
}

export interface EventMap {
  section_viewed: SectionProps;
  section_dwell: SectionProps & { seconds: number };
  page_exit: {
    page: string;
    last_section: string | null;
    max_scroll_pct: number;
    seconds_on_page: number;
  };
  case_study_opened: { slug: string; from_page: string; from_section: string | null };
  cta_clicked: { cta: CtaType; page: string; section: string | null };
}

export interface TrackOptions {
  /** Use navigator.sendBeacon — for events fired while the page is going away. */
  beacon?: boolean;
}

export function track<E extends keyof EventMap>(
  event: E,
  props: EventMap[E],
  options?: TrackOptions,
): void {
  if (typeof window === "undefined" || !posthog.__loaded) return;
  posthog.capture(event, props, options?.beacon ? { transport: "sendBeacon" } : undefined);
}

export const trackSectionViewed = (p: EventMap["section_viewed"]) => track("section_viewed", p);
export const trackSectionDwell = (p: EventMap["section_dwell"], opts?: TrackOptions) =>
  track("section_dwell", p, opts);
export const trackPageExit = (p: EventMap["page_exit"], opts?: TrackOptions) =>
  track("page_exit", p, opts);
export const trackCaseStudyOpened = (p: EventMap["case_study_opened"]) =>
  track("case_study_opened", p);
export const trackCtaClicked = (p: EventMap["cta_clicked"]) => track("cta_clicked", p);

/** "/projects/x/" -> "/projects/x"; "/" stays "/". */
export function normalizePath(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

/** Opt-out flag for Arshita's own browser. Set via ?me=1, cleared via ?me=0. */
export const INTERNAL_FLAG_KEY = "am_internal";

export function isInternalBrowser(): boolean {
  // The URL param wins, so even the very first pageview of a ?me=1 visit is dropped.
  const me = new URLSearchParams(window.location.search).get("me");
  if (me === "1") return true;
  if (me === "0") return false;
  try {
    return window.localStorage.getItem(INTERNAL_FLAG_KEY) === "1";
  } catch {
    return false;
  }
}

/** Handles ?me=1 / ?me=0. Call right after init. */
export function applyInternalParam(): void {
  const me = new URLSearchParams(window.location.search).get("me");
  if (me !== "1" && me !== "0") return;
  try {
    if (me === "1") window.localStorage.setItem(INTERNAL_FLAG_KEY, "1");
    else window.localStorage.removeItem(INTERNAL_FLAG_KEY);
  } catch {
    /* storage blocked — the posthog opt-out below still applies */
  }
  if (!posthog.__loaded) return;
  if (me === "1") posthog.opt_out_capturing();
  else posthog.opt_in_capturing();
}
