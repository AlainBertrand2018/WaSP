
'use client';

import { SevenDayBlueprintSidebarNav } from '@/components/layout/7-day-blueprint-sidebar-nav';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import React from 'react';

export default function SevenDayBlueprintLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SevenDayBlueprintSidebarNav />
      <SidebarInset>
        <div className="flex flex-col">
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
