
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/layout/theme-provider';
import Chatbot from '@/components/feature/chatbot';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AudioPlayer } from '@/components/feature/audio-player';
import { siteConfig } from '@/config/site';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

// Even with 'use client', metadata exports are still supported

export const metadata: Metadata = {
  metadataBase: new URL("https://www.business-studio-ai.online"), // <-- absolute base URL
  title: {
    default: "BusinessStudio AI — Build, Validate & Launch in Mauritius",
    template: "%s | BusinessStudio AI",
  },
  description:
    "AI-powered platform to validate ideas, model finances, and generate investor-ready plans for Mauritian entrepreneurs and SMEs.",
  alternates: {
    canonical: "/",
    languages: { "en-MU": "/", "fr-MU": "/fr" }, // adapt to your routes
  },
  openGraph: {
    type: "website",
    url: "https://www.business-studio-ai.online",
    siteName: "BusinessStudio AI",
    title: "BusinessStudio AI — AI tools for Mauritian entrepreneurs",
    description:
      "From idea to investor-ready: validation, market research, financial modeling, and business plans.",
    images: [
      {
        url: "/images/og-image.png", // 1200x630
        width: 1200,
        height: 630,
        alt: "BusinessStudio AI social preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@alainbertrandmu", // if you have one
    creator: "@alainbertrandmu",
    title: "BusinessStudio AI — AI tools for Mauritian entrepreneurs",
    description:
      "Validate ideas, model finances, and create investor-ready plans.",
    images: ["/images/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', poppins.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Chatbot />
          <AudioPlayer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
