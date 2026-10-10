"use client";

import posthog from "posthog-js";
import type { ReactNode } from "react";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";
import { applyInternalParam, isInternalBrowser } from "@/lib/analytics";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const DEBUG = process.env.NEXT_PUBLIC_POSTHOG_DEBUG === "1";

function shouldInit(): boolean {
  if (!KEY) return false;
  // Never track the /admin dashboard or its heatmap preview iframe.
  if (window.top !== window || window.location.pathname.startsWith("/admin")) return false;
  if (DEBUG) return true;
  if (process.env.NODE_ENV !== "production") return false;
  return !["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
}

/*
 * Initialised at module load (client only) so PostHog is ready before any
 * child effect fires. Privacy: no cookies and no cookie banner — see
 * docs/analytics/tracking.md for why sessionStorage persistence over cookieless_mode.
 */
if (typeof window !== "undefined" && shouldInit() && !posthog.__loaded) {
  posthog.init(KEY!, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2025-05-24",
    persistence: "sessionStorage", // per-tab, no cookies
    person_profiles: "identified_only", // anonymous visitors don't create person profiles
    capture_pageview: "history_change", // App Router client navigations
    capture_pageleave: true,
    autocapture: true,
    capture_heatmaps: true,
    disable_session_recording: false,
    session_recording: { maskAllInputs: true },
    opt_out_capturing_by_default: isInternalBrowser(),
    loaded: (ph) => {
      if (DEBUG) ph.debug();
    },
  });
  applyInternalParam();
}

export default function PostHogProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <AnalyticsTracker />
      {children}
    </>
  );
}
