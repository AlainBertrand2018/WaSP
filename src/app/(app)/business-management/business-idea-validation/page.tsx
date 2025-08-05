
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
  Lightbulb,
  Loader2,
  PlusCircle,
  Trash2,
} from 'lucide-react';

const totalSteps = 6;

const industryOptions = [
  'Tourism & Hospitality',
  'Financial Services & FinTech',
  'Information Technology & BPO',
  'Real Estate & Construction',
  'Retail & E-commerce',
  'Agriculture & Agri-tech',
  'Healthcare & Wellness',
  'Education & Ed-tech',
  'Manufacturing',
  'Logistics & Transportation',
];

type FormData = {
  businessIdeaTitle: string;
  sector: string;
  marketSize: string;
  ideaDescription: string;
  customerProfile: string;
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
    marketSize: '',
    ideaDescription: '',
    customerProfile: '',
    productType: '',
    products: [{ name: '' }],
    startingBudget: '',
    monetization: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

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
          Our AI agent is performing an in-depth analysis of your business
          concept. This might take a moment.
        </p>
      </div>
    );
  }

  if (analysisResult) {
    return (
      <div className="flex flex-col gap-8 py-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Validation Report
          </h1>
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
                    required
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
                  <Label htmlFor="marketSize">
                    AI-generated Target market size
                  </Label>
                  <Input
                    id="marketSize"
                    name="marketSize"
                    value={formData.marketSize}
                    disabled
                    placeholder="Market size will be generated by AI..."
                  />
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
                <h2 className="text-2xl font-semibold">Customers</h2>
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
                    required
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
            >
              <ArrowLeft />
              <span>Previous</span>
            </Button>
            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep}>
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

    