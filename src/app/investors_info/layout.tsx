
'use client';

import { MainHeader } from '@/components/layout/main-header';
import { useMounted } from '@/hooks/use-mounted';
import React from 'react';

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useMounted();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        {isMounted && <MainHeader />}
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t">
        © 2025 BusinessStudio AI (Alain BERTRAND). All rights reserved.
      </footer>
    </div>
  );
}
