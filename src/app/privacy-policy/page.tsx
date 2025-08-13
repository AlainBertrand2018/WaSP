
import type { Metadata } from 'next';
import PrivacyPolicyContent from './privacy-policy-content';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how BusinessStudio AI collects, uses, and protects your personal and business data. We are committed to transparency and GDPR compliance.',
  openGraph: {
    title: 'Privacy Policy | BusinessStudio AI',
    description: 'Learn how BusinessStudio AI collects, uses, and protects your personal and business data. We are committed to transparency and GDPR compliance.',
  },
  twitter: {
    title: 'Privacy Policy | BusinessStudio AI',
    description: 'Learn how BusinessStudio AI collects, uses, and protects your personal and business data. We are committed to transparency and GDPR compliance.',
  }
};


export default function PrivacyPolicyPage() {
    return <PrivacyPolicyContent />;
}
