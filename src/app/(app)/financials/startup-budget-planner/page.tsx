
// Fixed version of Startup Budget Planner page to resolve JSX parsing errors
// File: src/app/(app)/financials/startup-budget-planner/page.tsx

'use client';

import { useEffect, useState, useMemo } from 'react';
import React from 'react';
import Link from 'next/link';

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
import { Slider } from '@/components/ui/slider';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Icons
import {
  ArrowLeft,
  BarChart,
  Briefcase,
  Calculator,
  ChevronRight,
  CircleHelp,
  Landmark,
  Lightbulb,
  Loader2,
  Package,
  Percent,
  PiggyBank,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
  FileText,
  Building,
} from 'lucide-react';

// Stores
import { useBusinessIdeaStore } from '@/store/business-idea-store';
import { useBudgetPlannerStore } from '@/store/budget-planner-store';

// AI helpers
import {
  generateFinancingOptions,
  type FinancingOption,
} from '@/ai/flows/financials/generate-financing-options-flow';
import {
  generateProductionCost,
  type GenerateProductionCostOutput,
} from '@/ai/flows/financials/generate-production-cost-flow';
import {
  generateFixedCosts,
  type FixedCostItem,
} from '@/ai/flows/financials/generate-fixed-costs-flow';
import {
  generateVariableCosts,
  type VariableCostItem,
} from '@/ai/flows/financials/generate-variable-costs-flow';
import {
  generateBudgetSummary,
  type GenerateBudgetSummaryOutput,
} from '@/ai/flows/financials/generate-budget-summary-flow';

import { cn } from '@/lib/utils';

/*******************************************************************************
 * 1. Funding Step
 ******************************************************************************/

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
                <CircleHelp size={16} />
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
        <Label htmlFor={option.title} className="text-xs">
          Amount to Request (MUR)
        </Label>
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
    (state) => state,
  );
  const { mvpResult } = useBusinessIdeaStore((state) => ({
    mvpResult: state.mvpResult,
  }));
  const { funding, setFunding } = useBudgetPlannerStore();

  const [isLoadingFinancing, setIsLoadingFinancing] = useState(false);
  const [isLoadingProdCost, setIsLoadingProdCost] = useState(false);
  const [financingOptions, setFinancingOptions] = useState<FinancingOption[]>(
    [],
  );
  const [prodCostResult, setProdCostResult] =
    useState<GenerateProductionCostOutput | null>(null);

  /** Fetch AI suggestions once dependencies are available */
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
          // eslint-disable-next-line no-console
          console.error('Error generating financing options:', error);
        } finally {
          setIsLoadingFinancing(false);
        }

        try {
          const prodCostData = await generateProductionCost({
            businessIdea: {
              ...businessIdea,
              originalIdea: {
                businessIdeaTitle: formData.businessIdeaTitle,
                ideaDescription: formData.ideaDescription,
              },
            },
            mvpPlan: mvpResult,
          });
          setProdCostResult(prodCostData);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error generating production cost:', error);
        } finally {
          setIsLoadingProdCost(false);
        }
      }
    };

    runGenerations();
  }, [businessIdea, mvpResult, formData]);

  /** Derived values */
  const totalRequested = useMemo(
    () =>
      Object.values(funding.requestedAmounts).reduce(
        (sum, amount) => sum + amount,
        0,
      ),
    [funding.requestedAmounts],
  );

  const monthlyRepayment = useMemo(() => {
    if (totalRequested === 0 || funding.loanTerm === 0) return 0;
    const monthlyInterestRate = funding.interestRate / 100 / 12;
    const numberOfPayments = funding.loanTerm * 12;
    if (monthlyInterestRate === 0) return totalRequested / numberOfPayments;
    const numerator =
      totalRequested *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
    return numerator / denominator;
  }, [totalRequested, funding.interestRate, funding.loanTerm]);

  /** Sync repayment + requested total to global store */
  useEffect(() => {
    setFunding({ totalRequested, monthlyRepayment });
  }, [totalRequested, monthlyRepayment, setFunding]);

  /** Guard: need previous steps */
  if (!businessIdea || !formData || !mvpResult) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <Wallet className="h-12 w-12 text-muted" />
        <h2 className="text-2xl font-semibold tracking-tight">
          Let's Plan Your Startup Budget
        </h2>
        <p className="text-muted-foreground max-w-md">
          To generate a budget, you first need to validate your business idea and
          create an MVP plan.
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

  /** ------------------- JSX ------------------- */
  return (
    <div className="space-y-8">
      {/* TOP METRICS */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* MVP COST */}
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb />
              <span>MVP Estimated Cost</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{mvpResult.costEstimation}</p>
            <p className="text-muted-foreground">
              This is the estimated cost to develop your Minimum Viable Product.
            </p>
          </CardContent>
        </Card>

        {/* FULL PRODUCTION COST */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp />
              <span>Est. Full Production Cost</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            {isLoadingProdCost ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-full mt-1" />
              </div>
            ) : prodCostResult ? (
              <p className="text-4xl font-bold">
                {prodCostResult.estimatedCost}
              </p>
            ) : (
              <p className="text-muted-foreground">Could not generate estimate.</p>
            )}
          </CardContent>
          <CardFooter>
            {prodCostResult && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full gap-2">
                    <FileText />
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

      {/* FINANCING STRATEGIES */}
      <div>
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Sparkles size={20} className="text-primary" />
          <span>AI-Suggested Financing Strategies</span>
        </h3>
        <p className="text-muted-foreground mt-1">
          Based on your validated idea, here are some potential funding avenues
          in Mauritius. Enter the amount you'd like to request from each.
        </p>

        {isLoadingFinancing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {financingOptions.map((option) => (
              <FinancingOptionCard
                key={option.title}
                option={option}
                value={funding.requestedAmounts[option.title] || 0}
                onAmountChange={(value) =>
                  setFunding({
                    requestedAmounts: {
                      ...funding.requestedAmounts,
                      [option.title]: value,
                    },
                  })
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* REPAYMENT CALCULATOR */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Landmark />
            <span>Loan Repayment Calculator</span>
          </CardTitle>
          <CardDescription>
            Estimate your monthly repayments based on the total funding
            requested.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sliders */}
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="interestRate"
                  className="flex items-center gap-2 mb-2"
                >
                  <Percent size={16} />
                  <span>Interest Rate (%)</span>
                </Label>
                <Slider
                  id="interestRate"
                  min={1}
                  max={15}
                  step={0.1}
                  value={[funding.interestRate]}
                  onValueChange={([value]) => setFunding({ interestRate: value })}
                />
                <p className="text-center font-semibold mt-2">
                  {funding.interestRate.toFixed(1)}%
                </p>
              </div>
              <div>
                <Label htmlFor="loanTerm" className="flex items-center gap-2 mb-2">
                  <Wallet size={16} />
                  <span>Loan Term (Years)</span>
                </Label>
                <Slider
                  id="loanTerm"
                  min={1}
                  max={10}
                  step={1}
                  value={[funding.loanTerm]}
                  onValueChange={([value]) => setFunding({ loanTerm: value })}
                />
                <p className="text-center font-semibold mt-2">
                  {funding.loanTerm} years
                </p>
              </div>
            </div>

            {/* Totals */}
            <div className="bg-muted p-6 rounded-lg flex flex-col items-center justify-center text-center">
              <p className="text-sm text-muted-foreground">Total Funding Requested</p>
              <p className="text-3xl font-bold">
                {new Intl.NumberFormat('en-MU', {
                  style: 'currency',
                  currency: 'MUR',
                }).format(totalRequested)}
              </p>
              <hr className="my-4 w-full border-border" />
              <p className="text-sm text-muted-foreground">Est. Monthly Repayment</p>
              <p className="text-3xl font-bold text-primary">
                {new Intl.NumberFormat('en-MU', {
                  style: 'currency',
                  currency: 'MUR',
                }).format(monthlyRepayment)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/*******************************************************************************
 * 2. Costs Step
 ******************************************************************************/
const CostCategory = ({
  title,
  items,
  costs,
  onCostChange,
  children,
}: {
  title: string;
  items: { name: string; description: string }[];
  costs: { [key: string]: number };
  onCostChange: (name: string, value: number) => void;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <div key={item.name} className="space-y-2">
          <Label htmlFor={item.name} className="flex items-center gap-2">
            {children}
            <span>{item.name}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground">
                    <CircleHelp size={14} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Input
            id={item.name}
            type="number"
            value={costs[item.name] || ''}
            onChange={(e) => onCostChange(item.name, Number(e.target.value))}
            placeholder="0"
          />
        </div>
      ))}
    </div>
  </div>
);


const FixedCostsTab = () => {
    const { analysisResult: businessIdea, formData } = useBusinessIdeaStore(
      (state) => state,
    );
    const { fixedCosts, setFixedCost, setTotalFixedCosts } = useBudgetPlannerStore();

    const [isLoading, setIsLoading] = useState(false);
    const [costItems, setCostItems] = useState<FixedCostItem[]>([]);

    useEffect(() => {
      const runGeneration = async () => {
        if (businessIdea && formData) {
          setIsLoading(true);
          try {
            const result = await generateFixedCosts({
              ...businessIdea,
              originalIdea: {
                businessIdeaTitle: formData.businessIdeaTitle,
                ideaDescription: formData.ideaDescription,
              },
            });
            setCostItems(result.fixedCosts);
          } catch (error) {
            console.error('Error generating fixed costs:', error);
          } finally {
            setIsLoading(false);
          }
        }
      };
      runGeneration();
    }, [businessIdea, formData]);

    const totalFixedCosts = useMemo(
      () => Object.values(fixedCosts).reduce((sum, amount) => sum + amount, 0),
      [fixedCosts],
    );

    useEffect(() => {
      setTotalFixedCosts(totalFixedCosts);
    }, [totalFixedCosts, setTotalFixedCosts]);

    const groupedCosts = useMemo(() => {
      return costItems.reduce(
        (acc, item) => {
          (acc[item.category] = acc[item.category] || []).push(item);
          return acc;
        },
        {} as { [key: string]: FixedCostItem[] },
      );
    }, [costItems]);

    if (isLoading) {
      return (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-6 w-1/4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>
            </div>
          ))}
        </div>
      );
    }
  
    return (
      <CardContent className="space-y-8">
        {Object.entries(groupedCosts).map(([category, items]) => (
          <CostCategory
            key={category}
            title={category}
            items={items}
            costs={fixedCosts}
            onCostChange={setFixedCost}
          >
            <Building size={16} className="text-muted-foreground" />
          </CostCategory>
        ))}
        <CardFooter className="justify-end p-0">
          <div className="text-right">
            <p className="text-muted-foreground">Total Monthly Fixed Costs</p>
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat('en-MU', {
                style: 'currency',
                currency: 'MUR',
              }).format(totalFixedCosts)}
            </p>
          </div>
        </CardFooter>
      </CardContent>
    );
};

const VariableCostsTab = () => {
    const { analysisResult: businessIdea, formData } = useBusinessIdeaStore(
      (state) => state,
    );
    const { variableCosts, setVariableCost, setTotalVariableCosts } =
      useBudgetPlannerStore();

    const [isLoading, setIsLoading] = useState(false);
    const [costItems, setCostItems] = useState<VariableCostItem[]>([]);

    useEffect(() => {
      const runGeneration = async () => {
        if (businessIdea && formData) {
          setIsLoading(true);
          try {
            const result = await generateVariableCosts({
              ...businessIdea,
              originalIdea: {
                businessIdeaTitle: formData.businessIdeaTitle,
                ideaDescription: formData.ideaDescription,
              },
            });
            setCostItems(result.variableCosts);
          } catch (error) {
            console.error('Error generating variable costs:', error);
          } finally {
            setIsLoading(false);
          }
        }
      };
      runGeneration();
    }, [businessIdea, formData]);

    const totalVariableCosts = useMemo(
      () =>
        Object.values(variableCosts).reduce((sum, amount) => sum + amount, 0),
      [variableCosts],
    );

    useEffect(() => {
      setTotalVariableCosts(totalVariableCosts);
    }, [totalVariableCosts, setTotalVariableCosts]);
    
    const groupedCosts = useMemo(() => {
      return costItems.reduce(
        (acc, item) => {
          (acc[item.category] = acc[item.category] || []).push(item);
          return acc;
        },
        {} as { [key: string]: VariableCostItem[] },
      );
    }, [costItems]);

    if (isLoading) {
      return (
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-6 w-1/4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <CardContent className="space-y-8">
        {Object.entries(groupedCosts).map(([category, items]) => (
          <CostCategory
            key={category}
            title={category}
            items={items}
            costs={variableCosts}
            onCostChange={setVariableCost}
          >
            <Package size={16} className="text-muted-foreground" />
          </CostCategory>
        ))}
        <CardFooter className="justify-end p-0">
          <div className="text-right">
            <p className="text-muted-foreground">Total Variable Costs Per Unit</p>
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat('en-MU', {
                style: 'currency',
                currency: 'MUR',
              }).format(totalVariableCosts)}
            </p>
          </div>
        </CardFooter>
      </CardContent>
    );
};


const CostsStep = () => {
  const { salePrice, setSalePrice } = useBudgetPlannerStore();

  return (
    <Tabs defaultValue="fixed">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="fixed">Monthly Fixed Costs</TabsTrigger>
        <TabsTrigger value="variable">Variable Costs Per Unit</TabsTrigger>
      </TabsList>
      <TabsContent value="fixed">
        <Card>
          <CardHeader>
            <CardTitle>Fixed Costs</CardTitle>
            <CardDescription>
              Enter all your recurring monthly costs that do not change with
              the number of sales.
            </CardDescription>
          </CardHeader>
          <FixedCostsTab />
        </Card>
      </TabsContent>
      <TabsContent value="variable">
        <Card>
          <CardHeader>
            <CardTitle>Variable Costs</CardTitle>
            <CardDescription>
              Enter all costs that are directly associated with producing ONE
              unit of your product or service.
            </CardDescription>
          </CardHeader>
          <VariableCostsTab />
        </Card>
      </TabsContent>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Sale Price</CardTitle>
          <CardDescription>
            Finally, what is the price you will charge customers for one unit
            of your product or service?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="sale-price">Sale Price Per Unit (MUR)</Label>
          <Input
            id="sale-price"
            type="number"
            value={salePrice || ''}
            onChange={(e) => setSalePrice(Number(e.target.value))}
            placeholder="e.g. 1500"
            className="max-w-xs"
          />
        </CardContent>
      </Card>
    </Tabs>
  );
};


/*******************************************************************************
 * 3. Summary Step
 ******************************************************************************/

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-background/80 border rounded-lg shadow-lg">
          <p className="label font-bold">{`Units Sold: ${label}`}</p>
          <p className="text-blue-500">{`Revenue: ${payload[0].value.toLocaleString()} MUR`}</p>
          <p className="text-red-500">{`Costs: ${payload[1].value.toLocaleString()} MUR`}</p>
          <p className="text-green-500">{`Profit: ${(payload[0].value - payload[1].value).toLocaleString()} MUR`}</p>
        </div>
      );
    }
  
    return null;
};

const SummaryStep = () => {
    const {
      totalFixedCosts,
      totalVariableCosts,
      salePrice,
      summary,
      setSummary,
    } = useBudgetPlannerStore();
    const { formData } = useBusinessIdeaStore();

    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateSummary = async () => {
      if (!salePrice || !formData?.sector) {
        console.error('Sale price and sector are required to generate a summary.');
        // Consider adding a user-facing error message (toast)
        return;
      }
      setIsLoading(true);
      setSummary(null);
      try {
        const result = await generateBudgetSummary({
          sector: formData.sector,
          totalFixedCosts,
          totalVariableCosts,
          salePricePerUnit: salePrice,
        });
        setSummary(result);
      } catch (error) {
        console.error('Error generating budget summary:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-MU', {
          style: 'currency',
          currency: 'MUR',
        }).format(value);
    };

    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight">
            Analyzing Your Budget
          </h2>
          <p className="text-muted-foreground max-w-md text-center">
            Our AI financial analyst is running the numbers and creating your
            break-even analysis.
          </p>
        </div>
      );
    }
  
    return (
      <div className="space-y-6">
        {!summary ? (
          <Card>
            <CardHeader>
                <CardTitle>Ready for the Big Picture?</CardTitle>
                <CardDescription>
                    You've entered all your financial data. Click the button below to
                    let our AI analyze your budget, calculate your break-even point,
                    and forecast your potential profitability.
                </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={handleGenerateSummary} disabled={isLoading || !salePrice} className="gap-2">
                <Sparkles />
                <span>Analyze & Forecast</span>
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target />
                    <span>Break-Even Point</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    {summary.breakEvenUnits.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground">units per month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <PiggyBank />
                    <span>Break-Even Revenue</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    {formatCurrency(summary.breakEvenRevenue)}
                  </p>
                  <p className="text-muted-foreground">per month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp />
                    <span>Market Growth Est.</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    {summary.marketGrowthEstimate}
                  </p>
                  <p className="text-muted-foreground">annual growth for sector</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart />
                  <span>Profitability Forecast</span>
                </CardTitle>
                <CardDescription>
                  This chart projects your potential profit based on the number
                  of units you sell each month. The intersection point is your
                  break-even.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={summary.forecast}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="unitsSold" />
                    <YAxis tickFormatter={(value) => value.toLocaleString()} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.2}
                      name="Revenue"
                    />
                    <Area
                      type="monotone"
                      dataKey="costs"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.2}
                      name="Costs"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>AI Financial Analyst Summary</AlertTitle>
              <AlertDescription className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                {summary.summary}
              </AlertDescription>
            </Alert>
            
            <Alert variant="destructive">
              <Briefcase className="h-4 w-4" />
              <AlertTitle>Conservative Growth Outlook</AlertTitle>
              <AlertDescription className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                {summary.conservativeGrowthOutlook}
              </AlertDescription>
            </Alert>

             <div className="flex justify-center pt-4 border-t mt-4">
               <Button asChild className="group">
                  <Link href="/business-management/business-plan-generator">
                    <span>Next: Generate Business Plan</span>
                    <ChevronRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
            </div>
          </div>
        )}
      </div>
    );
};

/*******************************************************************************
 * Main Page Component
 ******************************************************************************/
export default function StartupBudgetPlannerPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const goToStep = (step: number) => setCurrentStep(step);

  const steps = [
    { id: 1, name: 'Funding', component: <FundingStep /> },
    { id: 2, name: 'Costs', component: <CostsStep /> },
    { id: 3, name: 'Summary & Forecast', component: <SummaryStep /> },
  ];

  const { component } = steps[currentStep - 1];

  return (
    <div className="flex flex-col gap-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Startup Budget Planner
        </h1>
        <p className="text-muted-foreground">
          Plan your startup's finances from funding to profitability.
        </p>
      </div>

      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <button
                onClick={() => goToStep(step.id)}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                  currentStep >= step.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {step.id}
              </button>
              <p
                className={cn(
                  'mt-2 text-sm text-center',
                  currentStep >= step.id ? 'font-semibold' : 'text-muted-foreground',
                )}
              >
                {step.name}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-1 transition-colors',
                  currentStep > index + 1 ? 'bg-primary' : 'bg-muted',
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">{component}</CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button
            onClick={nextStep}
            disabled={currentStep === totalSteps}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

    