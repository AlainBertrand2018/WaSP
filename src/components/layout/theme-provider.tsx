
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { useMounted } from '@/hooks/use-mounted';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const isMounted = useMounted();

  // On the server, we just render the children.
  // On the client, after mounting, we render the full provider.
  // This prevents a hydration mismatch.
  if (!isMounted) {
    return <>{children}</>;
  }
  
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
