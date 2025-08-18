
import type { Metadata } from 'next';
import InvestorPageContent from './investor-page-content';

export const metadata: Metadata = {
  title: 'Investor Memorandum',
  description: 'An overview of the investment opportunity in BusinessStudio AI, a first-of-its-kind Webapps-as-Software Platform (WaSP) designed for the Mauritian market.',
  openGraph: {
    title: 'Investor Memorandum | BusinessStudio AI',
    description: 'An overview of the investment opportunity in BusinessStudio AI, a first-of-its-kind Webapps-as-Software Platform (WaSP) designed for the Mauritian market.',
    images: [
      {
        url: `/api/og?title=Investor Memorandum&subtitle=An overview of the investment opportunity in BusinessStudio AI`,
        width: 1200,
        height: 630,
        alt: 'BusinessStudio AI Investor Memorandum',
      },
    ],
  },
  twitter: {
    title: 'Investor Memorandum | BusinessStudio AI',
    description: 'An overview of the investment opportunity in BusinessStudio AI, a first-of-its-kind Webapps-as-Software Platform (WaSP) designed for the Mauritian market.',
    images: [`/api/og?title=Investor Memorandum&subtitle=An overview of the investment opportunity in BusinessStudio AI`],
  }
};


export default function InvestorsInfoPage() {
    return <InvestorPageContent />;
}
