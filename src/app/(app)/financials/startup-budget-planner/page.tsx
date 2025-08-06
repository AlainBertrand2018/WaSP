
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  ArrowLeft,
  ChevronRight,
  CircleHelp,
  CircleDollarSign,
  Landmark,
  Lightbulb,
  Loader2,
  Percent,
  PiggyBank,
  Sparkles,
  Wallet,
  TrendingUp,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { useBusinessIdeaStore } from '@/store/business-idea-store';
import { useBudgetPlannerStore } from '@/store/budget-planner-store';
import { generateFinancingOptions, type FinancingOption } from '@/ai/flows/financials/generate-financing-options-flow';
import { generateProductionCost, type GenerateProductionCostOutput } from '@/ai/flows/financials/generate-production-cost-flow';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

const FinancingOptionCard = ({
  option,
  onAmountChange,
  value,
}: {
  option: FinancingOption;
  onAmountChange: (value: number) => void;
  value: number;
}) => (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <CardDescription>{option.fundingRange}</CardDescription>
            </div>
             <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <button className="text-muted-foreground hover:text-foreground">
                        <CircleHelp size={16}/>
                    </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                        <p>{option.rationale}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{option.description}</p>
      </CardContent>
      <CardFooter>
        <div className="w-full">
            <Label htmlFor={option.title} className="text-xs">Amount to Request (MUR)</Label>
            <Input
                id={option.title}
                type="number"
                value={value || ''}
                onChange={(e) => onAmountChange(Number(e.target.value))}
                placeholder="e.g., 50000"
                className="mt-1"
            />
        </div>
      </CardFooter>
    </Card>
);


const FundingStep = () => {
  const { analysisResult: businessIdea, formData } = useBusinessIdeaStore(
    (state) => state
  );
  const { mvpResult } = useBusinessIdeaStore((state) => ({ mvpResult: state.mvpResult }));
  const { funding, setFunding } = useBudgetPlannerStore();

  const [isLoadingFinancing, setIsLoadingFinancing] = useState(false);
  const [isLoadingProdCost, setIsLoadingProdCost] = useState(false);
  const [financingOptions, setFinancingOptions] = useState<FinancingOption[]>([]);
  const [prodCostResult, setProdCostResult] = useState<GenerateProductionCostOutput | null>(null);

  useEffect(() => {
    const runGenerations = async () => {
      if (businessIdea && mvpResult && formData) {
        setIsLoadingFinancing(true);
        setIsLoadingProdCost(true);
        try {
          const financingResult = await generateFinancingOptions({
            businessIdea: {
              ...businessIdea,
              originalIdea: {
                businessIdeaTitle: formData.businessIdeaTitle,
                ideaDescription: formData.ideaDescription,
              },
            },
            mvpPlan: mvpResult,
          });
          setFinancingOptions(financingResult.financingOptions);
        } catch (error) {
          console.error('Error generating financing options:', error);
        } finally {
          setIsLoadingFinancing(false);
        }
        
        try {
          const prodCostResultData = await generateProductionCost({
             businessIdea: {
              ...businessIdea,
              originalIdea: {
                businessIdeaTitle: formData.businessIdeaTitle,
                ideaDescription: formData.ideaDescription,
              },
            },
            mvpPlan: mvpResult,
          });
          setProdCostResult(prodCostResultData);
        } catch (error) {
          console.error('Error generating production cost:', error);
        } finally {
          setIsLoadingProdCost(false);
        }
      }
    };
    runGenerations();
  }, [businessIdea, mvpResult, formData]);

  const totalRequested = useMemo(
    () => Object.values(funding.requestedAmounts).reduce((sum, amount) => sum + amount, 0),
    [funding.requestedAmounts]
  );
  
  const monthlyRepayment = useMemo(() => {
    if (totalRequested === 0 || funding.loanTerm === 0) return 0;
    const monthlyInterestRate = (funding.interestRate / 100) / 12;
    const numberOfPayments = funding.loanTerm * 12;
    if (monthlyInterestRate === 0) return totalRequested / numberOfPayments;
    const numerator = totalRequested * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
    return numerator / denominator;
  }, [totalRequested, funding.interestRate, funding.loanTerm]);

  useEffect(() => {
    setFunding({ totalRequested, monthlyRepayment });
  }, [totalRequested, monthlyRepayment, setFunding]);

  if (!businessIdea || !formData || !mvpResult) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <Wallet className="h-12 w-12 text-muted" />
        <h2 className="text-2xl font-semibold tracking-tight">
          Let's Plan Your Startup Budget
        </h2>
        <p className="text-muted-foreground max-w-md">
          To generate a budget, you first need to validate your business idea and create an MVP plan.
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

  return (
    <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lightbulb/>
                        <span>MVP Estimated Cost</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">{mvpResult.costEstimation}</p>
                    <p className="text-muted-foreground">This is the estimated cost to develop your Minimum Viable Product.</p>
                </CardContent>
            </Card>
             <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp/>
                        <span>Est. Full Production Cost</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    {isLoadingProdCost ? (
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    ) : prodCostResult ? (
                         <p className="text-4xl font-bold">{prodCostResult.estimatedCost}</p>
                    ) : (
                        <p className="text-muted-foreground">Could not generate estimate.</p>
                    )}
                </CardContent>
                <CardFooter>
                    {prodCostResult && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full gap-2">
                                    <FileText/>
                                    <span>View Justification</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="h-[80vh] flex flex-col">
                                <DialogHeader>
                                <DialogTitle>AI-Generated Justification</DialogTitle>
                                </DialogHeader>
                                <div className="flex-grow overflow-hidden">
                                    <ScrollArea className="h-full pr-6">
                                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                            {prodCostResult.justification}
                                        </p>
                                    </ScrollArea>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </CardFooter>
            </Card>
        </div>


      <div>
        <h3 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles size={20} className="text-primary"/>
            <span>AI-Suggested Financing Strategies</span>
        </h3>
        <p className="text-muted-foreground mt-1">Based on your validated idea, here are some potential funding avenues in Mauritius. Enter the amount you'd like to request from each.</p>
        
        {isLoadingFinancing ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <Card><CardHeader><Skeleton className="h-6 w-1/2"/><Skeleton className="h-4 w-3/4 mt-2"/></CardHeader><CardContent><Skeleton className="h-10 w-full"/></CardContent><CardFooter><Skeleton className="h-10 w-full"/></CardFooter></Card>
                <Card><CardHeader><Skeleton className="h-6 w-1/2"/><Skeleton className="h-4 w-3/4 mt-2"/></CardHeader><CardContent><Skeleton className="h-10 w-full"/></CardContent><CardFooter><Skeleton className="h-10 w-full"/></CardFooter></Card>
                <Card><CardHeader><Skeleton className="h-6 w-1/2"/><Skeleton className="h-4 w-3/4 mt-2"/></CardHeader><CardContent><Skeleton className="h-10 w-full"/></CardContent><CardFooter><Skeleton className="h-10 w-full"/></CardFooter></Card>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {financingOptions.map((option) => (
                    <FinancingOptionCard
                        key={option.title}
                        option={option}
                        value={funding.requestedAmounts[option.title] || 0}
                        onAmountChange={(value) => setFunding({
                            requestedAmounts: {
                                ...funding.requestedAmounts,
                                [option.title]: value
                            }
                        })}
                    />
                ))}
            </div>
        )}
      </div>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Landmark />
            <span>Loan Repayment Calculator</span>
          </CardTitle>
          <CardDescription>
            Estimate your monthly repayments based on the total funding requested.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="interestRate" className="flex items-center gap-2 mb-2">
                            <Percent size={16}/>
                            <span>Interest Rate (%)</span>
                        </Label>
                        <Slider
                            id="interestRate"
                            min={1} max={15} step={0.1}
                            value={[funding.interestRate]}
                            onValueChange={([value]) => setFunding({ interestRate: value })}
                        />
                        <p className="text-center font-semibold mt-2">{funding.interestRate.toFixed(1)}%</p>
                    </div>
                     <div>
                        <Label htmlFor="loanTerm" className="flex items-center gap-2 mb-2">
                            <Wallet size={16}/>
                            <span>Loan Term (Years)</span>
                        </Label>
                        <Slider
                            id="loanTerm"
                            min={1} max={10} step={1}
                            value={[funding.loanTerm]}
                            onValueChange={([value]) => setFunding({ loanTerm: value })}
                        />
                        <p className="text-center font-semibold mt-2">{funding.loanTerm} years</p>
                    </div>
                </div>
                <div className="bg-muted p-6 rounded-lg flex flex-col items-center justify-center text-center">
                    <p className="text-sm text-muted-foreground">Total Funding Requested</p>
                    <p className="text-3xl font-bold">
                        {new Intl.NumberFormat('en-MU', { style: 'currency', currency: 'MUR' }).format(totalRequested)}
                    </p>
                    <hr className="my-4 w-full border-border"/>
                    <p className="text-sm text-muted-foreground">Est. Monthly Repayment</p>
                    <p className="text-3xl font-bold text-primary">
                        {new Intl.NumberFormat('en-MU', { style: 'currency', currency: 'MUR' }).format(monthlyRepayment)}
                    </p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};


export default function StartupBudgetPlannerPage() {
    return (
      <div className="flex flex-col gap-8 py-8 max-w-5xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Startup Budget Planner</h1>
          <p className="text-muted-foreground">
            Plan and manage your startup's initial budget and forecast expenses.
          </p>
        </div>
        
        <Tabs defaultValue="funding" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="funding">1. Funding</TabsTrigger>
                <TabsTrigger value="fixed-costs" disabled>2. Fixed Costs</TabsTrigger>
                <TabsTrigger value="variable-costs" disabled>3. Variable Costs</TabsTrigger>
                <TabsTrigger value="summary" disabled>4. Summary & Forecast</TabsTrigger>
            </TabsList>
            <TabsContent value="funding" className="pt-6">
               <FundingStep />
            </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4 border-t mt-4">
           <Button className="group">
                <span>Next: Fixed Costs</span>
                <ChevronRight className="transition-transform group-hover:translate-x-1" />
           </Button>
        </div>
      </div>
    );
  }

    