
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
  FileText,
  Lightbulb,
  Loader2,
  PlusCircle,
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

const totalSteps = 6;

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

export default function BusinessIdeaValidationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    businessIdeaTitle: '',
    sector: '',
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
  const [analysisResult, setAnalysisResult] =
    useState<ValidateBusinessIdeaOutput | null>(null);

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
    if (
      !formData.sector ||
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
        sector: formData.sector,
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
    try {
      // Pass the generated customer number to the final validation flow.
      const marketSizeForValidation =
        formData.marketPotential?.potentialCustomers || 'Not estimated';
      const result = await validateBusinessIdea({
        ...formData,
        marketSize: marketSizeForValidation,
      });
      setAnalysisResult(result);
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
  };

  const handleDownloadPdf = () => {
    // This is a placeholder for the PDF generation logic
    alert('PDF download functionality coming soon!');
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
    const {
      marketSize,
      validationSummary,
      targetPersonas,
      validationReport,
      refinementSuggestions,
    } = analysisResult;

    const reportInOrder = {
      marketPotential: validationReport.marketPotential,
      monetization: validationReport.monetization,
      competitiveLandscape: validationReport.competitiveLandscape,
      feasibility: validationReport.feasibility,
      overallRecommendation: validationReport.overallRecommendation,
    }

    return (
      <div className="flex flex-col gap-8 py-8 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Validation Report: {formData.businessIdeaTitle}
          </h1>
          <p className="text-muted-foreground">
            Here's the AI-powered analysis of your business idea.
          </p>
        </div>

        <Card>
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
                <p className="text-4xl font-bold">{marketSize}</p>
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText />
              <span>Business Idea Validation Report</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(reportInOrder).map(([key, value]) => (
                <AccordionItem value={key} key={key}>
                  <AccordionTrigger>
                    {key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase())}
                  </AccordionTrigger>
                  <AccordionContent className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                    {value}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users />
              <span>Target Persona Profiles</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {targetPersonas.map((persona, i) => (
              <div key={i} className="border-l-2 border-primary pl-4 py-1">
                <h4 className="font-semibold">{persona.title}</h4>
                <p className="text-muted-foreground">{persona.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild className="group">
            <Link href="/business-management/mvp-planner">
              <span>Let's Figure Out Your Minimum Viable Product</span>
              <ChevronRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            onClick={handleDownloadPdf}
            variant="outline"
            className="gap-2"
          >
            <Download />
            <span>Download Report</span>
          </Button>
          <Button onClick={resetForm} variant="ghost">
            Start Over
          </Button>
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
        <CardHeader>
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </CardHeader>
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
                  {formData.marketPotential ? (
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
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft />
              <span>Previous</span>
            </Button>
            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                className="gap-2"
                disabled={
                  currentStep === 3 && formData.marketPotential === null
                }
              >
                <span>Next</span>
                <ArrowRight />
              </Button>
            ) : (
              <Button type="submit" className="gap-2">
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
