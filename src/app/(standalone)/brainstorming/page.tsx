
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Lightbulb, Loader2, Sparkles, ArrowRight, ArrowLeft, User, CheckCircle } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { generateSuggestionsForUser, type GenerateSuggestionsForUserInput, type SectorSuggestion } from '@/ai/flows/ideation/generate-user-profile-analysis-flow';

const profileSchema = z.object({
  expertise: z.string().min(10, "Please describe your expertise in a bit more detail."),
  passion: z.string().min(10, "Please tell us more about what you're passionate about."),
  budget: z.string().min(1, "Please select a budget range."),
  businessStyle: z.string().min(1, "Please select your preferred business style."),
  targetAudience: z.string().min(1, "Please select a target audience."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function BrainstormingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sectors, setSectors] = useState<SectorSuggestion[]>([]);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [customSector, setCustomSector] = useState('');
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmitProfile = async (data: ProfileFormValues) => {
    setIsLoading(true);
    setSectors([]);
    try {
        const result = await generateSuggestionsForUser(data);
        setSectors(result.suggestions);
        setCurrentStep(2);
    } catch (error) {
        console.error("Error generating suggestions:", error);
        // Add user-facing error message, e.g., a toast
    } finally {
        setIsLoading(false);
    }
  };

  const handleSelectSector = (sectorTitle: string) => {
    setCustomSector(''); // Clear custom input
    setSelectedSector(sectorTitle === selectedSector ? null : sectorTitle);
  };
  
  const handleCustomSectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSector(null); // Clear card selection
    setCustomSector(e.target.value);
  }

  const canProceedFromHints = selectedSector || customSector.trim();

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <Card className="w-full shadow-lg">
        <CardHeader className="text-center items-center">
          <div className="p-4 bg-primary/10 rounded-full">
              <Lightbulb className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="mt-4 text-3xl">AI Business Idea Brainstormer</CardTitle>
          <CardDescription className="max-w-prose">
            A personalized brainstorming experience to find the perfect business idea for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Step Indicator */}
          <div className="flex justify-center items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold", currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted")}>1</div>
                  <span className="text-xs font-semibold">Your Profile</span>
              </div>
              <div className={cn("flex-1 h-0.5", currentStep > 1 ? "bg-primary" : "bg-muted")}></div>
              <div className="flex flex-col items-center gap-1">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold", currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted")}>2</div>
                  <span className="text-xs font-semibold">AI Hints</span>
              </div>
          </div>
          
          {/* Step 1: Profile Form */}
          {currentStep === 1 && (
            <form onSubmit={form.handleSubmit(onSubmitProfile)} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="expertise">What is your professional background or area of expertise?</Label>
                    <Textarea id="expertise" {...form.register('expertise')} placeholder="e.g., 10 years in software development, certified accountant, expert in digital marketing..." className="min-h-[100px]" />
                    {form.formState.errors.expertise && <p className="text-sm text-destructive">{form.formState.errors.expertise.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="passion">What are your personal interests or passions?</Label>
                    <Textarea id="passion" {...form.register('passion')} placeholder="e.g., Sustainable living, video games, gourmet cooking, teaching, event planning..." className="min-h-[100px]" />
                     {form.formState.errors.passion && <p className="text-sm text-destructive">{form.formState.errors.passion.message}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     <div className="space-y-2">
                        <Label>What's your estimated starting budget?</Label>
                        <Controller name="budget" control={form.control} render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger><SelectValue placeholder="Select a range" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="< MUR 100k">Less than MUR 100,000</SelectItem>
                                    <SelectItem value="MUR 100k - 500k">MUR 100,000 - 500,000</SelectItem>
                                    <SelectItem value="MUR 500k - 2M">MUR 500,000 - 2M</SelectItem>
                                    <SelectItem value="> MUR 2M">More than MUR 2M</SelectItem>
                                </SelectContent>
                            </Select>
                         )} />
                         {form.formState.errors.budget && <p className="text-sm text-destructive">{form.formState.errors.budget.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>What's your ideal business style?</Label>
                         <Controller name="businessStyle" control={form.control} render={({ field }) => (
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 pt-2">
                                <div className="flex items-center space-x-2"><RadioGroupItem value="solo" id="solo" /><Label htmlFor="solo">Solo Founder</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="team" id="team" /><Label htmlFor="team">Team-based</Label></div>
                            </RadioGroup>
                         )} />
                          {form.formState.errors.businessStyle && <p className="text-sm text-destructive">{form.formState.errors.businessStyle.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Who is your preferred target audience?</Label>
                        <Controller name="targetAudience" control={form.control} render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger><SelectValue placeholder="Select a target" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="B2C">B2C (Business-to-Consumer)</SelectItem>
                                    <SelectItem value="B2B">B2B (Business-to-Business)</SelectItem>
                                    <SelectItem value="both">Both B2C and B2B</SelectItem>
                                </SelectContent>
                            </Select>
                        )} />
                        {form.formState.errors.targetAudience && <p className="text-sm text-destructive">{form.formState.errors.targetAudience.message}</p>}
                    </div>
                </div>
                
                <div className="flex justify-center pt-4">
                    <Button type="submit" size="lg" disabled={isLoading}>
                         {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                        <span>{isLoading ? 'Analyzing Profile...' : 'Get My Personalized Suggestions'}</span>
                        <ArrowRight />
                    </Button>
                </div>
            </form>
          )}

          {/* Step 2: AI Hints */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-center mb-4">Step 2: AI-Powered Sector Hints</h3>
              <p className="text-center text-muted-foreground mb-6">Based on your profile, here are some sectors where you might have a unique advantage. Select one or enter your own.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sectors.map((sector) => (
                    <Card
                      key={sector.title}
                      onClick={() => handleSelectSector(sector.title)}
                      className={cn(
                        'cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary',
                        selectedSector === sector.title ? 'border-primary ring-2 ring-primary shadow-lg' : 'border-border'
                      )}
                    >
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center justify-between">
                            <span>{sector.title}</span>
                             {selectedSector === sector.title && <CheckCircle className="text-primary" />}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                         <p className="text-sm font-semibold mb-2">Why it's a good fit for you:</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {sector.reasonsWhy.map((reason, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <Sparkles className="h-4 w-4 text-accent flex-shrink-0 mt-1" />
                                <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-2">...or enter another sector</p>
                <Input 
                    placeholder="e.g., Artificial Intelligence Services" 
                    className="max-w-md mx-auto"
                    value={customSector}
                    onChange={handleCustomSectorChange}
                />
              </div>
              
              <div className="mt-8 flex justify-between">
                 <Button size="lg" variant="outline" onClick={() => setCurrentStep(1)}>
                  <ArrowLeft />
                  <span>Back to Profile</span>
                </Button>
                <Button size="lg" disabled={!canProceedFromHints}>
                  <span>Next Step</span>
                  <ArrowRight />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

