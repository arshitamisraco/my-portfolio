import type { MetadataRoute } from "next";

// TODO: update to the final production domain before launch
const BASE = "https://arshitamisra.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/about`, priority: 0.8 },
    { url: `${BASE}/work/coros-ai`, priority: 0.9 },
    { url: `${BASE}/work/coros-ai/founding-design`, priority: 0.8 },
    { url: `${BASE}/work/coros-ai/my-world`, priority: 0.8 },
    { url: `${BASE}/work/coros-ai/design-system`, priority: 0.8 },
  ];
}
