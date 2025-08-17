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

  // 1) Static pages (edit to match your site)
  const staticPaths: string[] = [
    "/",
    "/apps",
    "/faq",
    "/investors_info",
    "/privacy-policy",
    "/login",
    "/signup",
    "/ideation",
    "/ideation/brainstorming",
    "/business-creation",
    "/business-creation/business-idea-validation",
    "/business-creation/mvp-planner",
    "/business-creation/startup-budget-planner",
    "/business-creation/business-plan-generator",
    "/7-day-blueprint",
  ];

  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: abs(base, p),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // 2) Dynamic pages (guard EVERYTHING to avoid .filter on non-arrays)
  // Example shape—replace with your real source
  let appRecords: Array<{ slug: string; updatedAt?: string }> = [];
  try {
    // If you fetch from a CMS/API, keep a revalidate or switch to force-dynamic at the top.
    // Example: const res = await fetch(`${base}/api/apps`, { next: { revalidate: 60 } });
    // const data = await res.json();
    const data: unknown = []; // <-- replace with real data
    if (Array.isArray(data)) appRecords = data as typeof appRecords;
  } catch {
    // ignore; fall back to static only
  }

  const dynamicEntries: MetadataRoute.Sitemap = (Array.isArray(appRecords)
    ? appRecords
    : []
  ).map((app) => ({
    url: abs(base, `/apps/${encodeURIComponent(app.slug)}`),
    lastModified: app.updatedAt ? new Date(app.updatedAt) : now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...dynamicEntries];
}
