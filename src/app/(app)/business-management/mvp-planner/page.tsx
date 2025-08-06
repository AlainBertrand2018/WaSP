
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
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { marked } from 'marked';

export default function MvpPlannerPage() {
  const { analysisResult, formData } = useBusinessIdeaStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingPrd, setIsGeneratingPrd] = useState(false);
  const [mvpResult, setMvpResult] = useState<GenerateMvpOutput | null>(null);

  useEffect(() => {
    const runMvpGeneration = async () => {
      if (analysisResult && formData) {
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
        } catch (error) {
          console.error('Error generating MVP plan:', error);
          // You could show a toast here
        } finally {
          setIsLoading(false);
        }
      }
    };
    runMvpGeneration();
  }, [analysisResult, formData]);

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
      generatePdf(prdData);
    } catch (error) {
      console.error('Error generating PRD:', error);
      // Handle error in UI
    } finally {
      setIsGeneratingPrd(false);
    }
  };

  const generatePdf = (prd: GeneratePrdOutput) => {
    const doc = new jsPDF();
    let y = 22; // Initial Y position

    const addText = (text: string | string[], x: number, y: number, options = {}) => {
        const finalOptions = { maxWidth: 180, align: 'justify', ...options };
        const splitText = doc.splitTextToSize(text as string, finalOptions.maxWidth);
        doc.text(splitText, x, y, finalOptions);
        return doc.getTextDimensions(splitText, finalOptions).h;
      };

    // Title
    doc.setFontSize(22);
    doc.text(
      `PRD: ${analysisResult?.originalIdea?.businessIdeaTitle || ''}`,
      14,
      y
    );
    y += 15;

    // Introduction
    doc.setFontSize(16);
    doc.text('1. Introduction', 14, y);
    y += 8;
    doc.setFontSize(10);
    y += addText(prd.introduction, 14, y) + 10;

    // Problem Statement
    doc.setFontSize(16);
    doc.text('2. Problem Statement', 14, y);
    y += 8;
    doc.setFontSize(10);
    y += addText(prd.problemStatement, 14, y) + 10;

    // Goals and Objectives
    doc.setFontSize(16);
    doc.text('3. Goals & Objectives', 14, y);
    y += 8;
    doc.setFontSize(10);
    prd.goalsAndObjectives.forEach((goal) => {
      if (y > 270) { doc.addPage(); y = 20; }
      y += addText(`- ${goal}`, 16, y) + 2;
    });
    y += 8;

    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    // User Stories
    doc.setFontSize(16);
    doc.text('4. User Stories', 14, y);
    y += 8;
    (doc as any).autoTable({
      startY: y,
      head: [['Feature', 'User Story']],
      body: prd.userStories.map((us) => [us.feature, us.story]),
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185] },
    });
    y = (doc as any).lastAutoTable.finalY + 10;

    // Technical Specifications
    if (y > 260) { doc.addPage(); y = 20; }
    doc.setFontSize(16);
    doc.text('5. Technical Specifications', 14, y);
    y += 8;
    doc.setFontSize(10);
    y += addText(prd.technicalSpecifications, 14, y) + 10;

    if (y > 260) {
        doc.addPage();
        y = 20;
    }

    // Success Metrics
    doc.setFontSize(16);
    doc.text('6. Success Metrics (KPIs)', 14, y);
    y += 8;
    doc.setFontSize(10);
    prd.successMetrics.forEach((metric) => {
       if (y > 270) { doc.addPage(); y = 20; }
      y += addText(`- ${metric}`, 16, y) + 2;
    });
    y += 8;
    
    // Future Considerations
    if (y > 260) { doc.addPage(); y = 20; }
    doc.setFontSize(16);
    doc.text('7. Future Considerations (Roadmap)', 14, y);
    y += 8;
    doc.setFontSize(10);
    addText(prd.futureConsiderations, 14, y);

    doc.save(
      `PRD-${analysisResult?.originalIdea?.businessIdeaTitle.replace(
        /\s+/g,
        '-'
      )}.pdf`
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
                <Users />
                <span>Required Staff</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-muted-foreground">
                {mvpResult.requiredStaff.map((staff, i) => (
                  <li key={i}>{staff}</li>
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
               <ul className="list-disc pl-5 text-muted-foreground">
                {mvpResult.techStack.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CircleDollarSign />
                <span>Cost Estimation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{mvpResult.costEstimation}</p>
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
