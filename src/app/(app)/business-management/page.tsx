
'use client';

import Spline from '@splinetool/react-spline';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { toast } from '@/hooks/use-toast';

const BusinessProfileForm = ({ profile, handleChange, handleSaveProfile, loading, isProfileSaved }: any) => {
    return (
        <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="text-left">
                <CardTitle className="text-2xl font-semibold text-foreground">Let's Generate you Business Profile</CardTitle>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-8 text-left">
                {/* Business Type */}
                <div>
                    <Label className="text-base font-medium mb-4 block text-left">Business Type</Label>
                     <RadioGroup 
                        name="businessType" 
                        value={profile.businessType} 
                        onValueChange={(value) => handleChange({ target: { name: 'businessType', value } })}
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

                {/* Conditional fields based on Business Type */}
                {profile.businessType !== 'Not set yet' ? (
                    <>
                        {/* Business Form */}
                        <div className="space-y-2">
                             <Label htmlFor="businessForm" className="text-left">Business Form</Label>
                             <Select name="businessForm" value={profile.businessForm} onValueChange={(value) => handleChange({ target: { name: 'businessForm', value } })}>
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

                        {/* Is Startup */}
                        <div className="flex items-center space-x-2">
                            <Switch 
                                id="isStartup"
                                name="isStartup"
                                checked={profile.isStartup}
                                onCheckedChange={(checked) => handleChange({ target: { name: 'isStartup', value: checked, type: 'checkbox' }})}
                            />
                            <Label htmlFor="isStartup">Is your business a Startup (newly established)?</Label>
                        </div>

                        {/* Annual Turnover */}
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

                        {/* Gross Income */}
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
                    /* Projected Annual Income Threshold when "Not set yet" is selected */
                    <div className="space-y-2">
                        <Label htmlFor="projectedAnnualIncomeThreshold" className="text-left">Projected Annual Income Threshold</Label>
                        <Select name="projectedAnnualIncomeThreshold" value={profile.projectedAnnualIncomeThreshold} onValueChange={(value) => handleChange({ target: { name: 'projectedAnnualIncomeThreshold', value } })}>
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

                {/* Has Employees */}
                <div>
                    <Label className="font-medium mb-2 block text-left">Do you have employees?</Label>
                    <RadioGroup 
                        name="hasEmployees" 
                        value={profile.hasEmployees} 
                        onValueChange={(value) => handleChange({ target: { name: 'hasEmployees', value }})}
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

                {/* Industry/Sector */}
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

                <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={loading}
                >
                    {loading ? <Loader2 className="animate-spin" /> : null}
                    {loading ? 'Saving Profile...' : (isProfileSaved ? 'Update Profile & Checklist' : 'Save Profile & Generate Checklist')}
                </Button>
            </form>
            </CardContent>
        </Card>
    );
};


export default function BusinessManagementLandingPage() {
  const [profile, setProfile] = useState({
    businessType: 'Not set yet',
    otherBusinessType: '',
    businessForm: '',
    otherBusinessForm: '',
    isStartup: false,
    annualTurnover: '',
    grossIncome: '',
    projectedAnnualIncomeThreshold: '',
    hasEmployees: 'No',
    numberOfEmployees: '',
    industry: '',
  });
  const [loading, setLoading] = useState(false);
  const [isProfileSaved, setIsProfileSaved] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, checked, type } = e.target;
    
    // Handle radis switch and other checkbox-like components
    if (type === 'checkbox') {
        setProfile(prev => ({
            ...prev,
            [name]: checked
        }));
        return;
    }

    // Handle Select and RadioGroup which don't have a 'name' on the event target
    if (!name) {
         setProfile(prev => ({
            ...prev,
            ...e
        }));
        return;
    }

    setProfile(prev => ({
        ...prev,
        [name]: value,
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        setIsProfileSaved(true);
        toast({
            title: "Profile Saved!",
            description: "Your business profile has been saved successfully.",
        });
        console.log('Saved Profile:', profile);
    }, 1500);
  };
  
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
           <BusinessProfileForm 
                profile={profile}
                handleChange={handleChange}
                handleSaveProfile={handleSaveProfile}
                loading={loading}
                isProfileSaved={isProfileSaved}
           />
        </section>
      </div>
    </div>
  );
}
