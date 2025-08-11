
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
      'Conducting a self-assessment to create your personal entrepreneurial profile.',
      'Brainstorming 10–15 business ideas aligned with your strengths and interests.',
      'Performing a deep market research on your top three ideas.',
    ],
    outcome: 'A market-backed idea you’re excited about.',
  },
  {
    day: 2,
    title: 'Business Foundation',
    tasks: [
      'Define a clear value proposition with a maximum of five benefits-focused points.',
      'Design 2–3 detailed customer personas including demographics, values, and purchase behaviors.',
      'Map the customer journey from awareness to loyalty.',
    ],
    outcome: 'A solid understanding of your audience, value, and positioning.',
  },
  {
    day: 3,
    title: 'Brand Identity Development',
    tasks: [
      'Creating your brand identity: name, tagline, and tone of voice.',
      'Designing visual elements: logo, color palette, typography, and style guide.',
      'Writing your positioning statement, key messages, and unique selling points.',
    ],
    outcome: 'A brand that communicates value instantly.',
  },
  {
    day: 4,
    title: 'Designing the Offer',
    tasks: [
      'Defining your offer: deliverables, problem solved, and transformation delivered.',
      'Creating mockups, service blueprints, or wireframes.',
      'Setting value-based pricing tiers.',
    ],
    outcome: 'A clear, visual, outcome-driven offer.',
  },
  {
    day: 5,
    title: 'Building the Business Engine',
    tasks: [
      'Mapping all core processes from lead generation to delivery.',
      'Identifying automation opportunities to save time and reduce manual work.',
      'Creating reusable templates for key business documents and workflows.',
    ],
    outcome: 'A scalable, efficient operational system.',
  },
  {
    day: 6,
    title: 'Customer Acquisition',
    tasks: [
      'Developping a marketing strategy based on audience habits and preferred channels.',
      'Creating a 30-day content plan with content pillars and posting cadence.',
      'Building a lead generation strategy from lead magnet to sales conversion.',
    ],
    outcome: 'A repeatable system for attracting and converting leads.',
  },
  {
    day: 7,
    title: 'Launch Preparation',
    tasks: [
      'Planning a 30-day launch sequence (pre-launch, soft launch, full launch).',
      'Creating 3-month financial projections, including break-even analysis.',
      'Drafting a personalized outreach plan for warm leads and partners.',
    ],
    outcome: 'A complete plan, projections, and outreach strategy for launch.',
  },
];

export default function SevenDayBlueprintPage() {
  return (
    <div className="flex flex-col gap-12 py-8 md:py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          The 7-Day Blueprint
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Turning your idea into a market-ready business in just one week.
        </p>
        <Button size="lg" className="mt-8 group" disabled>
          <span>Start Your 7-Day Blueprint</span>
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </Button>
         <p className="text-sm text-muted-foreground mt-2">(Coming Soon)</p>
      </section>

      {/* Blueprint Steps Section - Horizontal Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blueprintDays.map((day) => (
              <Card key={day.day} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0">
                          {`D${day.day}`}
                      </div>
                      <div>
                          <CardTitle>{day.title}</CardTitle>
                      </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                    <div>
                        <h3 className="font-semibold mb-2 text-sm">Task Flow:</h3>
                        <ul className="space-y-2">
                            {day.tasks.map((task, taskIndex) => (
                                <li key={taskIndex} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                    <span className="text-sm text-muted-foreground">{task}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
                <CardDescription className="p-6 pt-0">
                    <div className="bg-muted p-4 rounded-md">
                        <h3 className="font-semibold flex items-center gap-2 text-sm">
                            <Rocket className="h-5 w-5 text-accent" />
                            <span>Target Outcome</span>
                        </h3>
                        <p className="text-muted-foreground mt-2 text-sm">{day.outcome}</p>
                    </div>
                </CardDescription>
              </Card>
            ))}
        </div>
      </section>
    </div>
  );
}
