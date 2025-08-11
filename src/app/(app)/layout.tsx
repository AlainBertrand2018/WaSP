
'use client';

import { SidebarNav } from '@/components/layout/sidebar-nav';
import { UserNav } from '@/components/layout/user-nav';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Chatbot from '@/components/feature/chatbot';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <SidebarNav />
        <SidebarInset>
          <div className="flex flex-col min-h-screen">
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
            <footer className="text-center p-4 text-sm text-muted-foreground border-t">
               © 2025 BusinessStudio AI (Alain BERTRAND). All rights reserved.
            </footer>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
      <Chatbot />
    </ThemeProvider>
  );
}
