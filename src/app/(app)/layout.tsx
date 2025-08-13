
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
import { motion, AnimatePresence } from 'framer-motion';
import { AudioPlayer } from '@/components/feature/audio-player';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
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
  
  const isLandingPage = 
    pathname === '/ideation' || 
    pathname === '/business-creation' || 
    pathname === '/dashboard';

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -20,
    },
  };
  
  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider defaultOpen={false}>
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
            <AnimatePresence mode="wait">
              <motion.main
                key={pathname}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className={cn(
                  "flex-1",
                  !isLandingPage && "p-4 sm:p-6" // Apply padding to all pages except specified landing pages
                )}
              >
                {children}
              </motion.main>
            </AnimatePresence>
            <footer className="text-center p-4 text-sm text-muted-foreground border-t">
               © 2025 BusinessStudio AI (Alain BERTRAND). All rights reserved.
            </footer>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
      <Chatbot />
      <AudioPlayer />
    </ThemeProvider>
  );
}
