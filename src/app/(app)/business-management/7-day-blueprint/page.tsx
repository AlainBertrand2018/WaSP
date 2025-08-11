
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Rocket, ArrowRight } from 'lucide-react';
import React from 'react';

const blueprintDays = [
  {
    day: 1,
    title: 'Business Discovery',
    tasks: [
      'Run a self-assessment with your LLM to create a personal entrepreneurial profile.',
      'Brainstorm 10–15 AI-powered business ideas matched to your strengths.',
      'Conduct deep market research on your top 1–3 ideas.',
    ],
    outcome: 'A market-backed idea you’re excited about.',
  },
  {
    day: 2,
    title: 'Define Your Business Foundation',
    tasks: [
      'Craft a clear value proposition (max 5 points, benefits-focused).',
      'Build 2–3 customer personas with demographics, values, and buying behavior.',
      'Map the customer journey from awareness to loyalty.',
    ],
    outcome: 'A blueprint of who you serve, why it matters, and the customer experience.',
  },
  {
    day: 3,
    title: 'Brand Identity Development',
    tasks: [
      'Develop brand identity: name, tagline, tone of voice.',
      'Create visual elements: logo, colors, typography, style guide.',
      'Write your positioning statement, key messages, and unique selling points.',
    ],
    outcome: 'A brand that communicates value instantly.',
  },
  {
    day: 4,
    title: 'Designing Your Offer',
    tasks: [
      'Define the offer: deliverables, problem solved, transformation delivered.',
      'Create mockups, service blueprints, or wireframes.',
      'Set value-based pricing tiers.',
    ],
    outcome: 'A clear, visual, outcome-driven offer.',
  },
  {
    day: 5,
    title: 'Building Your Business Engine',
    tasks: [
      'Map all core processes from lead generation to delivery.',
      'Identify automation opportunities using AI and low-code tools.',
      'Create reusable branded templates (contracts, proposals, onboarding docs).',
    ],
    outcome: 'A scalable, efficient operational system.',
  },
  {
    day: 6,
    title: 'Customer Acquisition',
    tasks: [
      'Develop a marketing strategy based on audience habits.',
      'Create a 30-day content plan with content pillars and posting cadence.',
      'Build a lead generation funnel from lead magnet to sales close.',
    ],
    outcome: 'A repeatable system for attracting and converting leads.',
  },
  {
    day: 7,
    title: 'Launch Preparation',
    tasks: [
      'Plan a 30-day launch sequence (pre-launch, soft launch, full launch).',
      'Create 3-month financial projections including break-even analysis.',
      'Draft a personalized outreach plan for warm leads and partners.',
    ],
    outcome: 'A complete plan, projections, and outreach strategy for launch.',
  },
];

export default function SevenDayBlueprintPage() {
  return (
    <div className="flex flex-col gap-12 py-8 md:py-12 max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          The 7-Day Business Blueprint
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Your intensive, one-week guided sprint to go from a raw idea to a fully-formed, launch-ready business plan. Let's build your future, together.
        </p>
        <Button size="lg" className="mt-8 group" disabled>
          <span>Start Your 7-Day Blueprint</span>
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </Button>
         <p className="text-sm text-muted-foreground mt-2">(Coming Soon)</p>
      </section>

      {/* Blueprint Steps Section */}
      <section>
        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-9 top-0 w-px h-full bg-border" aria-hidden="true" />
          
          <div className="space-y-12">
            {blueprintDays.map((day, index) => (
              <div key={day.day} className="md:grid md:grid-cols-[auto,1fr] md:gap-x-8 items-start">
                <div className="relative flex items-center justify-center">
                    <div className="hidden md:flex w-20 h-20 bg-card border-4 border-primary rounded-full items-center justify-center text-primary font-bold text-2xl z-10">
                        {`D${day.day}`}
                    </div>
                     <div className="md:hidden flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl z-10">
                            {`D${day.day}`}
                        </div>
                         <h2 className="text-2xl font-bold md:hidden">{day.title}</h2>
                    </div>
                </div>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="hidden md:block">{day.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2">Tasks for Today:</h3>
                            <ul className="space-y-2">
                                {day.tasks.map((task, taskIndex) => (
                                    <li key={taskIndex} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span className="text-muted-foreground">{task}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div className="bg-muted p-4 rounded-md">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Rocket className="h-5 w-5 text-accent" />
                                <span>Day {day.day} Outcome</span>
                            </h3>
                            <p className="text-muted-foreground mt-2">{day.outcome}</p>
                        </div>
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
