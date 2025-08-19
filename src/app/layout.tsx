
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Providers from '@/components/layout/providers';
import { siteConfig } from '@/config/site';

const fontSans = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

// A template title for other pages in the app
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'BusinessStudio AI – AI tools for Mauritian entrepreneurs',
    template: `%s | ${siteConfig.name}`,
  },
  description: 'Business Studio AI is a fully mobile-ready all-in-one AI-powered command center that guides users through every stage of business creation, marketing, launch and management.',
  openGraph: {
    type: 'website',
    url: 'https://www.business-studio-ai.online/',
    siteName: 'BusinessStudio AI',
    title: 'BusinessStudio AI - AI tools for Mauritian entrepreneurs',
    description: 'Business Studio AI is a fully mobile-ready all-in-one AI-powered command center that guides users through every stage of business creation, marketing, launch and management.',
    images: [
      {
        url: 'https://www.business-studio-ai.online/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BusinessStudio AI preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BusinessStudio AI - AI tools for Mauritian entrepreneurs',
    description: 'Business Studio AI is a fully mobile-ready all-in-one AI-powered command center that guides users through every stage of business creation, marketing, launch and management.',
    images: ['https://www.business-studio-ai.online/images/og-image.png'],
  },
  icons: {
    icon: '/images/favicon.ico',
    shortcut: '/images/favicon.ico',
    apple: '/images/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
