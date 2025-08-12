
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  BrainCircuit,
  Lightbulb,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Spline from '@splinetool/react-spline';

const steps = [
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: '1. Define Your Profile',
    description:
      "Start by telling our AI about your skills, passions, and budget. This creates a personalized foundation for brainstorming.",
    href: '/ideation/brainstorming',
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: '2. Get AI-Powered Hints',
    description:
      'Receive a list of promising sectors tailored to you, complete with market size, value, and pricing estimates.',
    href: '/ideation/brainstorming',
  },
];

const benefits = [
    {
        title: "Highly Personalized",
        description: "Ideas are generated based on your unique skills, interests, and financial capacity, increasing your chance of success.",
    },
    {
        title: "Data-Driven Suggestions",
        description: "Go beyond generic ideas with quantitative estimates on market size and value based on real-world analysis.",
    },
    {
        title: "Explore New Horizons",
        description: "Discover lucrative sectors and opportunities within the Mauritian market that you may not have considered.",
    }
]

export default function IdeationLandingPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section with Spline Background */}
      <section className="relative w-full h-screen flex items-center justify-center text-center" style={{ backgroundColor: '#121212' }}>
        <div className="absolute top-0 left-0 w-full h-full z-0">
             <Spline scene="https://prod.spline.design/FKmWkI9k5Dkb9cLz/scene.splinecode" />
        </div>
        <div className="relative z-10 p-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Find Your Perfect Business Idea
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Our AI Ideation suite helps you move from self-assessment to a curated list of personalized, data-driven business ideas tailored for the Mauritian market.
            </p>
            <Button asChild size="lg" className="mt-8 group">
            <Link href="/ideation/brainstorming">
                <span>Start Brainstorming</span>
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            </Button>
        </div>
      </section>

      <div className='px-8'>
        {/* Benefits Section */}
        <section className="py-8 md:py-12">
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
        <section className="py-8 md:py-12">
          <h2 className="text-3xl font-bold text-center">
            Your 2-Step Path to a Great Idea
          </h2>
          <div className="relative mt-8 max-w-4xl mx-auto">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-transparent">
              <div className="absolute top-1/2 left-0 w-full h-px bg-border-dashed" style={{
                  background: `repeating-linear-gradient(to right, hsl(var(--border)), hsl(var(--border)) 4px, transparent 4px, transparent 8px))`
              }}></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {steps.map((step) => (
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

        {/* Final CTA Section */}
        <section className="text-center border-t pt-12 mt-4">
          <h2 className="text-3xl font-bold">
            Ready to Discover Your Next Venture?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            The first step to a successful business is finding an idea that truly fits you. Let's get started.
          </p>
          <Button asChild size="lg" className="mt-8 group">
            <Link href="/ideation/brainstorming">
              <span>Start the Brainstorming Tool</span>
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
