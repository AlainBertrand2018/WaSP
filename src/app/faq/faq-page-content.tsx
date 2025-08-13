
'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { generateFaq } from '@/ai/flows/marketing/generate-faq-flow';
import { HelpCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useMounted } from '@/hooks/use-mounted';
import { MainHeader } from '@/components/layout/main-header';

export default function FaqPageContent() {
  const [faqs, setFaqs] = React.useState<{ question: string; answer: string }[]>([]);
  const isMounted = useMounted();

  React.useEffect(() => {
    generateFaq().then(result => setFaqs(result.faqs));
  }, []);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  
  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-primary-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MainHeader />

      <main className="flex-1 bg-secondary-darker">
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <HelpCircle className="text-primary h-8 w-8" />
                Frequently Asked Questions
              </h1>
              <p className="text-muted-foreground">
                Find answers to common questions about BusinessStudio AI.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full bg-card p-4 sm:p-8 rounded-lg">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
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
                        <Label htmlFor="name-footer" className="text-right">Name</Label>
                        <Input id="name-footer" placeholder="John Doe" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email-footer" className="text-right">Email</Label>
                        <Input id="email-footer" type="email" placeholder="john@example.com" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="message-footer" className="text-right pt-2">Message</Label>
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
