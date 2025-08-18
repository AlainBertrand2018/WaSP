
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/layout/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.business-studio-ai.online'),
  title: 'BusinessStudio AI – AI tools for Mauritian entrepreneurs',
  description: 'a fully mobile-ready all-in-one AI-powered command center that guides users through every stage of business creation, marketing, launch and management.',
  openGraph: {
    type: 'website',
    url: 'https://www.business-studio-ai.online/',
    siteName: 'BusinessStudio AI',
    title: 'BusinessStudio AI',
    description: 'a fully mobile-ready all-in-one AI-powered command center that guides users through every stage of business creation, marketing, launch and management.',
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
    title: 'BusinessStudio AI',
    description: 'a fully mobile-ready all-in-one AI-powered command center that guides users through every stage of business creation, marketing, launch and management.',
    images: ['https://www.business-studio-ai.online/images/og-image.png'],
  },
  icons: {
    icon: '/images/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', inter.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
