import type { MetadataRoute } from "next";

// TODO: update to the final production domain before launch
const BASE = "https://arshitamisra.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/styleguide",
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
