
'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useMounted } from '@/hooks/use-mounted';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AppCard } from '@/components/feature/app-card';
import { appCategories } from '@/lib/app-data';
import { MainHeader } from '@/components/layout/main-header';

type RatingState = {
    [key: string]: {
        rating: number;
        raters: number;
        hasVoted: boolean;
    }
}

export default function AppGallery() {
    const isMounted = useMounted();
    
    // Initialize state for all apps
    const initialRatings = React.useMemo(() => {
        return appCategories.flatMap(cat => cat.apps).reduce((acc, app) => {
            acc[app.title] = {
                rating: app.initialRating || 0,
                raters: app.initialRaters || 0,
                hasVoted: false
            };
            return acc;
        }, {} as RatingState);
    }, []);


    const [ratings, setRatings] = React.useState<RatingState>(initialRatings);

    const handleRatingChange = (title: string, newRating: number) => {
      setRatings(prevRatings => {
          const current = prevRatings[title];
          if (current.hasVoted) return prevRatings;
          
          const newTotalRating = current.rating * current.raters + newRating;
          const newRaters = current.raters + 1;
          const newAverageRating = newTotalRating / newRaters;

          return {
              ...prevRatings,
              [title]: {
                  rating: newAverageRating,
                  raters: newRaters,
                  hasVoted: true
              }
          }
      });
    };

    if (!isMounted) {
      return null;
    }

  return (
    <div className="flex flex-col min-h-screen bg-background text-primary-foreground">
        <MainHeader />

      <main className="flex-1 bg-secondary-darker">
        <div className="container mx-auto px-4 md:px-6 py-12 lg:py-20">
            <div className="flex flex-col gap-8 w-full">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">App Gallery</h1>
                <p className="text-muted-foreground">
                Launch powerful, AI-driven tools to build and manage your business.
                </p>
            </div>

            <section className="w-full my-4">
                <Image
                    src="https://placehold.co/1200x300.png"
                    alt="Advertisement"
                    width={1200}
                    height={300}
                    className="rounded-md w-full h-[300px] object-cover"
                    data-ai-hint="advertisement billboard"
                />
            </section>

            <div className="space-y-12">
                {appCategories.map((category) => (
                <section key={category.category}>
                    <div className="mb-4">
                        <div className="flex items-center gap-3">
                            <Link href={category.href} target="_blank" rel="noopener noreferrer" className="text-2xl font-semibold tracking-tight hover:underline">
                                {category.category}
                            </Link>
                             <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground mt-1">
                            {category.description}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6">
                        {category.apps.map((app) => (
                            <AppCard
                                key={app.title}
                                app={app}
                                ratingState={ratings[app.title]}
                                onRatingChange={(newRating) => handleRatingChange(app.title, newRating)}
                            />
                        ))}
                    </div>
                </section>
                ))}
            </div>
            </div>
        </div>
      </main>
      
      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-12 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/studioFlowLogo_1024.png" alt="BusinessStudio AI Logo" width={32} height={32} />
              <span className="text-xl font-bold">BusinessStudio AI</span>
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/60">The future of business creation.</p>
          </div>

          <div>
            <h4 className="font-semibold">Product</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/#features" className="text-primary-foreground/60 hover:text-primary-foreground">Features</Link></li>
              <li><Link href="/#pricing" className="text-primary-foreground/60 hover:text-primary-foreground">Pricing</Link></li>
              <li><Link href="#" className="text-primary-foreground/60 hover:text-primary-foreground">Updates</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-primary-foreground/60 hover:text-primary-foreground">About</button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>About BusinessStudio AI</DialogTitle>
                    </DialogHeader>
                    <div className="mb-4">
                      <Image src="/images/businessStudio_logo.png" alt="BusinessStudio AI Logo" width={200} height={50} className="w-1/2 mx-auto" />
                    </div>
                    <div className="space-y-4 text-sm text-muted-foreground max-h-[70vh] overflow-y-auto pr-4">
                      <p>
                        BusinessStudio AI is a Made-in-Mauritius Webapps-as-Software Platform (WaSP) that helps entrepreneurs, SMEs and executives validate ideas, build financial plans, and create investor-ready business plans—fast. Designed for the Mauritian market, BusinessStudio AI blends local business insight with practical AI tools so you can create, launch and manage projects in one place, from first concept to go-to-market.
                      </p>
                      <p>
                        Built by Alain Bertrand, a serial entrepreneur using AI co-development, BusinessStudio AI is designed with an AI-first, digital-first mindset to give Mauritian entrepreneurs and executives a real competitive edge. Our goal is simple: <b>help you thrive, not just survive</b>.
                      </p>
                      <h2 className="font-bold text-foreground">What we do</h2>
                      <ul className="space-y-2 list-disc pl-5">
                        <li><b>Local-first validation</b>: test your idea against Mauritian market realities.</li>
                        <li><b>Financial modelling</b>: generate projections and budget scenarios in minutes.</li>
                        <li><b>Investor-ready docs</b>: produce clear, professional business plans.</li>
                        <li><b>Unified workspace</b>: plan, execute and track your venture end-to-end.</li>
                      </ul>
                      <p className="font-bold text-foreground pt-2">
                        <b>Made in Mauritius... Built for Mauritius</b>. If you’re starting up or scaling, BusinessStudio AI gives you the clarity and speed to move from idea to execution with confidence.
                      </p>
                    </div>
                    <DialogFooter className="justify-center">
                      <Button asChild>
                        <Link href="/login">Try The Demo</Link>
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </li>

              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-primary-foreground/60 hover:text-primary-foreground">Careers</button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Careers at BusinessStudio AI</DialogTitle>
                    </DialogHeader>
                    <div className="mb-4">
                      <Image src="/images/studioFlowLogo_1024.png" alt="BusinessStudio AI Logo" width={200} height={50} className="w-1/2 mx-auto" />
                    </div>
                    <div className="space-y-4 text-sm text-muted-foreground max-h-[70vh] overflow-y-auto pr-4">
                      <h1 className="text-lg font-semibold text-foreground">Recruitment starts soon at BusinessStudio AI.</h1>
                      <p>We’re building a local-first, AI-first platform that helps Mauritian entrepreneurs and executives go from idea to investor-ready—fast. In the next few weeks we’ll start listening from you:</p>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Product & UX</li>
                        <li>Engineering / AI</li>
                        <li>Growth Marketing & Content</li>
                        <li>Customer Success & Partnerships</li>
                        <li>Operations</li>
                      </ul>
                      <p>Follow us, on our social networks or DM your profile.</p>
                      <p>We’re an equal-opportunity team—talent from all backgrounds is welcome.</p>
                      <p className="font-mono text-xs">#Hiring #MadeInMauritius #AI #SaaS #Startups #SME #Careers</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </li>

              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-primary-foreground/60 hover:text-primary-foreground">Contact</button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Contact Us</DialogTitle>
                      <DialogDescription>
                        Have a question or want to work with us? Fill out the form below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name-footer" className="text-right">
                          Name
                        </Label>
                        <Input id="name-footer" placeholder="John Doe" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email-footer" className="text-right">
                          Email
                        </Label>
                        <Input id="email-footer" type="email" placeholder="john@example.com" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="message-footer" className="text-right pt-2">
                          Message
                        </Label>
                        <Textarea id="message-footer" placeholder="Your message..." className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Send Message</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Resources</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-primary-foreground/60 hover:text-primary-foreground">Blog</Link></li>
              <li><Link href="/faq" className="text-primary-foreground/60 hover:text-primary-foreground" target="_blank" rel="noopener noreferrer">Help Center</Link></li>
              <li><Link href="/privacy-policy" className="text-primary-foreground/60 hover:text-primary-foreground" target="_blank" rel="noopener noreferrer">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Social</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="https://x.com/AlainBertrandmu/" className="text-primary-foreground/60 hover:text-primary-foreground" target="_blank" rel="noopener noreferrer">Twitter</Link></li>
              <li><Link href="https://www.linkedin.com/company/avantaz/" className="text-primary-foreground/60 hover:text-primary-foreground" target="_blank" rel="noopener noreferrer">LinkedIn</Link></li>
              <li><Link href="https://www.facebook.com/avantaz.mu" className="text-primary-foreground/60 hover:text-primary-foreground" target="_blank" rel="noopener noreferrer">Facebook</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto border-t border-primary-foreground/10 px-4 py-6 text-center text-sm text-primary-foreground/60">
          © 2025 BusinessStudio AI (Alain BERTRAND). All rights reserved.
        </div>
      </footer>
    </div>
  );
}
