"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  normalizePath,
  trackCaseStudyOpened,
  trackCtaClicked,
  trackPageExit,
  trackSectionDwell,
  trackSectionViewed,
  type CtaType,
} from "@/lib/analytics";
import { ALL_CASE_STUDIES } from "@/lib/projects";
import { RESUME_PDF_URL } from "@/lib/resume";

/** A section counts as "in view" at 40% of itself, or when it fills 40% of the viewport (tall sections). */
const VISIBLE_RATIO = 0.4;
const MIN_DWELL_SECONDS = 0.5;
const CASE_STUDY_SLUGS = new Set(ALL_CASE_STUDIES.map((s) => s.slug));

interface Tracked {
  slug: string;
  index: number;
  viewed: boolean;
  active: boolean;
  /** performance.now() when it last became active (while the tab is visible), or null. */
  since: number | null;
  /** Unflushed dwell, ms. */
  dwellMs: number;
}

const round1 = (n: number) => Math.round(n * 10) / 10;

/**
 * Owns all section / dwell / exit tracking. A section is any element with a
 * `data-section="<slug>"` attribute, so pages never wire up observers themselves.
 * Re-runs per route and flushes on route change, pagehide and tab hidden.
 */
function usePageTracking(pathname: string) {
  useEffect(() => {
    const page = normalizePath(pathname);
    const sections = new Map<Element, Tracked>();
    const visible = () => document.visibilityState === "visible";
    let visibleSince: number | null = visible() ? performance.now() : null;
    let visibleMs = 0;
    let maxScroll = 0;
    let lastSection: string | null = null;
    let exitSent = false;

    const updateScroll = () => {
      const total = document.documentElement.scrollHeight;
      if (total <= 0) return;
      const pct = Math.min(100, ((window.scrollY + window.innerHeight) / total) * 100);
      if (pct > maxScroll) maxScroll = pct;
    };

    const io = new IntersectionObserver(
      (entries) => {
        const t = performance.now();
        for (const entry of entries) {
          const s = sections.get(entry.target);
          if (!s) continue;
          const vh = entry.rootBounds?.height ?? window.innerHeight;
          const active =
            entry.isIntersecting &&
            (entry.intersectionRatio >= VISIBLE_RATIO ||
              entry.intersectionRect.height >= vh * VISIBLE_RATIO);
          if (active && !s.active) {
            s.active = true;
            lastSection = s.slug;
            if (visible()) s.since = t;
            if (!s.viewed) {
              s.viewed = true;
              trackSectionViewed({ page, section: s.slug, section_index: s.index });
            }
          } else if (!active && s.active) {
            s.active = false;
            if (s.since !== null) s.dwellMs += t - s.since;
            s.since = null;
          }
        }
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-section]").forEach((el, index) => {
        const known = sections.get(el);
        if (known) {
          known.index = index;
          return;
        }
        sections.set(el, {
          slug: el.dataset.section!,
          index,
          viewed: false,
          active: false,
          since: null,
          dwellMs: 0,
        });
        io.observe(el);
      });
    };

    const flushDwell = (beacon: boolean) => {
      const t = performance.now();
      for (const s of sections.values()) {
        if (s.since !== null) {
          s.dwellMs += t - s.since;
          s.since = t;
        }
        const seconds = round1(s.dwellMs / 1000);
        if (seconds < MIN_DWELL_SECONDS) continue; // keep accumulating small remainders
        s.dwellMs = 0;
        trackSectionDwell(
          { page, section: s.slug, section_index: s.index, seconds },
          { beacon },
        );
      }
    };

    const sendExit = (beacon: boolean) => {
      if (exitSent) return;
      exitSent = true;
      updateScroll();
      const total = visibleMs + (visibleSince !== null ? performance.now() - visibleSince : 0);
      trackPageExit(
        {
          page,
          last_section: lastSection,
          max_scroll_pct: Math.round(maxScroll),
          seconds_on_page: round1(total / 1000),
        },
        { beacon },
      );
    };

    const onVisibility = () => {
      const t = performance.now();
      if (!visible()) {
        if (visibleSince !== null) visibleMs += t - visibleSince;
        flushDwell(true); // before clearing `since` so hidden time isn't counted
        for (const s of sections.values()) s.since = null;
        visibleSince = null;
        // Mobile browsers often skip pagehide, so hidden is the reliable exit signal.
        sendExit(true);
      } else {
        visibleSince = t;
        for (const s of sections.values()) if (s.active) s.since = t;
      }
    };
    const onPageHide = () => {
      flushDwell(true);
      sendExit(true);
    };

    scan();
    updateScroll();
    // Sections rendered after mount (client components, lazy content).
    const mo = new MutationObserver(scan);
    mo.observe(document.getElementById("main") ?? document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("scroll", updateScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      mo.disconnect();
      io.disconnect();
      // Route change: flush while we still hold this page's state.
      flushDwell(false);
      sendExit(false);
    };
  }, [pathname]);
}

/** Nearest labelled section above `from`, falling back to the nav / footer context. */
function sectionOf(from: Element | null): string | null {
  const host = from?.closest<HTMLElement>("[data-section],[data-context]");
  return host?.dataset.section ?? host?.dataset.context ?? null;
}

function ctaFor(href: string): CtaType | null {
  if (href.startsWith("mailto:")) return "email";
  if (href.includes("linkedin.com")) return "linkedin";
  if (href === RESUME_PDF_URL) return "resume";
  try {
    const path = normalizePath(new URL(href, window.location.origin).pathname);
    if (path === "/contact") return "contact";
    if (path === "/resume") return "resume";
    if (path === "/about") return "about";
  } catch {
    /* malformed href */
  }
  return null;
}

/** One delegated click listener for case-study opens and CTAs, so no link needs wiring. */
function useClickTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const page = normalizePath(window.location.pathname);
      // Start above the link so a card that is itself a section reports its parent.
      const section = sectionOf(link.parentElement);

      let path: string | null = null;
      try {
        path = normalizePath(new URL(href, window.location.origin).pathname);
      } catch {
        /* malformed href */
      }
      const slug = path?.startsWith("/projects/") ? path.slice("/projects/".length) : null;
      if (slug && CASE_STUDY_SLUGS.has(slug)) {
        trackCaseStudyOpened({ slug, from_page: page, from_section: section });
      }

      const cta = ctaFor(href);
      if (cta) trackCtaClicked({ cta, page, section });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
}

export default function AnalyticsTracker() {
  usePageTracking(usePathname());
  useClickTracking();
  return null;
}
