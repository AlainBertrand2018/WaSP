
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Menu, PlayCircle, X } from 'lucide-react';
import { useAudioPlayerStore } from '@/store/audio-player-store';
import React from 'react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const navLinks = [
    { title: 'Features', href: '/#features' },
    { title: 'The Platform', href: '/#whatis' },
    { title: 'Testimonials', href: '/#testimonials' },
    { title: 'App Gallery', href: '/apps' },
    { title: 'Pricing', href: '/#pricing' },
    { title: "Investors' Information", href: '/investors_info', isExternal: true },
    { title: 'FAQ', href: '/faq' },
];


export function MainHeader() {
  const { openPlayer } = useAudioPlayerStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handlePlayIntro = () => {
    openPlayer('/audio/Claire Presentation.mp3');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-secondary text-secondary-foreground backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/studioFlowLogo_1024.png"
            alt="BusinessStudio AI Logo"
            width={32}
            height={32}
          />
          <span className="text-xl font-bold">BusinessStudio AI</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary">
              Welcome <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    About BusinessStudio AI
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>About BusinessStudio AI</DialogTitle>
                  </DialogHeader>
                  <div className="mb-4">
                    <Image
                      src="/images/businessStudio_logo.png"
                      alt="BusinessStudio AI Logo"
                      width={200}
                      height={50}
                      className="w-1/2 mx-auto"
                    />
                  </div>
                  <div className="space-y-4 text-sm text-muted-foreground max-h-[70vh] overflow-y-auto pr-4">
                    <p>
                      BusinessStudio AI is a Made-in-Mauritius
                      Webapps-as-Software Platform (WaSP) that helps
                      entrepreneurs, SMEs and executives validate ideas, build
                      financial plans, and create investor-ready business
                      plans—fast. Designed for the Mauritian market,
                      BusinessStudio AI blends local business insight with
                      practical AI tools so you can create, launch and manage
                      projects in one place, from first concept to go-to-market.
                    </p>
                    <p>
                      Built by Alain Bertrand, a serial entrepreneur using AI
                      co-development, BusinessStudio AI is designed with an
                      AI-first, digital-first mindset to give Mauritian
                      entrepreneurs and executives a real competitive edge. Our
                      goal is simple: <b>help you thrive, not just survive</b>.
                    </p>
                    <h2 className="font-bold text-foreground">What we do</h2>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>
                        <b>Local-first validation</b>: test your idea against
                        Mauritian market realities.
                      </li>
                      <li>
                        <b>Financial modelling</b>: generate projections and
                        budget scenarios in minutes.
                      </li>
                      <li>
                        <b>Investor-ready docs</b>: produce clear, professional
                        business plans.
                      </li>
                      <li>
                        <b>Unified workspace</b>: plan, execute and track your
                        venture end-to-end.
                      </li>
                    </ul>
                    <p className="font-bold text-foreground pt-2">
                      <b>Made in Mauritius... Built for Mauritius</b>. If you’re
                      starting up or scaling, BusinessStudio AI gives you the
                      clarity and speed to move from idea to execution with
                      confidence.
                    </p>
                  </div>
                  <DialogFooter className="justify-center">
                    <Button asChild>
                      <Link href="/login">Try The Demo</Link>
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <DropdownMenuItem asChild>
                <Link href="/#features">Features</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/#whatis">The Platform</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/#testimonials">Testimonials</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handlePlayIntro} className="gap-2">
                <PlayCircle />
                Introducing CLAIRE
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/apps"
            className="text-sm font-medium hover:text-primary"
          >
            The Apps Gallery
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-medium hover:text-primary"
          >
            Pricing
          </Link>
          <Link
            href="/investors_info"
            className="text-sm font-medium hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Investors' Information
          </Link>
           <Link
            href="/faq"
            className="text-sm font-medium hover:text-primary"
          >
            FAQ
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-sm font-medium hover:text-primary">
                Contact
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Contact Us</DialogTitle>
                <DialogDescription>
                  Have a question or want to work with us? Fill out the form
                  below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="message" className="text-right pt-2">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Send Message</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
           <Button asChild variant="ghost" className="hidden md:flex">
            <Link href="/login">Sign In</Link>
          </Button>
          <div className="md:hidden">
             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                      <Menu />
                      <span className="sr-only">Open menu</span>
                  </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs bg-secondary">
                  <SheetHeader>
                      <SheetTitle>
                          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                            <Image src="/images/studioFlowLogo_1024.png" alt="BusinessStudio AI Logo" width={24} height={24} />
                            <span className="text-lg font-bold">BusinessStudio AI</span>
                          </Link>
                      </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col h-full py-4">
                      <nav className="flex flex-col gap-2 flex-grow">
                        {navLinks.map((link) => (
                           <Link
                            key={link.title}
                            href={link.href}
                            target={link.isExternal ? '_blank' : '_self'}
                            rel={link.isExternal ? 'noopener noreferrer' : ''}
                            className="text-muted-foreground hover:text-foreground p-2 rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                           >
                            {link.title}
                           </Link>
                        ))}
                      </nav>
                      <Button asChild className="w-full">
                         <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                      </Button>
                  </div>
              </SheetContent>
             </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
