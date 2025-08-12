
'use client';

import { useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  CircleDollarSign,
  Download,
  Feather,
  FileText,
  Lightbulb,
  Loader2,
  PlusCircle,
  RefreshCcw,
  Sparkles,
  Target,
  Trash2,
  Users,
  Wand2,
} from 'lucide-react';
import { validateBusinessIdea } from '@/ai/flows/business-management/validate-idea-flow';
import type { ValidateBusinessIdeaOutput } from '@/ai/flows/business-management/validate-idea-schema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { generateMarketSize } from '@/ai/flows/business-management/generate-market-size-flow';
import ViabilityMeter from '@/components/feature/viability-meter';
import Link from 'next/link';
import { useBusinessIdeaStore } from '@/store/business-idea-store';
import { Skeleton } from '@/components/ui/skeleton';
import { generatePdf } from '@/lib/pdf-generator';


const totalSteps = 7;

const industryOptions = [
  'Tourism & Hospitality',
  'Financial Services & FinTech',
  'Information Technology & BPO',
  'Software',
  'Real Estate & Construction',
  'Retail & E-commerce',
  'Agriculture & Agri-tech',
  'Healthcare & Wellness',
  'Education & Ed-tech',
  'Manufacturing',
  'Logistics & Transportation',
  'Other',
];

const sectorTargetOptions = ['B2B', 'B2C', 'B2C2B', 'SME', 'Pre-seed', 'Seed'];

type MarketPotential = {
  potentialCustomers: string;
  sources: string[];
  explanation: string;
};

type FormData = {
  businessIdeaTitle: string;
  sector: string;
  otherSector: string;
  sectorTarget: string;
  ideaDescription: string;
  customerProfile: string;
  marketSize: string; // This will now be derived from marketPotential for the final submission
  marketPotential: MarketPotential | null;
  productType: string;
  products: { name: string }[];
  startingBudget: string;
  monetization: string;
};

function BusinessIdeaValidationContent() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  const isStandalone = view === 'standalone';

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    businessIdeaTitle: '',
    sector: '',
    otherSector: '',
    sectorTarget: '',
    ideaDescription: '',
    customerProfile: '',
    marketSize: '',
    marketPotential: null,
    productType: '',
    products: [{ name: '' }],
    startingBudget: '',
    monetization: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingMarketSize, setIsGeneratingMarketSize] = useState(false);
  const [ideaSummary, setIdeaSummary] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<ValidateBusinessIdeaOutput | null>(null);

  const setStore = useBusinessIdeaStore((state) => state.set);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index: number, value: string) => {
    const newProducts = [...formData.products];
    newProducts[index].name = value;
    setFormData((prev) => ({ ...prev, products: newProducts }));
  };

  const addProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { name: '' }],
    }));
  };

  const removeProduct = (index: number) => {
    const newProducts = formData.products.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, products: newProducts }));
  };

  const handleNextStep = () => {
    if (currentStep === 6) {
      // Transitioning to step 7, generate summary.
      const finalSector =
        formData.sector === 'Other' ? formData.otherSector : formData.sector;
      const marketSize =
        formData.marketPotential?.potentialCustomers || 'Not estimated';

      const summary = `Your business idea, "${formData.businessIdeaTitle}", operates in the ${finalSector} sector, targeting the ${formData.sectorTarget} market. 
      
You described it as: "${formData.ideaDescription}".

Your target customer is: "${formData.customerProfile}", with an estimated market size of ${marketSize}.

You plan to offer a ${formData.productType} product, specifically: ${formData.products.map(p => p.name).join(', ')}.

Your starting budget is MUR ${formData.startingBudget}, and your monetization strategy is: "${formData.monetization}".
      `;
      setIdeaSummary(summary);
    }
    nextStep();
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

  const handleGenerateMarketSize = async () => {
    const sector = formData.sector === 'Other' ? formData.otherSector : formData.sector;
    if (
      !sector ||
      !formData.sectorTarget ||
      !formData.customerProfile
    ) {
      // Maybe show a toast message to the user
      return;
    }
    setIsGeneratingMarketSize(true);
    setFormData((prev) => ({ ...prev, marketPotential: null }));
    try {
      const result = await generateMarketSize({
        sector: sector,
        sectorTarget: formData.sectorTarget,
        customerProfile: formData.customerProfile,
      });
      setFormData((prev) => ({ ...prev, marketPotential: result }));
    } catch (error) {
      console.error('Error generating market size:', error);
      // Handle error state in UI
    } finally {
      setIsGeneratingMarketSize(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAnalysisResult(null);

    const finalSector = formData.sector === 'Other' ? formData.otherSector : formData.sector;

    try {
      // Pass the generated customer number to the final validation flow.
      const marketSizeForValidation =
        formData.marketPotential?.potentialCustomers || 'Not estimated';
      const result = await validateBusinessIdea({
        ...formData,
        sector: finalSector,
        marketSize: marketSizeForValidation,
      });
      setAnalysisResult(result);
      setStore({
        analysisResult: result,
        formData: {
          businessIdeaTitle: formData.businessIdeaTitle,
          ideaDescription: formData.ideaDescription,
          sector: finalSector,
          sectorTarget: formData.sectorTarget,
          customerProfile: formData.customerProfile,
          productType: formData.productType,
          products: formData.products,
          startingBudget: formData.startingBudget,
          monetization: formData.monetization,
        },
      });
    } catch (error) {
      console.error('Error validating business idea:', error);
      // Handle error state in UI, e.g., show a toast notification
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  const resetForm = () => {
    setAnalysisResult(null);
    setCurrentStep(1);
    setFormData({
      businessIdeaTitle: '',
      sector: '',
      otherSector: '',
      sectorTarget: '',
      ideaDescription: '',
      customerProfile: '',
      marketSize: '',
      marketPotential: null,
      productType: '',
      products: [{ name: '' }],
      startingBudget: '',
      monetization: '',
    });
    setStore({ analysisResult: null, formData: null });
  };

  const handleDownloadPdf = async () => {
    if (!analysisResult) return;
    setIsGeneratingPdf(true);

    try {
        const content = [
            { section: 'Overall Assessment', text: analysisResult.validationSummary.overallAssessment },
            { section: 'Key Strengths', text: analysisResult.validationSummary.keyStrengths.join('\n- ') },
            { section: 'Potential Weaknesses', text: analysisResult.validationSummary.potentialWeaknesses.join('\n- ') },
            { section: 'Market Potential', text: analysisResult.validationReport.marketPotential },
            { section: 'Monetization Strategy Analysis', text: analysisResult.validationReport.monetization },
            { section: 'Competitive Landscape', text: analysisResult.validationReport.competitiveLandscape },
            { section: 'Feasibility Analysis', text: analysisResult.validationReport.feasibility },
            { section: 'Target Personas', text: analysisResult.validationReport.targetPersonas.map(p => `**${p.title}**\n${p.description}`).join('\n\n') },
            { section: 'Overall Recommendation', text: analysisResult.validationReport.overallRecommendation },
            { section: 'What I Would Do Differently', text: analysisResult.refinementSuggestions },
        ];
        
        generatePdf(
            `Validation-Report-${formData.businessIdeaTitle.replace(/\s+/g, '-')}.pdf`,
            'Business Idea Validation Report',
            content,
            {
                businessName: formData.businessIdeaTitle,
                ownerName: 'Your Name', // This should be dynamic, from user profile
                phone: 'Your Phone',
                email: 'Your Email'
            },
            'User Name' // Also dynamic
        );

    } catch (error) {
        console.error("Error generating PDF:", error);
    } finally {
        setIsGeneratingPdf(false);
    }
};

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-2xl font-semibold tracking-tight">
          Analyzing Your Idea
        </h2>
        <p className="text-muted-foreground max-w-md text-center">
          Our AI agent is performing an in-depth analysis of your business
          concept. This might take a moment.
        </p>
      </div>
    );
  }

  if (analysisResult) {
    const { validationSummary, validationReport, refinementSuggestions } =
      analysisResult;

    const reportInOrder = {
      marketPotential: validationReport.marketPotential,
      monetization: validationReport.monetization,
      competitiveLandscape: validationReport.competitiveLandscape,
      feasibility: validationReport.feasibility,
      targetPersonas: validationReport.targetPersonas,
      overallRecommendation: validationReport.overallRecommendation,
    };

    return (
      <div className="flex flex-col gap-8 py-8 max-w-4xl mx-auto">
        <div className="bg-background p-4 sm:p-8 rounded-lg">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Validation Report: {formData.businessIdeaTitle}
            </h1>
            <p className="text-muted-foreground">
              Here's the AI-powered analysis of your business idea.
            </p>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="text-primary" />
                <span>Validation Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ViabilityMeter score={validationSummary.viabilityScore} />
                <Card className="p-4 flex flex-col justify-center">
                  <p className="text-sm text-muted-foreground">
                    Estimated Target Market Size
                  </p>
                  <p className="text-4xl font-bold">{analysisResult.marketSize}</p>
                </Card>
              </div>
              <div>
                <p className="font-semibold">Overall Assessment:</p>
                <p className="text-muted-foreground">
                  {validationSummary.overallAssessment}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Strengths</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {validationSummary.keyStrengths.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Potential Weaknesses</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {validationSummary.potentialWeaknesses.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText />
                <span>Business Idea Validation Report</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full" defaultValue="marketPotential">
                {Object.entries(reportInOrder).map(([key, value]) => (
                  <AccordionItem value={key} key={key}>
                    <AccordionTrigger>
                      {key === 'targetPersonas'
                        ? 'Target Persona Profiles'
                        : key
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, (str) => str.toUpperCase())}
                    </AccordionTrigger>
                    <AccordionContent>
                      {key === 'targetPersonas' && Array.isArray(value) ? (
                        <div className="space-y-4">
                          {value.map((persona, i) => (
                            <div
                              key={i}
                              className="border-l-2 border-primary pl-4 py-1"
                            >
                              <h4 className="font-semibold">{persona.title}</h4>
                              <p className="text-muted-foreground">
                                {persona.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                          {value as string}
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 />
                <span>What I Would Do Differently</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {refinementSuggestions}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 border-t mt-4">
          {!isStandalone && (
            <Button asChild className="group">
              <Link href="/business-creation/mvp-planner">
                <span>Let's Figure Out Your Minimum Viable Product</span>
                <ChevronRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
          <Button
            onClick={handleDownloadPdf}
            variant="outline"
            className="gap-2"
            disabled={isGeneratingPdf}
          >
            {isGeneratingPdf ? <Loader2 className="animate-spin" /> : <Download />}
            <span>{isGeneratingPdf ? 'Generating...' : 'Download Report'}</span>
          </Button>
          {!isStandalone && (
            <Button onClick={resetForm} variant="ghost">
              Start Over
            </Button>
           )}
        </div>
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

      <Card className="w-full max-w-3xl mx-auto">
        {!isStandalone && (
            <CardHeader>
            <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
                </p>
            </div>
            </CardHeader>
        )}
        <form onSubmit={handleSubmit}>
          <CardContent className="min-h-[350px]">
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Basics</h2>
                <div className="space-y-2">
                  <Label htmlFor="businessIdeaTitle">Business Idea Title</Label>
                  <Input
                    id="businessIdeaTitle"
                    name="businessIdeaTitle"
                    value={formData.businessIdeaTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., FreshFarm Mauritius"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sector">Sector/Industry</Label>
                  <Select
                    name="sector"
                    value={formData.sector}
                    onValueChange={(value) =>
                      handleSelectChange('sector', value)
                    }
                  >
                    <SelectTrigger id="sector">
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                 {formData.sector === 'Other' && (
                  <div className="space-y-2">
                    <Label htmlFor="otherSector">Please specify your sector</Label>
                    <Input
                      id="otherSector"
                      name="otherSector"
                      value={formData.otherSector}
                      onChange={handleInputChange}
                      placeholder="e.g., Renewable Energy"
                      required
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="sectorTarget">Sector Target</Label>
                  <Select
                    name="sectorTarget"
                    value={formData.sectorTarget}
                    onValueChange={(value) =>
                      handleSelectChange('sectorTarget', value)
                    }
                  >
                    <SelectTrigger id="sectorTarget">
                      <SelectValue placeholder="Select a sector target" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectorTargetOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Description</h2>
                <Label htmlFor="ideaDescription">
                  Describe your idea in 2-3 sentences
                </Label>
                <Textarea
                  id="ideaDescription"
                  name="ideaDescription"
                  value={formData.ideaDescription}
                  onChange={handleInputChange}
                  placeholder="e.g., A mobile app connecting local farmers directly with consumers for fresh produce delivery. We solve the problem of limited access to fresh, local food and provide a new sales channel for farmers."
                  className="h-40"
                  required
                />
              </div>
            )}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Targeted Customers</h2>
                <div className="space-y-2">
                  <Label htmlFor="customerProfile">
                    Main Target Customer Profile
                  </Label>
                  <Textarea
                    id="customerProfile"
                    name="customerProfile"
                    value={formData.customerProfile}
                    onChange={handleInputChange}
                    placeholder="e.g., Health-conscious families in urban areas aged 30-50, working professionals who value convenience, and local restaurants that want to source fresh ingredients."
                    className="h-40"
                    required
                  />
                  <Button
                    type="button"
                    onClick={handleGenerateMarketSize}
                    disabled={
                      isGeneratingMarketSize || !formData.customerProfile
                    }
                    className="gap-2"
                  >
                    {isGeneratingMarketSize ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Sparkles />
                    )}
                    <span>
                      {isGeneratingMarketSize
                        ? 'Generating...'
                        : 'Generate Market Size'}
                    </span>
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>AI-Estimated Target Market Potential</Label>
                  {isGeneratingMarketSize ? (
                    <Card className="p-4 bg-muted space-y-4">
                        <div className="text-center space-y-2">
                            <Skeleton className="h-10 w-3/4 mx-auto" />
                            <Skeleton className="h-4 w-1/2 mx-auto" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </Card>
                  ) : formData.marketPotential ? (
                    <Card className="p-4 bg-muted space-y-4">
                      <div className="text-center">
                        <p className="text-4xl font-bold">
                          {formData.marketPotential.potentialCustomers}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Potential Customers
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">
                          Basis of Analysis
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {formData.marketPotential.explanation}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Sources</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {formData.marketPotential.sources.map(
                            (source, i) => (
                              <li key={i}>{source}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </Card>
                  ) : (
                    <Input
                      disabled
                      placeholder="Click 'Generate Market Size' to get an AI estimation."
                    />
                  )}
                </div>
              </div>
            )}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Products</h2>
                <div className="space-y-2">
                  <Label htmlFor="productType">
                    What type of product are you selling?
                  </Label>
                  <Select
                    name="productType"
                    value={formData.productType}
                    onValueChange={(value) =>
                      handleSelectChange('productType', value)
                    }
                  >
                    <SelectTrigger id="productType">
                      <SelectValue placeholder="Select a product type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Digital">Digital</SelectItem>
                      <SelectItem value="Physical">
                        Physical (manufactured)
                      </SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Which Products/Services?</Label>
                  {formData.products.map((product, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={product.name}
                        onChange={(e) =>
                          handleProductChange(index, e.target.value)
                        }
                        placeholder={`Product/Service ${index + 1}`}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeProduct(index)}
                        disabled={formData.products.length <= 1}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addProduct}
                    className="gap-2"
                  >
                    <PlusCircle />
                    <span>Add Product</span>
                  </Button>
                </div>
              </div>
            )}
            {currentStep === 5 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Budget</h2>
                <Label htmlFor="startingBudget">
                  How much money do you have to start the business? (in MUR)
                </Label>
                <Input
                  id="startingBudget"
                  name="startingBudget"
                  type="number"
                  value={formData.startingBudget}
                  onChange={handleInputChange}
                  placeholder="e.g., 200000"
                  required
                />
              </div>
            )}
            {currentStep === 6 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Monetization</h2>
                <Label htmlFor="monetization">
                  How much will you charge per product/service?
                </Label>
                <Textarea
                  id="monetization"
                  name="monetization"
                  value={formData.monetization}
                  onChange={handleInputChange}
                  placeholder="e.g., We charge a 15% commission on each order. For restaurants, we offer a premium subscription at MUR 2,500/month for bulk orders and free delivery."
                  className="h-40"
                  required
                />
              </div>
            )}
            {currentStep === 7 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Review and Submit</h2>
                <Card className="p-4 bg-muted">
                    <p className="text-muted-foreground whitespace-pre-wrap">{ideaSummary}</p>
                </Card>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1 || isStandalone}
              className={isStandalone ? "hidden" : "gap-2"}
            >
              <ArrowLeft />
              <span>Previous</span>
            </Button>
            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={handleNextStep}
                className="w-full sm:w-auto"
                disabled={
                  (currentStep === 3 && formData.marketPotential === null) ||
                  (currentStep === 6 &&
                    (!formData.businessIdeaTitle ||
                      !formData.ideaDescription ||
                      !formData.customerProfile ||
                      !formData.productType ||
                      !formData.startingBudget ||
                      !formData.monetization))
                }
              >
                <span>{isStandalone ? 'Next Step' : 'Next'}</span>
                <ArrowRight />
              </Button>
            ) : (
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    {!isStandalone && (
                         <Button type="button" variant="outline" onClick={resetForm} className="gap-2">
                            <RefreshCcw />
                            <span>Restart</span>
                        </Button>
                    )}
                    <Button type="submit" className="gap-2 flex-grow">
                        <Lightbulb />
                        <span>Validate</span>
                    </Button>
              </div>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}


export default function BusinessIdeaValidationPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <BusinessIdeaValidationContent />
        </Suspense>
    )
}
