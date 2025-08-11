
'use client';

import { CrmSidebarNav } from '@/components/layout/crm-sidebar-nav';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import { UserNav } from '@/components/layout/user-nav';

export default function CrmSuiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <CrmSidebarNav />
      <SidebarInset>
        <div className="flex flex-col">
           <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
              <div className='md:hidden'>
                  <SidebarTrigger/>
              </div>
            <div className="ml-auto">
              <UserNav />
            </div>
          </header>
          <main className="flex-1 p-6 sm:p-8 z-20">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
