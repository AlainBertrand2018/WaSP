
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/theme-provider';

// A template title for other pages in the app
export const metadata: Metadata = {
  title: {
    template: '%s | BusinessStudio AI',
    default: 'BusinessStudio AI',
  },
  description: 'AI-powered tools for Mauritian entrepreneurs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
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
