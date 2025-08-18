
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

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

// Correctly generate metadata as per your instructions
export const metadata: Metadata = {
  metadataBase: new URL("https://www.business-studio-ai.online"),
  title: "BusinessStudio AI – AI tools for Mauritian entrepreneurs",
  description: "Streamlined idea validation, financial modeling, and investor-ready plans.",
  openGraph: {
    type: "website",
    url: "https://www.business-studio-ai.online/",
    title: "BusinessStudio AI",
    description: "AI tools for Mauritian entrepreneurs & SMEs.",
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "BusinessStudio AI",
    description: "AI tools for Mauritian entrepreneurs & SMEs.",
    images: ["/images/og-image.png"],
  },
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
