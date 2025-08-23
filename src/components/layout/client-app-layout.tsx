
'use client';

import { SidebarNav } from '@/components/layout/sidebar-nav';
import { UserNav } from '@/components/layout/user-nav';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { appTitles } from '@/lib/app-titles';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { AiLoadingSpinner } from '@/components/feature/ai-loading-spinner';

const PUBLIC_PATHS = ['/ideation/brainstorming'];
const AUTH_PATHS = ['/login', '/signup'];

type Profile = {
  role?: string | null;
};

export default function ClientAppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfileAndCheckOwner = async (user: any) => {
      // Check if user is in owner_data table
      const { data: ownerData, error: ownerError } = await supabase
        .from('owner-data')
        .select('id')
        .eq('id', user.id)
        .single();
        
      if (ownerError && ownerError.code !== 'PGRST116') { // Ignore 'no rows found' error
        console.error("Error checking owner data:", ownerError);
      }

      const isHyperAdmin = !!ownerData;

      if (isHyperAdmin) {
        setProfile({ role: 'Hyperadmin' });
      } else {
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        setProfile(data);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const isPublic = PUBLIC_PATHS.some(path => pathname.startsWith(path));
      const isAuthPage = AUTH_PATHS.includes(pathname);

      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
        if (session?.user) {
          fetchProfileAndCheckOwner(session.user);
        }
      }

      if (event === 'SIGNED_IN' && isAuthPage) {
        router.push('/account');
      } else if (event === 'SIGNED_OUT') {
        setProfile(null);
        router.push('/');
      } else if (!session && !isPublic && !isAuthPage) {
        router.push(`/login?redirect=${pathname}`);
      } else {
        setLoading(false);
      }
    });

    const initialCheck = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        const isPublic = PUBLIC_PATHS.some(path => pathname.startsWith(path));
        const isAuthPage = AUTH_PATHS.includes(pathname);
        
        if (session?.user) {
          await fetchProfileAndCheckOwner(session.user);
        }

        if (!session && !isPublic && !isAuthPage) {
             router.push(`/login?redirect=${pathname}`);
        } else if (session && isAuthPage) {
            router.push('/account');
        } else {
            setLoading(false);
        }
    }
    initialCheck();

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  const isHyperAdmin = profile?.role === 'Hyperadmin';

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
    pathname === '/dashboard' ||
    pathname === '/account' ||
    pathname === '/business-management' ||
    pathname === '/business-management/insights-dashboard';

  const isSmeInfoPage = pathname === '/sme-info';

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

  if (loading) {
    return <AiLoadingSpinner show={true} title="Securing session..." />;
  }

  return (
      <SidebarProvider defaultOpen={false}>
        {showMainSidebar && <SidebarNav />}
        <SidebarInset>
          <div className="flex flex-col min-h-screen">
            <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
              <div className="flex items-center gap-2">
                <div className="md:hidden">
                  <SidebarTrigger />
                </div>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <Image
                    src="/images/studioFlow_website_Image.png"
                    alt="BusinessStudio AI Logo"
                    width={24}
                    height={24}
                    className={cn(isHyperAdmin && 'animate-spin-slow')}
                  />
                  <span className="font-bold tracking-tighter hidden md:block">
                    {appTitle}
                  </span>
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
                  'flex-1',
                  !isLandingPage &&
                    !isSmeInfoPage &&
                    'p-4 sm:p-6', // Apply padding to all pages except specified landing pages and sme-info
                  isSmeInfoPage && 'flex flex-col' // Full height for sme-info page
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
  );
}
