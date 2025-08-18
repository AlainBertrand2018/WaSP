
import type { Metadata } from 'next';
import HomePageContent from './home-page-content';
import { siteConfig } from '@/config/site';

const pageTitle = siteConfig.name;
const pageDescription = siteConfig.description;

// This metadata will be rendered specifically for the homepage
export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    url: siteConfig.url,
    siteName: pageTitle,
    title: pageTitle,
    description: pageDescription,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/api/og`,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [`${siteConfig.url}/api/og`],
  },
};

export default function Home() {
  return <HomePageContent />;
}
