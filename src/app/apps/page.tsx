
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
  },
  twitter: {
    title: 'App Gallery | BusinessStudio AI',
    description: 'Explore a powerful suite of AI-driven applications designed to help you build, launch, and manage your business in Mauritius.',
  }
};

export default function AppGalleryPage() {
    return <AppGallery />;
}
