// app/sitemap.ts
import type { MetadataRoute } from "next";

// If your sitemap is fully static, keep force-static.
// If it depends on DB/CMS at request-time, use: export const dynamic = "force-dynamic";
export const dynamic = "force-static";

function abs(base: string, path: string): string {
  // robust absolute URL builder
  const clean = path.startsWith("/") ? path : `/${path}`;
  return new URL(clean, base).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use the current deployment host when possible (e.g., preview URLs)…
  // Fallback to your primary domain.
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://www.business-studio-ai.online";

  const now = new Date();
  
  // Returning only the homepage for now.
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: abs(base, "/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1, // Homepage gets top priority
    },
  ];

  return staticEntries;
}
