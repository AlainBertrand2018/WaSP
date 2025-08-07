
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  ChevronRight,
  FileText,
  Lightbulb,
  Rocket,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const steps = [
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: '1. Validate Your Idea',
    description:
      'Start with our AI-powered validation to assess your business idea against the Mauritian market, analyzing its viability, potential, and weaknesses.',
    href: '/business-management/business-idea-validation',
  },
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: '2. Plan Your MVP',
    description:
      'Define the core features, required staff, and technology for your Minimum Viable Product to get to market quickly and efficiently.',
    href: '/business-management/mvp-planner',
  },
  {
    icon: <Wallet className="h-8 w-8 text-primary" />,
    title: '3. Create Your Budget',
    description:
      'Use our AI-driven planner to map out your startup costs, fixed and variable expenses, and calculate your crucial break-even point.',
    href: '/financials/startup-budget-planner',
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: '4. Generate Your Business Plan',
    description:
      'Synthesize all your data into a comprehensive, investor-ready business plan that you can edit and export for funding applications.',
    href: '/business-management/business-plan-generator',
  },
];

const benefits = [
    {
        title: "Data-Driven Decisions",
        description: "Move beyond guesswork. Leverage AI analysis of the Mauritian market to make informed strategic choices.",
    },
    {
        title: "Investor-Ready Output",
        description: "Generate professional, comprehensive documents, from validation reports to a full business plan, designed to impress funders.",
    },
    {
        title: "Speed & Efficiency",
        description: "Condense weeks of research and planning into a few guided sessions, freeing you to focus on building your business.",
    }
]

export default function BusinessCreationLandingPage() {
  return (
    <div className="flex flex-col gap-12 py-8 md:py-12">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          From a Spark of an Idea to an Investor-Ready Business Plan
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Our AI-powered Business Creation suite guides you through every critical
          step of launching your venture in Mauritius. Validate, plan, budget,
          and generate your professional business plan with confidence.
        </p>
        <Button asChild size="lg" className="mt-8 group">
          <Link href="/business-management/business-idea-validation">
            <span>Let's Get Started</span>
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </section>

      {/* Benefits Section */}
      <section>
          <h2 className="text-3xl font-bold text-center">Why Use This Toolkit?</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                  <Card key={benefit.title} className="text-center">
                      <CardHeader>
                          <CardTitle>{benefit.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-muted-foreground">{benefit.description}</p>
                      </CardContent>
                  </Card>
              ))}
          </div>
      </section>

      {/* Steps Section */}
      <section>
        <h2 className="text-3xl font-bold text-center">
          Your 4-Step Path to a Business Plan
        </h2>
        <div className="relative mt-8">
          {/* Dashed line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-transparent">
             <div className="absolute top-1/2 left-0 w-full h-px bg-border-dashed" style={{
                 background: `repeating-linear-gradient(to right, hsl(var(--border)), hsl(var(--border)) 4px, transparent 4px, transparent 8px))`
             }}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative flex flex-col items-center">
                 <Card className="w-full h-full">
                  <CardHeader className="items-center">{step.icon}</CardHeader>
                  <CardContent className="text-center">
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
