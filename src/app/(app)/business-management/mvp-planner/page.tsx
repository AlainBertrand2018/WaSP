
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowLeft,
  ChevronRight,
  CircleDollarSign,
  Download,
  FileText,
  Loader2,
  Rocket,
  Users,
  Code,
  Calendar,
  Wrench,
} from 'lucide-react';
import {
  generateMvp,
  type GenerateMvpOutput,
} from '@/ai/flows/business-management/generate-mvp-flow';
import {
  generatePrd,
  type GeneratePrdOutput,
} from '@/ai/flows/business-management/generate-prd-flow';
import Link from 'next/link';
import { useBusinessIdeaStore } from '@/store/business-idea-store';
import { generatePdf } from '@/lib/pdf-generator';

export default function MvpPlannerPage() {
  const { analysisResult, formData, set, mvpResult: storedMvpResult } = useBusinessIdeaStore(
    (state) => state
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingPrd, setIsGeneratingPrd] = useState(false);
  const [mvpResult, setMvpResult] = useState<GenerateMvpOutput | null>(storedMvpResult);

  useEffect(() => {
    // Only run generation if there's no result in the store yet
    if (!storedMvpResult && analysisResult && formData) {
      const runMvpGeneration = async () => {
        setIsLoading(true);
        setMvpResult(null);
        try {
          const result = await generateMvp({
            ...analysisResult,
            originalIdea: {
              businessIdeaTitle: formData.businessIdeaTitle,
              ideaDescription: formData.ideaDescription,
            },
          });
          setMvpResult(result);
          // Save the MVP result to the store
          set({ mvpResult: result });
        } catch (error) {
          console.error('Error generating MVP plan:', error);
          // You could show a toast here
        } finally {
          setIsLoading(false);
        }
      };
      runMvpGeneration();
    }
  }, [analysisResult, formData, set, storedMvpResult]);

  const handleGeneratePrd = async () => {
    if (!mvpResult || !analysisResult || !formData) return;
    setIsGeneratingPrd(true);
    try {
      const prdData = await generatePrd({
        validationReport: {
          ...analysisResult,
          originalIdea: {
            businessIdeaTitle: formData.businessIdeaTitle,
            ideaDescription: formData.ideaDescription,
          },
        },
        mvpPlan: mvpResult,
      });
      generatePdfFromPrd(prdData);
    } catch (error) {
      console.error('Error generating PRD:', error);
      // Handle error in UI
    } finally {
      setIsGeneratingPrd(false);
    }
  };

  const generatePdfFromPrd = (prd: GeneratePrdOutput) => {
    if (!formData) return;
    
    const content = [
      { section: '1. Introduction', text: prd.introduction },
      { section: '2. Problem Statement', text: prd.problemStatement },
      { section: '3. Goals & Objectives', text: prd.goalsAndObjectives.join('\n- ') },
      { section: '4. User Stories', text: prd.userStories.map(us => `**${us.feature}**: ${us.story}`).join('\n\n') },
      { section: '5. Technical Specifications', text: prd.technicalSpecifications },
      { section: '6. Success Metrics (KPIs)', text: prd.successMetrics.join('\n- ') },
      { section: '7. Future Considerations (Roadmap)', text: prd.futureConsiderations },
    ];

    generatePdf(
      `PRD-${formData.businessIdeaTitle.replace(/\s+/g, '-')}.pdf`,
      'Product Requirements Document (PRD)',
      content,
       {
        businessName: formData.businessIdeaTitle,
        ownerName: 'Your Name', // Placeholder
        phone: 'Your Phone', // Placeholder
        email: 'Your Email' // Placeholder
      },
      'User Name' // Placeholder
    );
  };


  if (!analysisResult || !formData) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <Rocket className="h-12 w-12 text-muted" />
        <h2 className="text-2xl font-semibold tracking-tight">
          Let's Plan Your MVP
        </h2>
        <p className="text-muted-foreground max-w-md">
          To generate a Minimum Viable Product plan, you first need to validate
          your business idea.
        </p>
        <Button asChild className="group">
          <Link href="/business-management/business-idea-validation">
            <ArrowLeft />
            <span>Validate Your Business Idea First</span>
          </Link>
        </Button>
      </div>
    );
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
          Product based on your validated idea. This might take a moment.
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
            <span>MVP Plan for: {formData?.businessIdeaTitle}</span>
          </h1>
          <p className="text-muted-foreground">
            Here's a strategic roadmap for your Minimum Viable Product.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText />
              MVP Description & Core Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
              <p className="font-semibold">Description</p>
              <p>{mvpResult.mvpDescription}</p>
              <p className="font-semibold mt-4">Core Features</p>
              <ul className="list-disc pl-5">
                {mvpResult.coreFeatures.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar />
                <span>Estimated Timeframe</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{mvpResult.timeframe}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CircleDollarSign />
                <span>Total Cost Estimation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{mvpResult.costEstimation}</p>
            </CardContent>
          </Card>
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Users />
                    <span>Required Staff</span>
                </CardTitle>
                </CardHeader>
                <CardContent>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                    {mvpResult.requiredStaff.map((staff, i) => (
                    <li key={i}>
                        {staff.role} <span className="font-semibold block">{staff.cost}</span>
                    </li>
                    ))}
                </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Code />
                    <span>Tech Stack</span>
                </CardTitle>
                </CardHeader>
                <CardContent>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                    {mvpResult.techStack.map((tech, i) => (
                    <li key={i}>
                        {tech.item} <span className="font-semibold block">{tech.cost}</span>
                    </li>
                    ))}
                </ul>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Wrench />
                    <span>Basic Equipment</span>
                </CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-xl font-bold mb-2">{mvpResult.basicEquipment.estimatedInvestment}</p>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    {mvpResult.basicEquipment.items.map((item, i) => (
                    <li key={i}>{item}</li>
                    ))}
                </ul>
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
            onClick={handleGeneratePrd}
            variant="outline"
            className="gap-2"
            disabled={isGeneratingPrd}
          >
            {isGeneratingPrd ? <Loader2 className="animate-spin" /> : <Download />}
            <span>{isGeneratingPrd ? 'Generating...' : 'Generate PRD (PDF)'}</span>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/business-management/business-idea-validation">
              <ArrowLeft />
              <span>Back to Validation</span>
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return null; // Should be covered by loading or no-data states
}
