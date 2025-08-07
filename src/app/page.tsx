import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 md:px-6">
        <nav className="flex items-center gap-2">
          <LayoutGrid className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold tracking-tighter">StudioFlow AI</h1>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-6 sm:p-8">
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-6xl md:text-6xl font-bold tracking-tighter font-headline">
            SME BUSINESS TOOLS
          </h2>
          <h3 className="text-1xl md:text-6xl font-bold tracking-tighter font-headline">
            Your Unified WaSP (Webapps-as-Software Platform) for Business
            Creation and Management
          </h3>
          <p className="text-muted-foreground md:text-xl">
            Seamlessly access our powerful AI agent-driven business tools to
            create, manage your businesses, boost your productivity and
            streamline your workflows with WaSP AI.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button asChild size="lg">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t">
        © 2024 StudioFlow AI. All rights reserved.
      </footer>
    </div>
  );
}
