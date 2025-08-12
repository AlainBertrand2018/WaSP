
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';

const day1Tasks = [
  'Conducting a self-assessment to create your personal entrepreneurial profile.',
  'Brainstorming 10–15 business ideas aligned with your strengths and interests.',
  'Performing a deep market research on your top three ideas.',
];

export default function Day1Page() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link href="/7-day-blueprint">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blueprint Overview
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl shrink-0">
              D1
            </div>
            <div>
              <CardTitle className="text-3xl">Day 1: Business Discovery</CardTitle>
              <CardDescription className="text-lg">Target Outcome: A market-backed idea you’re excited about.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-xl mb-4">Today's Task Flow:</h3>
              <ul className="space-y-3">
                {day1Tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-base text-muted-foreground">{task}</span>
                    </li>
                ))}
              </ul>
            </div>
            <div className="text-center py-8 bg-muted rounded-lg">
                <p className="text-muted-foreground">The interactive form for this step is coming soon!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
