
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import AppGallery from './app-gallery';

export const metadata: Metadata = {
  title: 'App Gallery',
  description: 'Explore a powerful suite of AI-driven applications designed to help you build, launch, and manage your business in Mauritius.',
  openGraph: {
    title: 'App Gallery | BusinessStudio AI',
    description: 'Explore a powerful suite of AI-driven applications designed to help you build, launch, and manage your business in Mauritius.',
    url: `${siteConfig.url}/apps`,
    images: [
      {
        url: `/api/og?title=App Gallery&subtitle=Explore a powerful suite of AI-driven applications`,
        width: 1200,
        height: 630,
        alt: 'BusinessStudio AI App Gallery',
      },
    ],
  },
  twitter: {
    title: 'App Gallery | BusinessStudio AI',
    description: 'Explore a powerful suite of AI-driven applications designed to help you build, launch, and manage your business in Mauritius.',
    images: [`/api/og?title=App Gallery&subtitle=Explore a powerful suite of AI-driven applications`],
  }
};

export default function AppGalleryPage() {
    return <AppGallery />;
}
