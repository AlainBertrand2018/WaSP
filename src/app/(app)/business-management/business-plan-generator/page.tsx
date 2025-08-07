
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowLeft,
  Download,
  FileText,
  Loader2,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { useBusinessIdeaStore } from '@/store/business-idea-store';
import { useBudgetPlannerStore } from '@/store/budget-planner-store';
import {
  generateBusinessPlan,
  type GenerateBusinessPlanOutput,
} from '@/ai/flows/business-management/generate-business-plan-flow';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { toast } from '@/hooks/use-toast';

// A mapping from schema keys to user-friendly titles
const sectionTitles: { [key in keyof GenerateBusinessPlanOutput]: string } = {
  executiveSummary: '1. Executive Summary',
  companyDescription: '2. Company Description',
  marketAnalysis: '3. Market Analysis',
  marketingPlan: '4. Marketing Plan',
  salesPlan: '5. Sales Plan',
  competitiveAnalysis: '6. Competitive Analysis',
  organizationalStructure: '7. Organizational Structure',
  productsAndServices: '8. Products and Services',
  operatingPlan: '9. Operating Plan',
  financialPlan: '10. Financial Plan',
  fundingSources: '11. Funding Sources',
  swotAnalysis: '12. SWOT Analysis',
  financialDocuments: '13. Financial Documents',
};

export default function BusinessPlanGeneratorPage() {
  const { analysisResult, formData, mvpResult } = useBusinessIdeaStore();
  const budgetState = useBudgetPlannerStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [businessPlan, setBusinessPlan] = useState<GenerateBusinessPlanOutput | null>(null);

  useEffect(() => {
    const runGeneration = async () => {
      if (analysisResult && formData && mvpResult && budgetState.summary) {
        setIsLoading(true);
        try {
          const result = await generateBusinessPlan({
            validationReport: {
              ...analysisResult,
              originalIdea: {
                businessIdeaTitle: formData.businessIdeaTitle,
                ideaDescription: formData.ideaDescription,
              },
            },
            mvpPlan: mvpResult,
            budgetSummary: {
                ...budgetState,
                salePricePerUnit: budgetState.salePrice,
            },
          });
          setBusinessPlan(result);
        } catch (error) {
          console.error('Error generating business plan:', error);
          toast({
            title: 'Error Generating Plan',
            description: 'There was an issue creating your business plan. Please try again.',
            variant: 'destructive',
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    runGeneration();
  }, [analysisResult, formData, mvpResult, budgetState]);

  const handleContentChange = (
    section: keyof GenerateBusinessPlanOutput,
    value: string
  ) => {
    setBusinessPlan((prev) => (prev ? { ...prev, [section]: value } : null));
  };
  
const handleDownloadPdf = () => {
  if (!businessPlan || !formData) return;
  setIsGeneratingPdf(true);

  try {
    const doc = new jsPDF('p', 'pt', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    let y = margin;

    const addWrappedText = (text: string, x: number, y: number, options?: any) => {
      const { font, fontSize, fontStyle, maxWidth } = {
        font: 'helvetica',
        fontSize: 10,
        fontStyle: 'normal',
        maxWidth: pageWidth - margin * 2,
        ...options,
      };
      doc.setFont(font, fontStyle);
      doc.setFontSize(fontSize);

      const lines = doc.splitTextToSize(text, maxWidth);
      
      const textHeight = lines.length * fontSize * 1.2;

      if (y + textHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      
      doc.text(lines, x, y, { lineHeightFactor: 1.2 });
      return y + textHeight;
    };
    

    // Title Page
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.text('Business Plan', pageWidth / 2, pageHeight / 3, { align: 'center' });
    doc.setFontSize(24);
    doc.setFont('helvetica', 'normal');
    doc.text(formData.businessIdeaTitle, pageWidth / 2, pageHeight / 3 + 40, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight / 3 + 80, { align: 'center' });

    // Add each section
    for (const [key, title] of Object.entries(sectionTitles)) {
      const content = businessPlan[key as keyof GenerateBusinessPlanOutput];
      if (content) {
        doc.addPage();
        y = margin;
        
        y = addWrappedText(title, margin, y, { fontSize: 16, fontStyle: 'bold' });
        y += 10;
        addWrappedText(content, margin, y, { fontSize: 11 });
      }
    }

    doc.save(`Business-Plan-${formData.businessIdeaTitle.replace(/\s+/g, '-')}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast({
      title: 'PDF Generation Failed',
      description: 'There was an error creating the PDF document.',
      variant: 'destructive',
    });
  } finally {
    setIsGeneratingPdf(false);
  }
};


  if (!analysisResult || !formData || !mvpResult || !budgetState.summary) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <Wallet className="h-12 w-12 text-muted" />
        <h2 className="text-2xl font-semibold tracking-tight">
          Ready to Build Your Business Plan?
        </h2>
        <p className="text-muted-foreground max-w-md">
          To generate a full business plan, you need to complete all the previous
          "Business Creation" steps first.
        </p>
        <Button asChild className="group">
          <Link href="/business-management/business-idea-validation">
            <ArrowLeft />
            <span>Start with Business Idea Validation</span>
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
          Drafting Your Business Plan
        </h2>
        <p className="text-muted-foreground max-w-md text-center">
          Our AI business consultant is synthesizing your data and writing a
          professional business plan. This may take a minute.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 py-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                    <FileText />
                    Business Plan Editor: {formData.businessIdeaTitle}
                </CardTitle>
                <CardDescription>
                    Here is the AI-generated first draft of your business plan. Review each section, make any necessary edits, and then download the final document.
                </CardDescription>
              </div>
              <Button onClick={handleDownloadPdf} disabled={isGeneratingPdf} className="gap-2 shrink-0">
                {isGeneratingPdf ? <Loader2 className="animate-spin" /> : <Download />}
                <span>{isGeneratingPdf ? 'Generating...' : 'Download as PDF'}</span>
              </Button>
          </div>
        </CardHeader>
        <CardContent>
          {businessPlan ? (
            <Accordion type="single" collapsible className="w-full" defaultValue="executiveSummary">
              {Object.entries(sectionTitles).map(([key, title]) => (
                <AccordionItem value={key} key={key}>
                  <AccordionTrigger>{title}</AccordionTrigger>
                  <AccordionContent>
                    <Textarea
                      value={businessPlan[key as keyof GenerateBusinessPlanOutput]}
                      onChange={(e) =>
                        handleContentChange(
                          key as keyof GenerateBusinessPlanOutput,
                          e.target.value
                        )
                      }
                      className="h-64 text-base"
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
             <p className="text-muted-foreground text-center">Could not generate a business plan. Please ensure all previous steps are complete.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
