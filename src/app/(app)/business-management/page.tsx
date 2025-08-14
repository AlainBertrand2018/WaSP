
'use client';

import Spline from '@splinetool/react-spline';
import { Loader2, ArrowLeft, ArrowRight, Check, Briefcase, LineChart, GanttChartSquare, Users, CheckCheck } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';


const nextSteps = [
    {
        title: 'CRM Suite',
        description: 'Manage clients, quotations, and invoices.',
        href: '/business-management/crm-suite',
        icon: <Briefcase className="w-8 h-8 text-primary" />,
    },
    {
        title: 'Insights Dashboard',
        description: 'Get a high-level overview of your business performance.',
        href: '/business-management/insights-dashboard',
        icon: <LineChart className="w-8 h-8 text-primary" />,
    },
    {
        title: 'Project & Task Manager',
        description: 'Organize your projects and track tasks.',
        href: '/business-management/project-task-manager',
        icon: <GanttChartSquare className="w-8 h-8 text-primary" />,
    },
    {
        title: 'HR System',
        description: 'Manage your employees, payroll, and leave.',
        href: '/business-management/hr-system',
        icon: <Users className="w-8 h-8 text-primary" />,
    },
    {
        title: 'Compliance Validator',
        description: 'Check your business compliance with local regulations.',
        href: '/compliance-validator',
        icon: <CheckCheck className="w-8 h-8 text-primary" />,
    },
];

const BusinessProfileForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState({
    // Step 2
    businessType: 'Not set yet',
    otherBusinessType: '',
    businessForm: '',
    otherBusinessForm: '',
    brn: '',
    isVatRegistered: 'No',
    vatNumber: '',
    isStartup: false,
    annualTurnover: '',
    grossIncome: '',
    projectedAnnualIncomeThreshold: '',
    hasEmployees: 'No',
    numberOfEmployees: '',
    industry: '',
    // Step 3
    businessName: '',
    website: '',
    description: '',
    logo: '',
    // Step 4
    mainGoal: '',
    biggestChallenge: ''
  });
  const [loading, setLoading] = useState(false);
  const [isProfileSaved, setIsProfileSaved] = useState(false);
  const [isNextStepsModalOpen, setIsNextStepsModalOpen] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, checked, type } = e.target;

    if (type === 'checkbox' || type === 'switch') {
      setProfile(prev => ({ ...prev, [name]: checked }));
      return;
    }
    
    // Handle select/radio group changes
    if (!e.target) {
        const [field, val] = Object.entries(e)[0];
        setProfile(prev => ({...prev, [field]: val}));
        return;
    }

    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof typeof profile, value: string) => {
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: keyof typeof profile, checked: boolean) => {
      setProfile(prev => ({ ...prev, [name]: checked }));
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsProfileSaved(true);
      toast({
        title: "Profile Saved!",
        description: "Your business profile has been saved successfully.",
      });
      setIsNextStepsModalOpen(true);
      console.log('Saved Profile:', profile);
    }, 1500);
  };
  
  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const steps = [
    { id: 1, name: "Onboarding" },
    { id: 2, name: "Business Profile" },
    { id: 3, name: "Business Identity" },
    { id: 4, name: "Goals" },
    { id: 5, name: "Review" },
  ];

  return (
    <>
        <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
            {/* Stepper UI */}
            <div className="flex justify-between items-center px-2 md:px-8">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center">
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors",
                                currentStep > step.id ? 'bg-primary text-primary-foreground' :
                                currentStep === step.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                            )}>
                                {currentStep > step.id ? <Check /> : step.id}
                            </div>
                            <p className={cn(
                                "text-xs mt-1 transition-colors text-center",
                                currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                            )}>{step.name}</p>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={cn(
                                "flex-1 h-1 mx-2 transition-colors",
                                currentStep > step.id ? 'bg-primary' : 'bg-muted'
                            )}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </CardHeader>
        <CardContent>
            {currentStep === 1 && (
                <div className="text-center p-4">
                    <CardTitle className="text-2xl font-semibold text-foreground">Welcome to Your Business Management Hub</CardTitle>
                    <CardDescription className="max-w-2xl mx-auto mt-4 text-lg">
                        To tailor our AI tools and provide you with the most accurate insights, we first need to understand your business. This short onboarding process will help us create a detailed profile of your venture.
                    </CardDescription>
                    <div className="mt-6 p-4 bg-muted/50 border rounded-lg max-w-2xl mx-auto">
                        <h3 className="font-semibold text-foreground">Your Data is Secure</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                            We take your privacy seriously. All the information you provide is stored securely in an encrypted database. It will never be shared and is only accessible by you and accredited users you authorize.
                        </p>
                    </div>
                    <Button onClick={nextStep} size="lg" className="mt-8">
                        Get Started <ArrowRight className="ml-2"/>
                    </Button>
                </div>
            )}
            
            {currentStep === 2 && (
                <form className="space-y-8 text-left">
                    <CardTitle className="text-2xl text-center font-semibold text-foreground">Let's Generate you Business Profile</CardTitle>
                    <div>
                        <Label className="text-base font-medium mb-4 block text-left">Business Type</Label>
                        <RadioGroup
                            name="businessType"
                            value={profile.businessType}
                            onValueChange={(value) => handleSelectChange('businessType', value)}
                            className="grid grid-cols-2 md:grid-cols-3 gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Not set yet" id="bt-not-set" />
                                <Label htmlFor="bt-not-set">Not set yet</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Individual/Self-Employed" id="bt-individual" />
                                <Label htmlFor="bt-individual">Individual/Self-Employed</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Company" id="bt-company" />
                                <Label htmlFor="bt-company">Company</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Microenterprise" id="bt-micro" />
                                <Label htmlFor="bt-micro">Microenterprise</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Other" id="bt-other" />
                                <Label htmlFor="bt-other">Other</Label>
                            </div>
                        </RadioGroup>
                        {profile.businessType === 'Other' && (
                            <div className="mt-4">
                                <Label htmlFor="otherBusinessType" className="text-left">Please specify your business type</Label>
                                <Input
                                    type="text"
                                    id="otherBusinessType"
                                    name="otherBusinessType"
                                    value={profile.otherBusinessType}
                                    onChange={handleChange}
                                    placeholder="e.g., Partnership, Trust"
                                />
                            </div>
                        )}
                    </div>

                    {profile.businessType !== 'Not set yet' ? (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="businessForm" className="text-left">Business Form</Label>
                                <Select name="businessForm" value={profile.businessForm} onValueChange={(value) => handleSelectChange('businessForm', value)}>
                                    <SelectTrigger id="businessForm">
                                        <SelectValue placeholder="Select a business form" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Société">Société</SelectItem>
                                        <SelectItem value="Partnership/Limited Partnership">Partnership/Limited Partnership</SelectItem>
                                        <SelectItem value="Private Company">Private Company</SelectItem>
                                        <SelectItem value="GBC (Global Business Company)">GBC (Global Business Company)</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                {profile.businessForm === 'Other' && (
                                    <div className="mt-4">
                                        <Label htmlFor="otherBusinessForm" className="text-left">Please specify</Label>
                                        <Input
                                            type="text"
                                            id="otherBusinessForm"
                                            name="otherBusinessForm"
                                            value={profile.otherBusinessForm}
                                            onChange={handleChange}
                                            placeholder="Specify business form"
                                        />
                                    </div>
                                )}
                            </div>
                            
                            <div className="space-y-2">
                            <Label htmlFor="brn" className="text-left">Business Registration Number (BRN)</Label>
                            <Input
                                    type="text"
                                    id="brn"
                                    name="brn"
                                    value={profile.brn}
                                    onChange={handleChange}
                                    placeholder="e.g., C12345678"
                            />
                            </div>

                            <div>
                                <Label className="font-medium mb-2 block text-left">Is your Business Vat Registered?</Label>
                                <RadioGroup
                                    name="isVatRegistered"
                                    value={profile.isVatRegistered}
                                    onValueChange={(value) => handleSelectChange('isVatRegistered', value)}
                                    className="flex gap-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Yes" id="vat-yes" />
                                        <Label htmlFor="vat-yes">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="No" id="vat-no" />
                                        <Label htmlFor="vat-no">No</Label>
                                    </div>
                                </RadioGroup>
                                {profile.isVatRegistered === 'Yes' && (
                                    <div className="mt-4 space-y-2">
                                        <Label htmlFor="vatNumber" className="text-left">VAT Number</Label>
                                        <Input
                                            type="text"
                                            id="vatNumber"
                                            name="vatNumber"
                                            value={profile.vatNumber}
                                            onChange={handleChange}
                                            placeholder="e.g., 20123456"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="isStartup"
                                    name="isStartup"
                                    checked={profile.isStartup}
                                    onCheckedChange={(checked) => handleSwitchChange('isStartup', checked)}
                                />
                                <Label htmlFor="isStartup">Is your business a Startup (newly established)?</Label>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="annualTurnover" className="text-left">Annual Turnover of Taxable Supplies (MUR)</Label>
                                <Input
                                    type="number"
                                    id="annualTurnover"
                                    name="annualTurnover"
                                    value={profile.annualTurnover}
                                    onChange={handleChange}
                                    placeholder="e.g., 5000000"
                                />
                                <p className="text-xs text-muted-foreground text-left">
                                    (Used for VAT registration threshold, current threshold is MUR 6 million, lowering to MUR 3 million from Oct 1, 2025)
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="grossIncome" className="text-left">Gross Income for Preceding Income Year (MUR)</Label>
                                <Input
                                    type="number"
                                    id="grossIncome"
                                    name="grossIncome"
                                    value={profile.grossIncome}
                                    onChange={handleChange}
                                    placeholder="e.g., 4500000"
                                />
                                <p className="text-xs text-muted-foreground text-left">
                                    (Used for CPS/APS statements, e.g., > MUR 4 million for self-employed)
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-2">
                            <Label htmlFor="projectedAnnualIncomeThreshold" className="text-left">Projected Annual Income Threshold</Label>
                            <Select name="projectedAnnualIncomeThreshold" value={profile.projectedAnnualIncomeThreshold} onValueChange={(value) => handleSelectChange('projectedAnnualIncomeThreshold', value)}>
                                <SelectTrigger id="projectedAnnualIncomeThreshold">
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Less than Rs 3M">Less than Rs 3M</SelectItem>
                                    <SelectItem value="More than Rs 3M">More than Rs 3M</SelectItem>
                                    <SelectItem value="More than Rs 10M">More than Rs 10M</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground text-left">
                                (This helps us understand your potential future compliance needs.)
                            </p>
                        </div>
                    )}

                    <div>
                        <Label className="font-medium mb-2 block text-left">Do you have employees?</Label>
                        <RadioGroup
                            name="hasEmployees"
                            value={profile.hasEmployees}
                            onValueChange={(value) => handleSelectChange('hasEmployees', value)}
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="employees-yes" />
                                <Label htmlFor="employees-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="employees-no" />
                                <Label htmlFor="employees-no">No</Label>
                            </div>
                        </RadioGroup>
                        {profile.hasEmployees === 'Yes' && (
                            <div className="mt-4 space-y-2">
                                <Label htmlFor="numberOfEmployees" className="text-left">Number of employees</Label>
                                <Input
                                    type="number"
                                    id="numberOfEmployees"
                                    name="numberOfEmployees"
                                    value={profile.numberOfEmployees}
                                    onChange={handleChange}
                                    placeholder="e.g., 5"
                                    min="0"
                                />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="industry" className="text-left">Industry/Sector (e.g., Construction, Retail, IT)</Label>
                        <Input
                            type="text"
                            id="industry"
                            name="industry"
                            value={profile.industry}
                            onChange={handleChange}
                            placeholder="e.g., Construction"
                        />
                        <p className="text-xs text-muted-foreground text-left">
                            (Used for industry-specific compliance, like CIDB for construction)
                        </p>
                    </div>
                </form>
            )}

            {currentStep === 3 && (
                <div className="space-y-8 text-left">
                    <CardTitle className="text-2xl text-center font-semibold text-foreground">Your Business Identity</CardTitle>
                    <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input id="businessName" name="businessName" value={profile.businessName} onChange={handleChange} placeholder="e.g., BusinessStudio AI" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" name="website" value={profile.website} onChange={handleChange} placeholder="https://www.example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Short Business Description</Label>
                        <Textarea id="description" name="description" value={profile.description} onChange={handleChange} placeholder="Describe what your business does in a few sentences." />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="logo">Business Logo</Label>
                        <Input id="logo" name="logo" type="file" onChange={handleChange} />
                        <p className="text-xs text-muted-foreground">Upload your company logo (PNG, JPG, SVG).</p>
                    </div>
                </div>
            )}
            
            {currentStep === 4 && (
                <div className="space-y-8 text-left">
                    <CardTitle className="text-2xl text-center font-semibold text-foreground">Your Business Goals and Challenges</CardTitle>
                    <div className="space-y-2">
                        <Label htmlFor="mainGoal">What is your main goal right now?</Label>
                        <Select name="mainGoal" value={profile.mainGoal} onValueChange={(value) => handleSelectChange('mainGoal', value)}>
                            <SelectTrigger id="mainGoal">
                                <SelectValue placeholder="Select your primary objective" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="secure-funding">Secure Funding</SelectItem>
                                <SelectItem value="increase-sales">Increase Sales & Revenue</SelectItem>
                                <SelectItem value="improve-efficiency">Improve Operational Efficiency</SelectItem>
                                <SelectItem value="launch-product">Launch a New Product/Service</SelectItem>
                                <SelectItem value="understand-compliance">Understand Compliance Needs</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="biggestChallenge">What is your biggest challenge at the moment?</Label>
                        <Textarea id="biggestChallenge" name="biggestChallenge" value={profile.biggestChallenge} onChange={handleChange} placeholder="Describe the main obstacle you are facing..." />
                    </div>
                </div>
            )}
            
            {currentStep === 5 && (
                <div className="space-y-6 text-left">
                    <CardTitle className="text-2xl text-center font-semibold text-foreground">Review & Confirm</CardTitle>
                    <CardDescription className="text-center">Please review your information before saving.</CardDescription>
                    <div className="space-y-4 p-4 border rounded-lg bg-muted/50 max-h-96 overflow-y-auto">
                        {Object.entries(profile).map(([key, value]) => {
                            if (value && typeof value !== 'boolean' && value !== 'Not set yet' || typeof value === 'boolean' && value) {
                                const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                                return (
                                    <div key={key} className="flex justify-between text-sm">
                                        <span className="font-semibold text-muted-foreground">{formattedKey}:</span>
                                        <span className="text-right">{String(value)}</span>
                                    </div>
                                )
                            }
                            return null;
                        })}
                    </div>
                </div>
            )}
        </CardContent>
        <CardFooter className="border-t pt-6 flex justify-between">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                    <ArrowLeft className="mr-2" /> Previous
                </Button>
                {currentStep < 5 ? (
                    <Button onClick={nextStep}>
                        Next <ArrowRight className="ml-2" />
                    </Button>
                ) : (
                    <Button onClick={handleSaveProfile} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                        {isProfileSaved ? 'Update Profile' : 'Save Profile'}
                    </Button>
                )}
        </CardFooter>
        </Card>

        <Dialog open={isNextStepsModalOpen} onOpenChange={setIsNextStepsModalOpen}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Profile Saved! What's next?</DialogTitle>
                    <DialogDescription>
                        Your business profile is set up. Choose an application to jump into next.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                    {nextSteps.map((step) => (
                        <Link href={step.href} key={step.title} onClick={() => setIsNextStepsModalOpen(false)}>
                            <Card className="h-full hover:bg-muted/50 transition-colors">
                                <CardHeader>
                                    {step.icon}
                                    <CardTitle className="mt-2 text-base">{step.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground">{step.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    </>
  );
};

export default function BusinessManagementLandingPage() {
  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full">
      <section
        className="relative w-full h-[40vh] md:min-h-[90vh] bg-black"
      >
        <Link
          href="#onboarding"
          onClick={(e) => handleScrollTo(e, 'onboarding')}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label="Scroll to next section"
        >
          <Spline
            scene="https://prod.spline.design/FKmWkI9k5Dkb9cLz/scene.splinecode"
            className="!absolute !top-0 !left-0 !w-full !h-full"
          />
        </Link>
      </section>

      <div className="px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <section className="mb-12" id="onboarding">
           <BusinessProfileForm />
        </section>
      </div>
    </div>
  );
}
