import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project lives in an iCloud-synced folder (~/Desktop). During `next dev`,
  // iCloud evicts/renames files inside .next while they're being written, 404ing
  // every chunk; iCloud skips anything named *.nosync, so local dev uses that suffix.
  // Production builds run on Vercel (Linux, no iCloud), where the default .next dir
  // is used so Vercel's Next.js builder finds the output as expected.
  distDir: process.env.NODE_ENV === "development" ? ".next.nosync" : ".next",

  // Reverse-proxy PostHog through our own domain so ad-blockers don't drop events.
  async rewrites() {
    return [
      { source: "/ingest/static/:path*", destination: "https://us-assets.i.posthog.com/static/:path*" },
      { source: "/ingest/array/:path*", destination: "https://us-assets.i.posthog.com/array/:path*" },
      { source: "/ingest/:path*", destination: "https://us.i.posthog.com/:path*" },
    ];
  },
  // Required so PostHog's trailing-slash API paths aren't redirected.
  skipTrailingSlashRedirect: true,

  // The COROS work used to live under /work/coros-ai. The case studies now live
  // at /projects/<slug> and the COROS overview moved to /coros-ai, so keep the
  // old URLs working for anyone with a bookmark or an external link.
  async redirects() {
    return [
      { source: "/work/coros-ai", destination: "/coros-ai", permanent: true },
      { source: "/work/coros-ai/:slug", destination: "/projects/:slug", permanent: true },
      // Short, shareable link to the résumé (same Drive file as lib/resume.ts). Temporary so
      // browsers do not cache it if the Drive link changes.
      { source: "/resume.pdf", destination: "https://drive.google.com/file/d/1xOlDdcbitDaSvbhvcOaKmkb8pXuq1k9V/view?usp=sharing", permanent: false },
    ];
  },
};

export default nextConfig;
