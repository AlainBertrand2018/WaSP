
'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { useMounted } from '@/hooks/use-mounted';
import { Toaster } from '@/components/ui/toaster';
import Chatbot from '@/components/feature/chatbot';
import { AudioPlayer } from '@/components/feature/audio-player';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const isMounted = useMounted();

  // This ensures that the client-only providers are only rendered on the client.
  if (!isMounted) {
    return <>{children}</>;
  }
  
  return (
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
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}
