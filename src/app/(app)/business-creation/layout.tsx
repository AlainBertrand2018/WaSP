'use client';

import { BusinessCreationSidebarNav } from '@/components/layout/business-creation-sidebar-nav';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import React from 'react';

export default function BusinessCreationSuiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <BusinessCreationSidebarNav />
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
