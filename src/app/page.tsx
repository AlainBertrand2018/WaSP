import type { Metadata } from 'next';
import HomePageContent from './home-page-content';

export const metadata: Metadata = {
  title: 'BusinessStudio AI – AI tools for Mauritian entrepreneurs',
  description:
    'Your unified command center for creating, launching and managing your business in Mauritius. Leverage our AI-powered suite to go from idea to investor-ready, faster than ever before.',
  openGraph: {
    type: 'website',
    url: 'https://www.business-studio-ai.online/',
    title: 'BusinessStudio AI',
    description: 'AI tools for Mauritian entrepreneurs & SMEs.',
    images: ['/images/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BusinessStudio AI',
    description: 'AI tools for Mauritian entrepreneurs & SMEs.',
    images: ['/images/og-image.png'],
  },
};

export default function Home() {
  return <HomePageContent />;
}
