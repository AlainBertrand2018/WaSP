// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { appCategories } from '@/lib/app-data';
import { siteConfig } from '@/config/site';

// Slugify helper (kept from your version, minor tweaks)
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

export default function sitemap(): MetadataRoute.Sitemap {
  // Ensure absolute base URL with no trailing slash
  const base = (siteConfig?.url ?? 'https://example.com').replace(/\/+$/, '');

  const routes = [
    '', // home
    '/apps',
    '/faq',
    '/investors_info',
    '/privacy-policy',
    '/login',
    '/signup',
    '/ideation',
    '/ideation/brainstorming',
    '/business-creation',
    '/business-creation/business-idea-validation',
    '/business-creation/mvp-planner',
    '/business-creation/startup-budget-planner',
    '/business-creation/business-plan-generator',
    '/7-day-blueprint',
    '/7-day-blueprint/d1',
    '/business-management/crm-suite',
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: route ? `${base}${route}` : `${base}/`,
    lastModified: new Date(),
    priority: route === '' ? 1 : 0.8,
    changeFrequency: 'monthly',
  }));

  const dynamicEntries: MetadataRoute.Sitemap = appCategories
    .filter((c) => c && typeof c.category === 'string' && c.category.trim().length > 0)
    .map((c) => ({
      url: `${base}/apps/${slugify(c.category)}`,
      lastModified: new Date(),
      priority: 0.6,
      changeFrequency: 'weekly',
    }));

  return [...staticEntries, ...dynamicEntries];
}
