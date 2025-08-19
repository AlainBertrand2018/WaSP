
// app/sitemap.ts
import type { MetadataRoute } from "next";

// This tells Next.js to re-generate the sitemap on each request.
export const dynamic = "force-dynamic";

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
  const base = "https://www.business-studio-ai.online";
  const now = new Date();

  // Manually list all known static pages to avoid problematic imports
  const staticRoutes = [
    { url: '/', priority: 1.0 },
    { url: '/apps', priority: 0.8 },
    { url: '/faq', priority: 0.7 },
    { url: '/investors_info', priority: 0.7 },
    { url: '/privacy-policy', priority: 0.5 },
    { url: '/dashboard', priority: 0.8 },
    { url: '/ideation', priority: 0.8 },
    { url: '/ideation/brainstorming', priority: 0.7 },
    { url: '/business-creation', priority: 0.8 },
    { url: '/business-creation/business-idea-validation', priority: 0.7 },
    { url: '/business-creation/mvp-planner', priority: 0.7 },
    { url: '/business-creation/startup-budget-planner', priority: 0.7 },
    { url: '/business-creation/business-plan-generator', priority: 0.7 },
    { url: '/7-day-blueprint', priority: 0.8 },
    { url: '/7-day-blueprint/d1', priority: 0.7 },
    { url: '/business-management', priority: 0.8 },
    { url: '/business-management/crm-suite', priority: 0.7 },
    { url: '/business-management/crm-suite/clients', priority: 0.6 },
    { url: '/business-management/crm-suite/clients/new', priority: 0.5 },
    { url: '/business-management/crm-suite/projects', priority: 0.6 },
    { url: '/business-management/crm-suite/projects/new', priority: 0.5 },
    { url: '/business-management/crm-suite/quotations', priority: 0.6 },
    { url: '/business-management/crm-suite/quotations/new', priority: 0.5 },
    { url: '/business-management/crm-suite/invoices', priority: 0.6 },
    { url: '/compliance-validator', priority: 0.7 },
    { url: '/compliance-validator/validation-checklist', priority: 0.6 },
    { url: '/sme-info', priority: 0.7 },
  ].map(route => ({
      url: `${base}${route.url}`,
      lastModified: now,
      priority: route.priority,
      changeFrequency: "weekly" as "weekly",
  }));
  
  // Manually list categories to avoid importing from a client component
  const categories = [
    'Business Creation',
    'Business Management',
    'Financials',
    'Marketing & Ads',
    'Products',
    'Specialized Apps'
  ];

  const dynamicCategoryPages = categories.map((category) => {
    return {
      url: `${base}/apps/${slugify(category)}`,
      lastModified: now,
      priority: 0.7,
      changeFrequency: "weekly" as "weekly",
    };
  });
  
  // Combine all pages
  return [...staticRoutes, ...dynamicCategoryPages];
}
