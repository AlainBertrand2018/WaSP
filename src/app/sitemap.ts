
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { appCategories } from "@/lib/app-data";
import fs from "fs";
import path from "path";

// If your sitemap is fully static, keep force-static.
// If it depends on DB/CMS at request-time, use: export const dynamic = "force-dynamic";
export const dynamic = "force-dynamic";

function abs(base: string, path: string): string {
  // robust absolute URL builder
  const clean = path.startsWith("/") ? path : `/${path}`;
  return new URL(clean, base).toString();
}

function slugify(text: string) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')       // spaces -> dashes
      .replace(/&/g, 'and')       // "&" -> "and"
      .replace(/[^\w-]+/g, '')    // strip non-word chars except dash
      .replace(/--+/g, '-');      // collapse multiple dashes
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://www.business-studio-ai.online";
  const now = new Date();

  // 1. Get static pages from the filesystem
  const appDirectory = path.join(process.cwd(), "src", "app");
  const files = fs.readdirSync(appDirectory, { recursive: true }) as string[];

  const staticPages = files
    .filter((file) => path.basename(file) === "page.tsx")
    .map((file) => {
      // Create a URL path from the file path
      const urlPath = path
        .dirname(file)
        .replace(/\\/g, "/") // Convert backslashes to forward slashes
        .replace(/^\(app\)\/?/, "") // Remove the (app) group
        .replace(/^\(auth\)\/?/, "") // Remove the (auth) group
        .replace(/^\(standalone\)\/?/, "") // Remove the (standalone) group
        .replace(/\[[^\]]+\]/g, "") // Remove dynamic segments like [category]
        .replace(/\/$/, ""); // Remove trailing slash

      return {
        url: abs(base, urlPath),
        lastModified: now,
        priority: urlPath === "" ? 1.0 : (urlPath.split('/').length === 1 ? 0.8 : 0.6),
        changeFrequency: "weekly" as "weekly",
      };
    });

  // 2. Get dynamic pages from data sources
  const dynamicCategoryPages = appCategories.map((category) => {
    return {
      url: abs(base, `/apps/${slugify(category.category)}`),
      lastModified: now,
      priority: 0.7,
      changeFrequency: "weekly" as "weekly",
    };
  });
  
  // Combine all pages and remove duplicates
  const allEntries = [...staticPages, ...dynamicCategoryPages];
  const uniqueEntries = Array.from(new Map(allEntries.map(item => [item.url, item])).values());
  
  // Filter out any auth or empty paths that might have slipped through
  const finalEntries = uniqueEntries.filter(entry => 
    !entry.url.includes('/login') && 
    !entry.url.includes('/signup') &&
    !entry.url.includes('/error')
  );

  return finalEntries;
}
