import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-50 w-full bg-secondary/80 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                 <Link href="/" className="flex items-center gap-2">
                    <Image src="/images/studioFlowLogo_1024.png" alt="BusinessStudio AI Logo" width={32} height={32} />
                    <span className="text-xl font-bold">BusinessStudio AI</span>
                </Link>
                <nav>
                    <Link href="/" className="text-sm font-medium hover:text-primary">
                    Back to Home
                    </Link>
                </nav>
            </div>
        </header>
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t">
        © 2025 BusinessStudio AI (Alain BERTRAND). All rights reserved.
      </footer>
    </div>
  );
}
