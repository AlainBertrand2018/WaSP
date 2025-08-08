
'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  ArrowRight,
  Briefcase,
  CheckCheck,
  CircleDollarSign,
  HeartHandshake,
  GanttChartSquare,
  Lightbulb,
  LineChart,
  Megaphone,
  Package,
  Users,
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

const appCategories = [
  {
    category: 'Business Creation',
    description: 'Tools to take your idea from concept to investor-ready.',
    apps: [
      {
        icon: <Lightbulb className="h-8 w-8 text-primary" />,
        title: 'Business Idea Validation',
        description: 'Assess your business idea against the Mauritian market.',
        href: '/business-management/business-idea-validation?view=standalone',
        pro: true,
        badge: { text: 'Popular', className: 'bg-blue-600' },
      },
    ],
  },
  {
    category: 'Business Management',
    description: 'Tools to streamline your daily operations.',
    apps: [
        {
            icon: <LineChart className="h-8 w-8 text-primary" />,
            title: 'Insights Dashboard',
            description: 'AI-powered insights for your business.',
            href: '/business-management/insights-dashboard',
            pro: true,
        },
        {
            icon: <CheckCheck className="h-8 w-8 text-primary" />,
            title: 'Compliance Validator',
            description: 'Ensure your business complies with local regulations.',
            href: '/compliance-validator',
            pro: false,
        },
        {
            icon: <HeartHandshake className="h-8 w-8 text-primary" />,
            title: 'CRM Suite',
            description: 'Manage customers, appointments, and invoices.',
            href: '/business-management/crm-suite',
            pro: false,
        },
        {
            icon: <GanttChartSquare className="h-8 w-8 text-primary" />,
            title: 'Project & Task Manager',
            description: 'Organize projects and track tasks efficiently.',
            href: '/business-management/project-task-manager',
            pro: false,
        },
        {
            icon: <Users className="h-8 w-8 text-primary" />,
            title: 'HR System',
            description: 'Manage payroll, leave, and employee information.',
            href: '/business-management/hr-system',
            pro: false,
        },
    ]
  },
  {
    category: 'Financials',
    description: 'Manage your finances and plan for growth.',
    apps: [
        {
            icon: <CircleDollarSign className="h-8 w-8 text-primary" />,
            title: 'Startup Budget Planner',
            description: 'Map out costs and calculate your break-even point.',
            href: '/financials/startup-budget-planner?view=standalone',
            pro: true,
            badge: { text: 'HOT', className: 'bg-red-600' },
          },
          {
            icon: <Briefcase className="h-8 w-8 text-primary" />,
            title: 'Grants & Financing',
            description: 'Explore funding opportunities for your SME.',
            href: '/financials/grants-financing',
            pro: false,
          }
    ]
  },
  {
    category: 'Marketing & Ads',
    description: 'Tools to grow your audience and drive sales.',
    apps: [
        {
            icon: <Megaphone className="h-8 w-8 text-primary" />,
            title: 'Marketing Campaign Builder',
            description: 'Build and manage your marketing campaigns.',
            href: '/marketing/campaign-builder',
            pro: false,
        }
    ]
  },
  {
    category: 'Products',
    description: 'Manage your product lifecycle from sourcing to sale.',
    apps: [
        {
            icon: <Package className="h-8 w-8 text-primary" />,
            title: 'Product & Inventory',
            description: 'Track and manage your stock levels and product info.',
            href: '/products/inventory',
            pro: false,
        }
    ]
  }
];

export default function AppGalleryPage() {
    const isMounted = useMounted();

    if (!isMounted) {
      return null;
    }

  return (
    <div className="flex flex-col min-h-screen bg-background text-primary-foreground">
        <header className="sticky top-0 z-50 w-full bg-secondary/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/studioFlowLogo_1024.png" alt="BusinessStudio AI Logo" width={32} height={32} />
            <span className="text-xl font-bold">BusinessStudio AI</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="/#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm font-medium hover:text-primary">Contact</button>
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
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" placeholder="John Doe" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="message" className="text-right pt-2">
                      Message
                    </Label>
                    <Textarea id="message" placeholder="Your message..." className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Send Message</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </nav>
          <Button asChild variant="ghost">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </header>

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
                <Card className="bg-muted/30">
                <CardContent className="p-2 flex justify-center items-center">
                    <Image
                        src="https://placehold.co/970x250.png"
                        alt="Advertisement"
                        width={970}
                        height={250}
                        className="w-full h-auto rounded-md"
                        data-ai-hint="advertisement banner"
                    />
                </CardContent>
                </Card>
            </section>

            <div className="space-y-12">
                {appCategories.map((category) => (
                <section key={category.category}>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight">
                                {category.category}
                            </h2>
                            <p className="text-muted-foreground mt-1">
                                {category.description}
                            </p>
                        </div>
                        <Link href="#" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                            See all
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                    <Carousel opts={{
                        align: "start",
                        slidesToScroll: 'auto',
                    }}
                    className="w-full">
                        <CarouselContent>
                            {category.apps.map((app) => (
                                <CarouselItem key={app.title} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                                    <Link href={app.href} className="block group">
                                        <Card
                                            key={app.title}
                                            className="aspect-square flex flex-col items-center justify-center hover:border-primary transition-colors p-4 relative overflow-hidden"
                                        >
                                            {app.badge && (
                                                <div className="absolute top-0 left-0 w-24 h-24">
                                                    <div className={`absolute transform -rotate-45 text-center text-white font-semibold py-1 left-[-50px] top-[22px] w-[170px] ${app.badge.className}`}>
                                                        {app.badge.text}
                                                    </div>
                                                </div>
                                            )}
                                            <CardContent className="p-0 flex flex-col items-center text-center gap-4">
                                                <div className="relative">
                                                    {app.icon}
                                                    {app.pro && (
                                                        <div className="absolute -top-2 -right-2 text-xs font-semibold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full text-[10px]">
                                                        PRO
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm group-hover:text-primary">{app.title}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex" />
                        <CarouselNext className="hidden md:flex" />
                    </Carousel>
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
                      <Image src="/images/businessStudio_logo.png" alt="BusinessStudio AI Logo" width={200} height={50} className="w-1/2 mx-auto" />
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
