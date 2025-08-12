
'use client';

import { SidebarNav } from '@/components/layout/sidebar-nav';
import { UserNav } from '@/components/layout/user-nav';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Chatbot from '@/components/feature/chatbot';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { appTitles } from '@/lib/app-titles';
import { cn } from '@/lib/utils';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Conditionally render a different sidebar trigger for specific layouts
  const showMainSidebar = !(
    pathname.startsWith('/business-management/crm-suite') || 
    pathname.startsWith('/ideation') ||
    pathname.startsWith('/business-creation') ||
    pathname.startsWith('/7-day-blueprint')
  );

  const getAppTitle = () => {
    for (const [path, title] of Object.entries(appTitles)) {
      if (pathname.startsWith(path)) {
        return title;
      }
    }
    return 'BusinessStudio AI';
  };

  const appTitle = getAppTitle();
  
  const isLandingPage = pathname === '/ideation' || pathname === '/business-creation';

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        {showMainSidebar && <SidebarNav />}
        <SidebarInset>
          <div className="flex flex-col min-h-screen">
            <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
                <div className='flex items-center gap-2'>
                    <div className='md:hidden'>
                        <SidebarTrigger/>
                    </div>
                     <Link href="/dashboard" className="flex items-center gap-2">
                        <Image src="/images/studioFlow_website_Image.png" alt="BusinessStudio AI Logo" width={24} height={24} />
                        <span className="font-bold tracking-tighter hidden md:block">{appTitle}</span>
                    </Link>
                </div>
              <div className="ml-auto">
                <UserNav />
              </div>
            </header>
            <main className={cn(
              "flex-1",
              !isLandingPage && "p-6 sm:p-8" // Apply padding to all pages except specified landing pages
            )}>
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
