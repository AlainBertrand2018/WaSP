
import { MetadataRoute } from 'next'
import { appCategories } from '@/lib/app-data';
import { siteConfig } from '@/config/site';

function slugify(text: string) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/&/g, 'and') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
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
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
    priority: route === '' ? 1 : 0.8,
  }));

  const dynamicCategoryRoutes = appCategories.map((category) => ({
    url: `${siteConfig.url}/apps/${slugify(category.category)}`,
    lastModified: new Date().toISOString(),
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicCategoryRoutes];
}
