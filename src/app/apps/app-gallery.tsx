
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

import { useMounted } from '@/hooks/use-mounted';
import { toast } from '@/hooks/use-toast';

import { MainHeader } from '@/components/layout/main-header';
import { AppCard } from '@/components/feature/app-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { appCategories, type AppData } from '@/lib/app-data';
import { ExternalLink } from 'lucide-react';

type RatingState = {
  [key: string]: {
    rating: number;
    raters: number;
    hasVoted: boolean;
  };
};

const carouselItems = [
    {
        imageSrc: '/images/ads/slider_01.webp',
        dataAiHint: 'business validation',
        href: '/business-creation',
        cta: 'Validate Your Business Idea',
    },
    {
        imageSrc: '/images/ads/slider_02.webp',
        dataAiHint: 'financial planning',
        href: '/business-creation/startup-budget-planner',
        cta: 'Plan Your Finances',
    },
    {
        imageSrc: '/images/ads/slider_03.webp',
        dataAiHint: 'customer relationship management',
        href: '/business-management/crm-suite',
        cta: 'Explore CRM Suite',
    },
     {
        imageSrc: '/images/ads/slider_04.webp',
        dataAiHint: 'legal compliance',
        href: '/compliance-validator',
        cta: 'Check Your Compliance',
    },
];

const categoryColors = {
    default: "bg-muted hover:bg-muted/80 text-muted-foreground",
    blue: "bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900/50 dark:hover:bg-blue-900/80 dark:text-blue-200",
    green: "bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900/50 dark:hover:bg-green-900/80 dark:text-green-200",
};


// Slugify helper for generating valid HTML IDs from category titles
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // spaces -> dashes
    .replace(/&/g, 'and') // "&" -> "and"
    .replace(/[^\w-]+/g, '') // strip non-word chars except dash
    .replace(/--+/g, '-'); // collapse multiple dashes
}

export default function AppGallery() {
  const isMounted = useMounted();
  const resumeInputRef = React.useRef<HTMLInputElement>(null);
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const handleUploadClick = () => {
    resumeInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: 'Résumé Uploaded',
        description: `Successfully uploaded ${file.name}. We will be in touch!`,
      });
    }
  };

  // Initialize state for all apps
  const initialRatings = React.useMemo(() => {
    return appCategories
      .flatMap((cat) => cat.apps)
      .reduce((acc, app) => {
        acc[app.title] = {
          rating: app.initialRating || 0,
          raters: app.initialRaters || 0,
          hasVoted: false,
        };
        return acc;
      }, {} as RatingState);
  }, []);

  const [ratings, setRatings] = React.useState<RatingState>(initialRatings);

  const handleRatingChange = (title: string, newRating: number) => {
    setRatings((prevRatings) => {
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
          hasVoted: true,
        },
      };
    });
  };

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <MainHeader />

      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 md:px-6 py-12 lg:py-16">
          <div className="flex flex-col gap-12 w-full">

            {/* Hero Carousel */}
             <Carousel
              plugins={[plugin.current]}
              className="w-full"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {carouselItems.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="relative w-full overflow-hidden rounded-3xl">
                        <Image 
                            src={item.imageSrc} 
                            alt={item.cta} 
                            width={1200}
                            height={630}
                            className="w-full h-auto object-cover"
                            data-ai-hint={item.dataAiHint}
                        />
                         <div className="absolute inset-0 bg-black/30 flex items-end justify-center p-8">
                              <Button asChild variant="outline" className="bg-white/10 border-white/30 text-white backdrop-blur-sm hover:bg-white/20">
                                  <Link href={item.href}>{item.cta}</Link>
                              </Button>
                         </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
               <div className="absolute bottom-6 right-6 flex items-center gap-4">
                    <CarouselPrevious className="static translate-y-0 bg-white/10 hover:bg-white/20 border-none text-white" />
                    <CarouselNext className="static translate-y-0 bg-white/10 hover:bg-white/20 border-none text-white" />
               </div>
            </Carousel>

            {/* Categories Section */}
            <section id="categories" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold tracking-tight mb-4">Categories</h2>
                <div className="flex flex-wrap items-center justify-start gap-3">
                    {appCategories.map((category, index) => {
                        const colors = [categoryColors.blue, categoryColors.default, categoryColors.blue, categoryColors.green, categoryColors.default, categoryColors.blue];
                        const colorClass = colors[index % colors.length];
                        return (
                            <Button variant="outline" asChild key={category.category} className={`h-12 px-5 text-base rounded-lg border-transparent ${colorClass}`}>
                                <a href={`#${slugify(category.category)}`} onClick={(e) => handleScrollTo(e, slugify(category.category))}>
                                    <category.icon className="mr-2 h-5 w-5" />
                                    {category.category}
                                </a>
                            </Button>
                        )
                    })}
                </div>
            </section>

            {/* Individual Category Sections */}
            <div className="space-y-16">
              {appCategories.map((category) => {
                const isExternal = category.href.startsWith('http');
                return (
                  <section
                    key={category.category}
                    id={slugify(category.category)}
                    className="scroll-mt-24"
                  >
                    <div className="mb-6">
                      <div className="flex items-center gap-3">
                        <Link
                          href={category.href}
                          target={isExternal ? '_blank' : '_self'}
                          rel={isExternal ? 'noopener noreferrer' : ''}
                          className="text-2xl font-semibold tracking-tight hover:underline"
                        >
                          {category.category}
                        </Link>
                        {isExternal && (
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        )}
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
                          onRatingChange={(newRating) =>
                            handleRatingChange(app.title, newRating)
                          }
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-12 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/studioFlowLogo_1024.png"
                alt="BusinessStudio AI Logo"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold">BusinessStudio AI</span>
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/60">
              The future of business creation.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Product</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/#features"
                  className="text-primary-foreground/60 hover:text-primary-foreground"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-primary-foreground/60 hover:text-primary-foreground"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-primary-foreground/60 hover:text-primary-foreground"
                >
                  Updates
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-primary-foreground/60 hover:text-primary-foreground">
                      About
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>About BusinessStudio AI</DialogTitle>
                    </DialogHeader>
                    <div className="mb-4">
                      <Image
                        src="/images/businessStudio+Logotype.webp"
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
                        plans—fast.
                      </p>
                      <p>
                        Built by Alain Bertrand, BusinessStudio AI is designed with an
                        AI-first, digital-first mindset to give Mauritian
                        entrepreneurs and executives a real competitive edge.
                      </p>
                      <h2 className="font-bold text-foreground">What we do</h2>
                      <ul className="space-y-2 list-disc pl-5">
                        <li><b>Local-first validation</b>: test your idea against Mauritian market realities.</li>
                        <li><b>Financial modelling</b>: generate projections and budget scenarios in minutes.</li>
                        <li><b>Investor-ready docs</b>: produce clear, professional business plans.</li>
                        <li><b>Unified workspace</b>: plan, execute and track your venture end-to-end.</li>
                      </ul>
                      <p className="font-bold text-foreground pt-2">
                        <b>Made in Mauritius... Built for Mauritius.</b>
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
                    <button className="text-primary-foreground/60 hover:text-primary-foreground">
                      Careers
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Careers at BusinessStudio AI</DialogTitle>
                    </DialogHeader>
                    <div className="mb-4">
                      <Image
                        src="/images/businessStudio+Logotype.webp"
                        alt="BusinessStudio AI Logo"
                        width={200}
                        height={50}
                        className="w-1/2 mx-auto"
                      />
                    </div>
                    <div className="space-y-4 text-sm text-muted-foreground max-h-[70vh] overflow-y-auto pr-4">
                      <h1 className="text-lg font-semibold text-foreground">
                        Recruitment starts soon at BusinessStudio AI.
                      </h1>
                      <p>
                        We’re building a local-first, AI-first platform that helps
                        Mauritian entrepreneurs and executives go from idea to
                        investor-ready—fast.
                      </p>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Product &amp; UX</li>
                        <li>Engineering / AI</li>
                        <li>Growth Marketing &amp; Content</li>
                        <li>Customer Success &amp; Partnerships</li>
                        <li>Operations</li>
                      </ul>
                      <p>Follow us on our social networks or DM your profile.</p>
                      <p>We’re an equal-opportunity team—talent from all backgrounds is welcome.</p>
                      <p className="font-mono text-xs">#Hiring #MadeInMauritius #AI #SaaS #Startups #SME #Careers</p>
                    </div>
                    <DialogFooter className="justify-center pt-4">
                      <input
                        type="file"
                        ref={resumeInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                      />
                      <Button onClick={handleUploadClick}>Upload Résumé</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </li>

              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-primary-foreground/60 hover:text-primary-foreground">
                      Contact
                    </button>
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
