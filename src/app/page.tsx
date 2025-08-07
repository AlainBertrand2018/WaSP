import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, LayoutGrid, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const featureCards = [
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    title: 'Fast & Efficient',
    description: 'Generate comprehensive business plans and documents in minutes, not weeks.',
  },
  {
    icon: <LayoutGrid className="h-8 w-8 text-accent" />,
    title: 'All-in-One Suite',
    description: 'From idea validation to financial planning, get all the tools you need under one roof.',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-accent" />,
    title: 'Data-Driven Insights',
    description: 'Leverage AI analysis of the Mauritian market to make smarter business decisions.',
  },
    {
    icon: <LayoutGrid className="h-8 w-8 text-accent" />,
    title: 'Investor-Ready',
    description: 'Produce professional, investor-ready documents to secure funding for your venture.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-primary-foreground">
      <header className="sticky top-0 z-50 w-full bg-secondary/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <LayoutGrid className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">StudioFlow AI</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <Button asChild variant="ghost">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary">
          <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-20 text-center md:grid-cols-2 md:text-left lg:py-32">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                The Future of Business Creation is Here
              </h1>
              <p className="max-w-xl text-lg text-primary-foreground/80">
                StudioFlow AI is your unified command center for launching and managing your business in Mauritius. Leverage our AI-powered suite to go from idea to investor-ready, faster than ever before.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-secondary-foreground">
                  <Link href="/signup">Get Started For Free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#">Learn More</Link>
                </Button>
              </div>
            </div>
            <div>
              <Image
                src="https://placehold.co/600x400.png"
                width={600}
                height={400}
                alt="App Mockup"
                data-ai-hint="app mockup"
                className="mx-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-secondary py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                An Unfair Advantage for Entrepreneurs
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/70">
                Condense weeks of research, planning, and paperwork into a few guided sessions. Our AI agents are trained to help you succeed.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {featureCards.map((feature) => (
                <Card key={feature.title} className="bg-background/5 text-primary-foreground">
                  <CardHeader>
                    {feature.icon}
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary-foreground/70">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Brilliant Tools Section */}
        <section className="bg-secondary py-20 lg:py-32">
            <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
                <div>
                     <Image
                        src="https://placehold.co/550x550.png"
                        width={550}
                        height={550}
                        alt="Tool Illustrations"
                        data-ai-hint="abstract tool illustration"
                        className="mx-auto rounded-lg"
                    />
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Brilliant tools that get you results</h2>
                    <p className="text-lg text-primary-foreground/70">
                        From validating your business idea against the local market to generating a full-fledged financial plan and investor-ready business plan, our suite is designed to give you the clarity and confidence to launch.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="h-6 w-6 flex-shrink-0 text-accent" />
                            <span><span className="font-semibold">Idea Validation:</span> Get AI-powered feedback on your concept's viability in Mauritius.</span>
                        </li>
                         <li className="flex items-start gap-3">
                            <CheckCircle className="h-6 w-6 flex-shrink-0 text-accent" />
                            <span><span className="font-semibold">MVP & Budget Planning:</span> Map out your product, costs, and break-even point with precision.</span>
                        </li>
                         <li className="flex items-start gap-3">
                            <CheckCircle className="h-6 w-6 flex-shrink-0 text-accent" />
                            <span><span className="font-semibold">Full Business Plan:</span> Synthesize all your work into a single, professional document ready for funding.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        {/* Pricing Section */}
        <section className="bg-secondary py-20 lg:py-32">
            <div className="container mx-auto px-4 text-center">
                 <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Pricing Plans</h2>
                 <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/70">
                    Choose a plan that scales with your ambition. Start for free and upgrade as your business grows.
                 </p>
                 <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                     {/* Free Plan */}
                     <Card className="bg-background/5 text-primary-foreground p-6 flex flex-col">
                         <CardHeader>
                            <CardTitle>Free</CardTitle>
                            <p className="text-4xl font-bold mt-2">MUR 0<span className="text-lg font-normal text-primary-foreground/70">/month</span></p>
                         </CardHeader>
                         <CardContent className="flex-grow space-y-4 text-left">
                            <p>For individuals and hobbyists starting out.</p>
                             <ul className="space-y-2">
                                <li className="flex items-center gap-2"><CheckCircle className="text-accent h-5 w-5"/> 1 Business Project</li>
                                <li className="flex items-center gap-2"><CheckCircle className="text-accent h-5 w-5"/> Idea Validation</li>
                                <li className="flex items-center gap-2"><CheckCircle className="text-accent h-5 w-5"/> Basic Reporting</li>
                             </ul>
                         </CardContent>
                         <Button variant="outline" className="w-full mt-6">Get Started</Button>
                     </Card>
                     {/* Pro Plan */}
                     <Card className="bg-primary text-primary-foreground p-6 flex flex-col ring-2 ring-accent">
                         <CardHeader>
                            <CardTitle>Pro</CardTitle>
                            <p className="text-4xl font-bold mt-2">MUR 1,500<span className="text-lg font-normal text-primary-foreground/70">/month</span></p>
                         </CardHeader>
                         <CardContent className="flex-grow space-y-4 text-left">
                            <p>For serious entrepreneurs and startups.</p>
                             <ul className="space-y-2">
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5"/> 5 Business Projects</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5"/> Full Business Creation Suite</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5"/> Financial Planning Tools</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5"/> Advanced Reporting</li>
                             </ul>
                         </CardContent>
                         <Button className="w-full mt-6 bg-accent hover:bg-accent/90 text-secondary-foreground">Choose Pro</Button>
                     </Card>
                     {/* Enterprise Plan */}
                     <Card className="bg-background/5 text-primary-foreground p-6 flex flex-col">
                         <CardHeader>
                            <CardTitle>Enterprise</CardTitle>
                             <p className="text-4xl font-bold mt-2">Contact Us</p>
                         </CardHeader>
                         <CardContent className="flex-grow space-y-4 text-left">
                            <p>For established businesses and agencies.</p>
                             <ul className="space-y-2">
                                <li className="flex items-center gap-2"><CheckCircle className="text-accent h-5 w-5"/> Unlimited Projects</li>
                                <li className="flex items-center gap-2"><CheckCircle className="text-accent h-5 w-5"/> All Pro Features</li>
                                <li className="flex items-center gap-2"><CheckCircle className="text-accent h-5 w-5"/> Dedicated Support</li>
                                <li className="flex items-center gap-2"><CheckCircle className="text-accent h-5 w-5"/> Custom Integrations</li>
                             </ul>
                         </CardContent>
                         <Button variant="outline" className="w-full mt-6">Contact Sales</Button>
                     </Card>
                 </div>
            </div>
        </section>

      </main>

      <footer className="bg-secondary-foreground text-background">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-12 md:grid-cols-5">
            <div className="col-span-2 md:col-span-1">
                 <Link href="/" className="flex items-center gap-2">
                    <LayoutGrid className="h-8 w-8 text-primary" />
                    <span className="text-xl font-bold">StudioFlow AI</span>
                </Link>
                <p className="mt-4 text-sm text-background/60">The future of business creation.</p>
            </div>
            <div>
                <h4 className="font-semibold">Product</h4>
                <ul className="mt-4 space-y-2 text-sm">
                    <li><Link href="#" className="text-background/60 hover:text-background">Features</Link></li>
                    <li><Link href="#" className="text-background/60 hover:text-background">Pricing</Link></li>
                    <li><Link href="#" className="text-background/60 hover:text-background">Updates</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold">Company</h4>
                <ul className="mt-4 space-y-2 text-sm">
                    <li><Link href="#" className="text-background/60 hover:text-background">About</Link></li>
                    <li><Link href="#" className="text-background/60 hover:text-background">Careers</Link></li>
                    <li><Link href="#" className="text-background/60 hover:text-background">Contact</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold">Resources</h4>
                <ul className="mt-4 space-y-2 text-sm">
                    <li><Link href="#" className="text-background/60 hover:text-background">Blog</Link></li>
                    <li><Link href="#" className="text-background/60 hover:text-background">Help Center</Link></li>
                    <li><Link href="#" className="text-background/60 hover:text-background">Privacy Policy</Link></li>
                </ul>
            </div>
             <div>
                <h4 className="font-semibold">Social</h4>
                <ul className="mt-4 space-y-2 text-sm">
                    <li><Link href="#" className="text-background/60 hover:text-background">Twitter</Link></li>
                    <li><Link href="#" className="text-background/60 hover:text-background">LinkedIn</Link></li>
                    <li><Link href="#" className="text-background/60 hover:text-background">Facebook</Link></li>
                </ul>
            </div>
        </div>
        <div className="container mx-auto border-t border-background/10 px-4 py-6 text-center text-sm text-background/60">
           © 2024 StudioFlow AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
