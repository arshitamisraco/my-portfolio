import type { MetadataRoute } from "next";

const BASE = "https://arshita.co";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/styleguide", "/talk"],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
