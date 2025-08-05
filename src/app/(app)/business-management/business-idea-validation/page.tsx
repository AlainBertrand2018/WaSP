'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Lightbulb, Loader2 } from 'lucide-react';

const totalSteps = 5;

type FormData = {
  ideaDescription: string;
  targetMarket: string;
  uvp: string;
  monetization: string;
  budgetMarketing: string;
  budgetTech: string;
  budgetOther: string;
};

export default function BusinessIdeaValidationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    ideaDescription: '',
    targetMarket: '',
    uvp: '',
    monetization: '',
    budgetMarketing: '0',
    budgetTech: '0',
    budgetOther: '0',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // AI processing logic will go here
    console.log('Submitting data:', formData);
    // Fake delay to simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setAnalysisResult({
      summary: 'This is a placeholder for the AI analysis result.',
    }); // Placeholder
    setIsSubmitting(false);
  };
  
  const progress = (currentStep / totalSteps) * 100;

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-2xl font-semibold tracking-tight">
          Analyzing Your Idea
        </h2>
        <p className="text-muted-foreground max-w-md text-center">
          Our AI agent is performing an in-depth analysis of your business concept. This might take a moment.
        </p>
      </div>
    );
  }

  if (analysisResult) {
    return (
      <div className="flex flex-col gap-8 py-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Validation Report</h1>
          <p className="text-muted-foreground">
            Here's the AI-powered analysis of your business idea.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{analysisResult.summary}</p>
          </CardContent>
        </Card>
         <Button onClick={() => setAnalysisResult(null)}>Start Over</Button>
      </div>
    );
  }


  return (
    <div className="flex flex-col gap-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Business Idea Validation
        </h1>
        <p className="text-muted-foreground">
          Validate your next big idea with our AI-powered analysis wizard.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto w-full">
        <CardHeader>
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="min-h-[300px]">
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Describe Your Idea</h2>
                <p className="text-muted-foreground">
                  What is your business idea? Be as descriptive as possible.
                  What problem does it solve?
                </p>
                <Label htmlFor="ideaDescription" className="sr-only">Idea Description</Label>
                <Textarea
                  id="ideaDescription"
                  name="ideaDescription"
                  value={formData.ideaDescription}
                  onChange={handleInputChange}
                  placeholder="e.g., A mobile app that connects local farmers directly with consumers for fresh produce delivery..."
                  className="h-40"
                  required
                />
              </div>
            )}
            {currentStep === 2 && (
               <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Target Market</h2>
                <p className="text-muted-foreground">
                  Who are your potential customers? Describe your ideal customer persona.
                </p>
                <Label htmlFor="targetMarket" className="sr-only">Target Market</Label>
                <Textarea
                  id="targetMarket"
                  name="targetMarket"
                  value={formData.targetMarket}
                  onChange={handleInputChange}
                  placeholder="e.g., Health-conscious families in urban areas, working professionals who value convenience, restaurants sourcing local ingredients..."
                  className="h-40"
                  required
                />
              </div>
            )}
            {currentStep === 3 && (
               <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Unique Value Proposition (UVP)</h2>
                <p className="text-muted-foreground">
                  What makes your idea unique? What is your competitive advantage?
                </p>
                <Label htmlFor="uvp" className="sr-only">Unique Value Proposition</Label>
                <Textarea
                  id="uvp"
                  name="uvp"
                  value={formData.uvp}
                  onChange={handleInputChange}
                  placeholder="e.g., We offer same-day delivery, a subscription model for regular orders, and full transparency on the origin of each product..."
                  className="h-40"
                  required
                />
              </div>
            )}
            {currentStep === 4 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Monetization Plan</h2>
                  <p className="text-muted-foreground">
                    How will your business make money? Describe your pricing strategy.
                  </p>
                  <Label htmlFor="monetization" className="sr-only">Monetization Plan</Label>
                  <Textarea
                    id="monetization"
                    name="monetization"
                    value={formData.monetization}
                    onChange={handleInputChange}
                    placeholder="e.g., A 15% commission on each sale, a premium subscription for free delivery, selling featured spots to farmers..."
                    className="h-40"
                    required
                  />
                </div>
            )}
            {currentStep === 5 && (
                 <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Initial Budget Estimation</h2>
                  <p className="text-muted-foreground">
                    Provide a rough estimate of your initial costs (in Mauritian Rupees).
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="budgetMarketing">Marketing & Advertising</Label>
                        <Input
                            id="budgetMarketing"
                            name="budgetMarketing"
                            type="number"
                            value={formData.budgetMarketing}
                            onChange={handleInputChange}
                            placeholder="e.g., 50000"
                            required
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="budgetTech">Technology & Development</Label>
                        <Input
                            id="budgetTech"
                            name="budgetTech"
                            type="number"
                            value={formData.budgetTech}
                            onChange={handleInputChange}
                            placeholder="e.g., 150000"
                            required
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="budgetOther">Other (Legal, operational, etc.)</Label>
                        <Input
                            id="budgetOther"
                            name="budgetOther"
                            type="number"
                            value={formData.budgetOther}
                            onChange={handleInputChange}
                            placeholder="e.g., 25000"
                            required
                        />
                    </div>
                  </div>
                </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft />
              <span>Previous</span>
            </Button>
            {currentStep < totalSteps ? (
              <Button onClick={nextStep}>
                <span>Next</span>
                <ArrowRight />
              </Button>
            ) : (
              <Button type="submit">
                <Lightbulb />
                <span>Validate My Idea</span>
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
