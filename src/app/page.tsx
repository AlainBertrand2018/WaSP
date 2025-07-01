import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 md:px-6">
        <nav className="flex items-center gap-2">
          <LayoutGrid className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold tracking-tighter">StudioFlow AI</h1>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-headline">
            Your Unified Command Center for Content Creation
          </h2>
          <p className="text-muted-foreground md:text-xl">
            Seamlessly access and manage all your generative AI tools from one
            central hub. Boost your productivity and streamline your creative
            workflow with StudioFlow AI.
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
      <footer className="text-center p-4 text-sm text-muted-foreground">
        © {new Date().getFullYear()} StudioFlow AI. All rights reserved.
      </footer>
    </div>
  );
}
