
'use client';

import { IdeationSidebarNav } from '@/components/layout/ideation-sidebar-nav';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import React from 'react';

export default function IdeationSuiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <IdeationSidebarNav />
      <SidebarInset>
        <div className="flex flex-col">
          <main className="flex-1 p-6 sm:p-8">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
