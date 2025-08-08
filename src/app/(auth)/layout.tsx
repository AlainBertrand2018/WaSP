
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground">
        © 2025 BusinessStudio AI (Alain BERTRAND). All rights reserved.
      </footer>
    </div>
  );
}
