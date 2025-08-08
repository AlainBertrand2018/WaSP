
import { UserNav } from '@/components/layout/user-nav';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function StandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10">
        <Link href="/apps" className="flex items-center gap-2">
            <Image src="/images/studioFlow_website_Image.png" alt="BusinessStudio AI Logo" width={24} height={24} />
            <span className="font-bold tracking-tighter hidden md:block">BusinessStudio AI</span>
        </Link>
        <div className="ml-auto">
            <UserNav />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground">
        © 2025 BusinessStudio AI (Alain BERTRAND). All rights reserved.
      </footer>
    </div>
  );
}
