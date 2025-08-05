
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowRight,
  ChevronRight,
  ClipboardCheck,
  Download,
  FileText,
  Lightbulb,
  Loader2,
  Rocket,
  Users,
  Code,
  Calendar,
  CircleDollarSign
} from 'lucide-react';
import {
  generateMvp,
  type GenerateMvpOutput,
} from '@/ai/flows/business-management/generate-mvp-flow';
import Link from 'next/link';

export default function MvpPlannerPage() {
  const [businessIdea, setBusinessIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mvpResult, setMvpResult] = useState<GenerateMvpOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessIdea) return;
    setIsLoading(true);
    setMvpResult(null);
    try {
      const result = await generateMvp({ validatedBusinessIdea: businessIdea });
      setMvpResult(result);
    } catch (error) {
      console.error('Error generating MVP plan:', error);
      // You could show a toast here
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setBusinessIdea('');
    setMvpResult(null);
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-2xl font-semibold tracking-tight">
          Building Your MVP Plan
        </h2>
        <p className="text-muted-foreground max-w-md text-center">
          Our AI agent is crafting a detailed plan for your Minimum Viable
          Product. This might take a moment.
        </p>
      </div>
    );
  }

  if (mvpResult) {
    return (
      <div className="flex flex-col gap-8 py-8 max-w-4xl mx-auto">
         <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Rocket />
            <span>MVP Plan</span>
          </h1>
          <p className="text-muted-foreground">
            Here's a strategic roadmap for your Minimum Viable Product.
          </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                    <FileText/>
                    MVP Description & Core Features
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap'>
                    <p className='font-semibold'>Description</p>
                    <p>{mvpResult.mvpDescription}</p>
                    <p className='font-semibold mt-4'>Core Features</p>
                    <ul className='list-disc pl-5'>
                        {mvpResult.coreFeatures.map((feature, i) => <li key={i}>{feature}</li>)}
                    </ul>
                </div>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-lg'>
                        <Calendar />
                        <span>Estimated Timeframe</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='text-3xl font-bold'>{mvpResult.timeframe}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-lg'>
                        <Users />
                        <span>Required Staff</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='text-3xl font-bold'>{mvpResult.requiredStaff}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-lg'>
                        <Code />
                        <span>Tech Stack</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='text-muted-foreground whitespace-pre-wrap'>{mvpResult.techStack}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-lg'>
                        <CircleDollarSign />
                        <span>Cost Estimation</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <p className='text-3xl font-bold'>{mvpResult.costEstimation}</p>
                </CardContent>
            </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 border-t mt-4">
          <Button asChild className="group">
            <Link href="/financials/startup-budget-planner">
              <span>Go to Startup Budget Planner</span>
              <ChevronRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="gap-2"
          >
            <Download />
            <span>Generate PRD (PDF)</span>
          </Button>
          <Button onClick={resetForm} variant="ghost">
            Start Over
          </Button>
        </div>

      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">MVP Planner</h1>
        <p className="text-muted-foreground">
          Define the core features of your Minimum Viable Product.
        </p>
      </div>

      <Card className="w-full max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb />
              Your Validated Business Idea
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={businessIdea}
              onChange={(e) => setBusinessIdea(e.target.value)}
              placeholder="Paste the 'Overall Assessment' and 'What I would do differently' sections from your validation report here. For best results, include the business title, description, and products/services."
              className="h-48"
              required
            />
          </CardContent>
          <CardContent>
            <Button type="submit" disabled={isLoading} className="w-full">
              <Rocket className="mr-2" />
              Generate MVP Plan
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
