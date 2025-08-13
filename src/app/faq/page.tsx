
import type { Metadata } from 'next';
import FaqPageContent from './faq-page-content';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Find answers to common questions about BusinessStudio AI, its features, pricing, and how it can help you build your business in Mauritius.',
  openGraph: {
    title: 'FAQ | BusinessStudio AI',
    description: 'Find answers to common questions about BusinessStudio AI, its features, pricing, and how it can help you build your business in Mauritius.',
  },
  twitter: {
    title: 'FAQ | BusinessStudio AI',
    description: 'Find answers to common questions about BusinessStudio AI, its features, pricing, and how it can help you build your business in Mauritius.',
  }
};


export default function FaqPage() {
    return <FaqPageContent />;
}
