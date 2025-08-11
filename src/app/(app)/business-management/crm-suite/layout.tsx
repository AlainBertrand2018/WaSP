
'use client';

import { CrmSidebarNav } from '@/components/layout/crm-sidebar-nav';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import React from 'react';

export default function CrmSuiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <CrmSidebarNav />
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
