
import type { Metadata } from 'next';
import FaqPageContent from './faq-page-content';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Find answers to common questions about BusinessStudio AI, its features, pricing, and how it can help you build your business in Mauritius.',
  openGraph: {
    title: 'FAQ | BusinessStudio AI',
    description: 'Find answers to common questions about BusinessStudio AI, its features, pricing, and how it can help you build your business in Mauritius.',
    images: [
      {
        url: `/api/og?title=Frequently Asked Questions&subtitle=Find answers to common questions about BusinessStudio AI`,
        width: 1200,
        height: 630,
        alt: 'BusinessStudio AI FAQ',
      },
    ],
  },
  twitter: {
    title: 'FAQ | BusinessStudio AI',
    description: 'Find answers to common questions about BusinessStudio AI, its features, pricing, and how it can help you build your business in Mauritius.',
    images: [`/api/og?title=Frequently Asked Questions&subtitle=Find answers to common questions about BusinessStudio AI`],
  }
};


export default function FaqPage() {
    return <FaqPageContent />;
}
