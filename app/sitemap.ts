import type { MetadataRoute } from "next";

const BASE = "https://arshita.co";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/about`, priority: 0.8 },
    { url: `${BASE}/projects`, priority: 0.9 },
    { url: `${BASE}/projects/my-world`, priority: 0.8 },
    { url: `${BASE}/projects/design-system`, priority: 0.8 },
    { url: `${BASE}/projects/founding-design`, priority: 0.8 },
    { url: `${BASE}/coros-ai`, priority: 0.7 },
  ];
}
