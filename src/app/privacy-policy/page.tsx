
import type { Metadata } from 'next';
import PrivacyPolicyContent from './privacy-policy-content';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how BusinessStudio AI collects, uses, and protects your personal and business data. We are committed to transparency and GDPR compliance.',
  openGraph: {
    title: 'Privacy Policy | BusinessStudio AI',
    description: 'Learn how BusinessStudio AI collects, uses, and protects your personal and business data.',
    images: [
      {
        url: `/api/og?title=Privacy Policy&subtitle=How we collect, use, and protect your data`,
        width: 1200,
        height: 630,
        alt: 'BusinessStudio AI Privacy Policy',
      },
    ],
  },
  twitter: {
    title: 'Privacy Policy | BusinessStudio AI',
    description: 'Learn how BusinessStudio AI collects, uses, and protects your personal and business data.',
    images: [`/api/og?title=Privacy Policy&subtitle=How we collect, use, and protect your data`],
  }
};


export default function PrivacyPolicyPage() {
    return <PrivacyPolicyContent />;
}
