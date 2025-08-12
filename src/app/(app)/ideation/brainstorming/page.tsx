
'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Label} from '@/components/ui/label';
import {
  Lightbulb,
  Loader2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Users,
  Target,
  CircleDollarSign,
  User,
  HelpCircle,
  Rocket,
  Wand2,
} from 'lucide-react';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {cn} from '@/lib/utils';
import {
  generateSuggestionsForUser,
  type SectorSuggestion,
  type GenerateSuggestionsForUserOutput,
} from '@/ai/flows/ideation/generate-user-profile-analysis-flow';
import {Skeleton} from '@/components/ui/skeleton';
import Link from 'next/link';

const formSchema = z.object({
  businessConcept: z
    .string()
    .min(10, 'Please describe your business concept in a bit more detail.'),
  problemToSolve: z
    .string()
    .min(10, 'Please describe the problem you want to solve.'),
  proposedSolution: z
    .string()
    .min(10, 'Please describe your proposed solution.'),
  expertise: z
    .string()
    .min(10, 'Please describe your expertise in a bit more detail.'),
  passion: z
    .string()
    .min(10, "Please tell us more about what you're passionate about."),
  budget: z.string().min(1, 'Please select a budget range.'),
  businessStyle: z.string().min(1, 'Please select your preferred business style.'),
  targetAudience: z.string().min(1, 'Please select a target audience.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function BrainstormingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<GenerateSuggestionsForUserOutput | null>(
    null
  );
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [customSector, setCustomSector] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setAiResult(null);
    try {
      const result = await generateSuggestionsForUser(data);
      setAiResult(result);
      setCurrentStep(3); // Move to hinting step after generation
    } catch (error) {
      console.error('Error generating suggestions:', error);
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
  };

  const canProceedFromHints = selectedSector || customSector.trim();

  const next = () => setCurrentStep((s) => s + 1);
  const prev = () => setCurrentStep((s) => s - 1);

  const getStepClass = (step: number) => {
    if (step < currentStep) return 'bg-primary text-primary-foreground';
    if (step === currentStep) return 'bg-primary text-primary-foreground';
    return 'bg-muted';
  };
  
  const getStepLineClass = (step: number) => {
    if (step < currentStep) return 'bg-primary';
    return 'bg-muted';
  }

  const renderContent = () => {
    switch (currentStep) {
      case 1: // Business Idea
        return (
          <div className="space-y-6">
             <h3 className="text-lg font-semibold text-center">Step 1: Your Business Concept</h3>
             <p className="text-center text-muted-foreground mb-6">Let's start with the big picture. What are you dreaming of building?</p>
            <div className="space-y-2">
              <Label htmlFor="businessConcept">What business would you like to build?</Label>
              <Textarea
                id="businessConcept"
                {...form.register('businessConcept')}
                placeholder="e.g., A farm-to-table delivery service for fresh, organic produce in Mauritius."
                className="min-h-[100px]"
              />
              {form.formState.errors.businessConcept && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.businessConcept.message}
                </p>
              )}
            </div>
             <div className="space-y-2">
              <Label htmlFor="problemToSolve">What problem are you trying to solve?</Label>
              <Textarea
                id="problemToSolve"
                {...form.register('problemToSolve')}
                placeholder="e.g., Consumers struggle to find consistent, high-quality local produce, and small farmers lack direct market access."
                className="min-h-[100px]"
              />
               {form.formState.errors.problemToSolve && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.problemToSolve.message}
                </p>
              )}
            </div>
             <div className="space-y-2">
              <Label htmlFor="proposedSolution">What is your proposed solution?</Label>
              <Textarea
                id="proposedSolution"
                {...form.register('proposedSolution')}
                placeholder="e.g., A mobile app and website that connects customers directly with a network of vetted local farmers for next-day delivery."
                className="min-h-[100px]"
              />
               {form.formState.errors.proposedSolution && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.proposedSolution.message}
                </p>
              )}
            </div>
            <div className="flex justify-end pt-4">
              <Button type="button" size="lg" onClick={next}>
                <span>Next: Your Profile</span>
                <ArrowRight />
              </Button>
            </div>
          </div>
        );
      case 2: // Profile
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-center">Step 2: Your Personal Profile</h3>
            <p className="text-center text-muted-foreground mb-6">Now, let's understand your unique strengths and preferences.</p>
            <div className="space-y-2">
              <Label htmlFor="expertise">
                What is your professional background or area of expertise?
              </Label>
              <Textarea
                id="expertise"
                {...form.register('expertise')}
                placeholder="e.g., 10 years in software development, certified accountant, expert in digital marketing..."
                className="min-h-[100px]"
              />
              {form.formState.errors.expertise && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.expertise.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="passion">
                What are your personal interests or passions?
              </Label>
              <Textarea
                id="passion"
                {...form.register('passion')}
                placeholder="e.g., Sustainable living, video games, gourmet cooking, teaching, event planning..."
                className="min-h-[100px]"
              />
              {form.formState.errors.passion && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.passion.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>What's your estimated starting budget?</Label>
                <Controller
                  name="budget"
                  control={form.control}
                  render={({field}) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="< MUR 100k">
                          Less than MUR 100,000
                        </SelectItem>
                        <SelectItem value="MUR 100k - 500k">
                          MUR 100,000 - 500,000
                        </SelectItem>
                        <SelectItem value="MUR 500k - 2M">
                          MUR 500,000 - 2M
                        </SelectItem>
                        <SelectItem value="> MUR 2M">More than MUR 2M</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {form.formState.errors.budget && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.budget.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>What's your ideal business style?</Label>
                <Controller
                  name="businessStyle"
                  control={form.control}
                  render={({field}) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 pt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="solo" id="solo" />
                        <Label htmlFor="solo">Solo Founder</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="team" id="team" />
                        <Label htmlFor="team">Team-based</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
                {form.formState.errors.businessStyle && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.businessStyle.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Who is your preferred target audience?</Label>
                <Controller
                  name="targetAudience"
                  control={form.control}
                  render={({field}) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a target" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="B2C">B2C (Business-to-Consumer)</SelectItem>
                        <SelectItem value="B2B">B2B (Business-to-Business)</SelectItem>
                        <SelectItem value="both">Both B2C and B2B</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {form.formState.errors.targetAudience && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.targetAudience.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between pt-4">
                 <Button type="button" size="lg" variant="outline" onClick={prev}>
                    <ArrowLeft />
                    <span>Back to Idea</span>
                </Button>
                <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                    <span>{isLoading ? 'Analyzing...' : 'Get My Personalized Hints'}</span>
                    <ArrowRight />
                </Button>
            </div>
          </div>
        );
      case 3: // Hints
        return (
          <div>
            <h3 className="text-lg font-semibold text-center">Step 3: AI-Powered Sector Hints</h3>
            <p className="text-center text-muted-foreground mb-6">
              Based on your profile, here are some sectors where you might have
              a unique advantage. Select one or enter your own to proceed.
            </p>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {aiResult?.suggestions.map((sector) => (
                  <Card
                    key={sector.title}
                    onClick={() => handleSelectSector(sector.title)}
                    className={cn(
                      'cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary flex flex-col',
                      selectedSector === sector.title
                        ? 'border-primary ring-2 ring-primary shadow-lg'
                        : 'border-border'
                    )}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center justify-between">
                        <span>{sector.title}</span>
                        {selectedSector === sector.title && (
                          <CheckCircle className="text-primary" />
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                      <div className="space-y-2 text-sm bg-muted p-3 rounded-md">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />{' '}
                          <span>{sector.marketSize}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-muted-foreground" />{' '}
                          <span>{sector.marketValue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CircleDollarSign className="h-4 w-4 text-muted-foreground" />{' '}
                          <span>{sector.averageSalePrice}</span>
                        </div>
                      </div>
                      <p className="text-sm font-semibold mb-2">
                        Why it's a good fit for you:
                      </p>
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
            )}

            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-2">
                ...or enter another sector
              </p>
              <Input
                placeholder="e.g., Artificial Intelligence Services"
                className="max-w-md mx-auto"
                value={customSector}
                onChange={handleCustomSectorChange}
              />
            </div>

            <div className="mt-8 flex justify-between">
              <Button size="lg" variant="outline" onClick={prev}>
                <ArrowLeft />
                <span>Back to Profile</span>
              </Button>
              <Button size="lg" disabled={!canProceedFromHints} onClick={next}>
                <span>Next: Get My Assessment</span>
                <ArrowRight />
              </Button>
            </div>
          </div>
        );
      case 4: // Assessment
        return(
            <div>
                <h3 className="text-lg font-semibold text-center">Step 4: AI Assessment & Summary</h3>
                <p className="text-center text-muted-foreground mb-6">Here is the final analysis based on your inputs.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Relevance Score</CardTitle>
                            <CardDescription>How well your profile and idea align with market opportunities.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-6xl font-bold text-primary">{aiResult?.relevanceScore}/10</p>
                        </CardContent>
                    </Card>
                     <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>AI-Suggested Roadmap</CardTitle>
                             <CardDescription>A potential path forward to get you started.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <p className="text-muted-foreground whitespace-pre-wrap">{aiResult?.roadmapSummary}</p>
                        </CardContent>
                    </Card>
                </div>
                 <div className="mt-8 flex justify-between">
                    <Button size="lg" variant="outline" onClick={prev}>
                        <ArrowLeft />
                        <span>Back to Hints</span>
                    </Button>
                    <Button size="lg" asChild>
                        <Link href="/business-creation/business-idea-validation">
                            <span>Next: Validate My Idea</span>
                            <Rocket />
                        </Link>
                    </Button>
                </div>
            </div>
        )
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <Card className="w-full shadow-lg">
        <CardHeader className="text-center items-center">
          <div className="p-4 bg-primary/10 rounded-full">
            <Lightbulb className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="mt-4 text-3xl">AI Business Idea Brainstormer</CardTitle>
          <CardDescription className="max-w-prose">
            A personalized brainstorming experience to find the perfect business
            idea for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Step Indicator */}
          <div className="flex justify-center items-center gap-2 md:gap-4 px-4">
             <div className="flex flex-col items-center gap-1 text-center">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold", getStepClass(1))}>1</div>
              <span className="text-xs font-semibold">Idea</span>
            </div>
            <div className={cn('flex-1 h-0.5', getStepLineClass(2))}></div>
            <div className="flex flex-col items-center gap-1 text-center">
              <div className={cn('w-8 h-8 rounded-full flex items-center justify-center font-bold', getStepClass(2))}>2</div>
              <span className="text-xs font-semibold">Profile</span>
            </div>
            <div className={cn('flex-1 h-0.5', getStepLineClass(3))}></div>
            <div className="flex flex-col items-center gap-1 text-center">
              <div className={cn('w-8 h-8 rounded-full flex items-center justify-center font-bold', getStepClass(3))}>3</div>
              <span className="text-xs font-semibold">Hints</span>
            </div>
             <div className={cn('flex-1 h-0.5', getStepLineClass(4))}></div>
            <div className="flex flex-col items-center gap-1 text-center">
              <div className={cn('w-8 h-8 rounded-full flex items-center justify-center font-bold', getStepClass(4))}>4</div>
              <span className="text-xs font-semibold">Assessment</span>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            {renderContent()}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
