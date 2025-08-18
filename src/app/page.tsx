
import type { Metadata } from 'next';
import HomePageContent from './home-page-content';
import { siteConfig } from '@/config/site';

const pageTitle = siteConfig.name;
const pageDescription = siteConfig.description;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/api/og`,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
    type: 'website',
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
