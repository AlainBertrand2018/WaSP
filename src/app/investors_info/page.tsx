
import type { Metadata } from 'next';
import InvestorPageContent from './investor-page-content';

export const metadata: Metadata = {
  title: 'Investor Memorandum',
  description: 'An overview of the investment opportunity in BusinessStudio AI, a first-of-its-kind Webapps-as-Software Platform (WaSP) designed for the Mauritian market.',
  openGraph: {
    title: 'Investor Memorandum | BusinessStudio AI',
    description: 'An overview of the investment opportunity in BusinessStudio AI, a first-of-its-kind Webapps-as-Software Platform (WaSP) designed for the Mauritian market.',
  },
  twitter: {
    title: 'Investor Memorandum | BusinessStudio AI',
    description: 'An overview of the investment opportunity in BusinessStudio AI, a first-of-its-kind Webapps-as-Software Platform (WaSP) designed for the Mauritian market.',
  }
};


export default function InvestorsInfoPage() {
    return <InvestorPageContent />;
}
