
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  PlusCircle,
  Settings,
  Trash2,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import {
  useBusinessProfileStore,
  type BusinessProfile,
} from '@/store/business-profile-store';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
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
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type ProfileFormData = Omit<BusinessProfile, 'id' | 'user_id' | 'created_at'>;

const BusinessProfileForm = ({
  onSave,
  closeDialog,
  initialData,
}: {
  onSave: (profile: BusinessProfile) => void;
  closeDialog: () => void;
  initialData?: BusinessProfile | null;
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<ProfileFormData>>(
    initialData || {
      business_type: 'Not set yet',
      is_vat_registered: false,
      has_employees: false,
      is_startup: false,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (
    name: keyof ProfileFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (
    name: keyof ProfileFormData,
    checked: boolean
  ) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const profileDataToSave = {
        ...formData,
        user_id: user.id,
        id: initialData?.id, // Pass ID for upsert
      };

      const { data, error } = await supabase
        .from('business_profiles')
        .upsert(profileDataToSave)
        .select()
        .single();
      
      if (error) throw error;

      onSave(data as BusinessProfile);
      toast({
        title: `Profile ${initialData ? 'Updated' : 'Created'}!`,
        description: `The profile "${data.business_name}" has been saved successfully.`,
      });
      closeDialog();
    } catch (error: any) {
      toast({
        title: 'Error Saving Profile',
        description: error.message || 'An unknown error occurred.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <form onSubmit={handleSaveProfile} className="space-y-6">
      {/* Form Content based on currentStep */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Business Identity</h3>
           <div className="space-y-2">
              <Label htmlFor="business_name">Business Name*</Label>
              <Input id="business_name" name="business_name" value={formData.business_name || ''} onChange={handleChange} placeholder="e.g., BusinessStudio AI" required/>
          </div>
          <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" name="website" value={formData.website || ''} onChange={handleChange} placeholder="https://www.example.com" />
          </div>
          <div className="space-y-2">
              <Label htmlFor="description">Short Business Description</Label>
              <Textarea id="description" name="description" value={formData.description || ''} onChange={handleChange} placeholder="Describe what your business does in a few sentences." />
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
           <h3 className="font-semibold text-lg">Legal & Financial Details</h3>
            <div className="space-y-2">
                <Label htmlFor="business_form">Business Form</Label>
                <Select name="business_form" value={formData.business_form} onValueChange={(value) => handleSelectChange('business_form', value)}>
                    <SelectTrigger id="business_form">
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="brn">Business Registration Number (BRN)</Label>
              <Input type="text" id="brn" name="brn" value={formData.brn || ''} onChange={handleChange} placeholder="e.g., C12345678"/>
            </div>
             <div className="space-y-2">
                <Label htmlFor="industry">Industry/Sector</Label>
                <Input type="text" id="industry" name="industry" value={formData.industry || ''} onChange={handleChange} placeholder="e.g., Information Technology"/>
            </div>
             <div className="flex items-center space-x-2">
                <Switch id="is_vat_registered" name="is_vat_registered" checked={formData.is_vat_registered} onCheckedChange={(checked) => handleSwitchChange('is_vat_registered', checked)}/>
                <Label htmlFor="is_vat_registered">Is your Business VAT Registered?</Label>
            </div>
             {formData.is_vat_registered && (
                <div className="mt-4 space-y-2">
                    <Label htmlFor="vat_number">VAT Number</Label>
                    <Input type="text" id="vat_number" name="vat_number" value={formData.vat_number || ''} onChange={handleChange} placeholder="e.g., 20123456"/>
                </div>
            )}
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Goals & Challenges</h3>
          <div className="space-y-2">
              <Label htmlFor="main_goal">What is the main goal for this profile?</Label>
              <Select name="main_goal" value={formData.main_goal} onValueChange={(value) => handleSelectChange('main_goal', value)}>
                  <SelectTrigger id="main_goal">
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
              <Label htmlFor="biggest_challenge">What is the biggest challenge for this profile?</Label>
              <Textarea id="biggest_challenge" name="biggest_challenge" value={formData.biggest_challenge || ''} onChange={handleChange} placeholder="Describe the main obstacle..." />
          </div>
        </div>
      )}

      {/* Footer with navigation */}
      <div className="flex justify-between border-t pt-6 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        {currentStep < 3 ? (
          <Button type="button" onClick={nextStep}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? 'Update Profile' : 'Save Profile'}
          </Button>
        )}
      </div>
    </form>
  );
};


export default function BusinessManagementLandingPage() {
  const {
    profiles,
    activeProfile,
    setProfiles,
    addProfile,
    updateProfile,
    setActiveProfile,
  } = useBusinessProfileStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<BusinessProfile | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);
        if (session?.user) {
          try {
            const { data, error } = await supabase
              .from('business_profiles')
              .select('*')
              .eq('user_id', session.user.id);

            if (error) throw error;
            setProfiles(data || []);
          } catch (error) {
            console.error('Error fetching profiles:', error);
            toast({
              title: 'Error',
              description: 'Could not fetch business profiles.',
              variant: 'destructive',
            });
          } finally {
            setIsLoading(false);
          }
        } else {
            // No user session, clear profiles and stop loading
            setProfiles([]);
            setIsLoading(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setProfiles]);


  const handleProfileSaved = (profile: BusinessProfile) => {
    // Determine if it's a new profile or an update
    if (profiles.some(p => p.id === profile.id)) {
      updateProfile(profile);
    } else {
      addProfile(profile);
    }
  };

  const handleEdit = (profile: BusinessProfile) => {
    setEditingProfile(profile);
    setIsFormOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingProfile(null);
    setIsFormOpen(true);
  };

  return (
    <div className="flex flex-col gap-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Business Profile Manager</h1>
        <p className="text-muted-foreground">
          Manage your different business profiles here. Select a profile to make it active across the app.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
            [...Array(3)].map((_, i) => <Skeleton key={i} className="h-48" />)
        ) : (
          profiles.map((profile) => (
            <Card
              key={profile.id}
              className={cn(
                'flex flex-col transition-all',
                activeProfile?.id === profile.id ? 'border-primary ring-2 ring-primary' : 'hover:border-primary/50'
              )}
            >
              <CardHeader>
                <CardTitle>{profile.business_name}</CardTitle>
                <CardDescription>{profile.industry || 'No industry set'}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                 <p className="text-sm text-muted-foreground line-clamp-3">{profile.description || 'No description provided.'}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                 <Button variant="outline" size="sm" onClick={() => handleEdit(profile)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Edit
                 </Button>
                <Button size="sm" onClick={() => setActiveProfile(profile)} disabled={activeProfile?.id === profile.id}>
                  {activeProfile?.id === profile.id ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Active
                    </>
                  ) : 'Select'}
                </Button>
              </CardFooter>
            </Card>
          ))
        )}

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <Card className="flex flex-col items-center justify-center text-center p-6 border-2 border-dashed h-full min-h-48">
              <PlusCircle className="h-12 w-12 text-muted-foreground mb-2"/>
              <h3 className="font-semibold mb-2">Create New Profile</h3>
              <p className="text-sm text-muted-foreground mb-4">Start a new business profile from scratch.</p>
              <Button onClick={handleAddNew}>Create Profile</Button>
            </Card>

          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>{editingProfile ? 'Edit Business Profile' : 'Create New Business Profile'}</DialogTitle>
              <DialogDescription>
                {editingProfile ? 'Update the details for your business profile.' : 'Fill in the details to create a new profile.'}
              </DialogDescription>
            </DialogHeader>
            <BusinessProfileForm 
                onSave={handleProfileSaved} 
                closeDialog={() => setIsFormOpen(false)}
                initialData={editingProfile}
            />
          </DialogContent>
        </Dialog>
      </div>

       {profiles.length === 0 && !isLoading && (
            <div className="text-center py-16 text-muted-foreground">
                <p>No business profiles found.</p>
                <p>Click "Create New Profile" to get started.</p>
            </div>
        )}
    </div>
  );
}
