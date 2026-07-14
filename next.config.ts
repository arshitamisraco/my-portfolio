import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project lives in an iCloud-synced folder (~/Desktop). During `next dev`,
  // iCloud evicts/renames files inside .next while they're being written, 404ing
  // every chunk; iCloud skips anything named *.nosync, so local dev uses that suffix.
  // Production builds run on Vercel (Linux, no iCloud), where the default .next dir
  // is used so Vercel's Next.js builder finds the output as expected.
  distDir: process.env.NODE_ENV === "development" ? ".next.nosync" : ".next",

  // The COROS work used to live under /work/coros-ai. The case studies now live
  // at /projects/<slug> and the COROS overview moved to /coros-ai, so keep the
  // old URLs working for anyone with a bookmark or an external link.
  async redirects() {
    return [
      { source: "/work/coros-ai", destination: "/coros-ai", permanent: true },
      { source: "/work/coros-ai/:slug", destination: "/projects/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
