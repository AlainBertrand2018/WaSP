
'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  generateComplianceChecklist,
  type ChecklistItem,
  type GenerateComplianceChecklistOutput,
} from '@/ai/flows/business-management/generate-compliance-checklist-flow';
import { useBusinessProfileStore } from '@/store/business-profile-store';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Check, FileDown, Info, Loader2, X, FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import ComplianceMeter from '@/components/feature/compliance-meter';

type CheckedState = {
  [requirement: string]: boolean;
};

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  'Compliant': 'default',
  'Action Required': 'destructive',
  'Not Applicable': 'secondary',
};

const ChecklistItemComponent = ({
  item,
  isChecked,
  onCheckedChange,
}: {
  item: ChecklistItem;
  isChecked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => (
  <div className="flex items-start gap-4 py-3">
    <Checkbox
      id={item.requirement}
      checked={isChecked}
      onCheckedChange={onCheckedChange}
      className="mt-1"
    />
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <label htmlFor={item.requirement} className="font-medium cursor-pointer">
          {item.requirement}
        </label>
        <div className="flex items-center gap-2">
           <Badge variant={statusVariant[item.initialStatus]}>AI Status: {item.initialStatus}</Badge>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button className="text-muted-foreground"><Info size={16}/></button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-xs">
                        <p>{item.explanation}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
      </div>
    </div>
  </div>
);

const ChecklistSkeleton = () => (
    <div className="space-y-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-6 w-full" />
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-1/3" />
            </CardHeader>
             <CardContent className="space-y-4">
                <Skeleton className="h-20 w-full" />
            </CardContent>
        </Card>
        {[...Array(2)].map((_, i) => (
            <Card key={i}>
                <CardHeader>
                    <Skeleton className="h-6 w-1/3" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-4 items-center">
                        <Skeleton className="h-6 w-6 rounded" />
                        <Skeleton className="h-5 w-4/5" />
                    </div>
                     <div className="flex gap-4 items-center">
                        <Skeleton className="h-6 w-6 rounded" />
                        <Skeleton className="h-5 w-3/4" />
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
);

export default function ValidationChecklistPage() {
  const { profile } = useBusinessProfileStore();
  const [checklistResult, setChecklistResult] = useState<GenerateComplianceChecklistOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [checkedState, setCheckedState] = useState<CheckedState>({});

  useEffect(() => {
    if (profile) {
      setIsLoading(true);
      generateComplianceChecklist(profile)
        .then((result) => {
          setChecklistResult(result);
          // Initialize checked state based on AI's initial status
          const initialChecked: CheckedState = {};
          result.checklist.forEach(item => {
            initialChecked[item.requirement] = item.initialStatus === 'Compliant' || item.initialStatus === 'Not Applicable';
          });
          setCheckedState(initialChecked);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
        setIsLoading(false);
    }
  }, [profile]);
  
  const handleCheckedChange = (requirement: string, checked: boolean) => {
    setCheckedState(prev => ({ ...prev, [requirement]: checked }));
  };

  const groupedChecklist = useMemo(() => {
    if (!checklistResult) return {};
    return checklistResult.checklist.reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {} as Record<string, ChecklistItem[]>);
  }, [checklistResult]);

  const completionStats = useMemo(() => {
    const totalItems = checklistResult?.checklist.length || 0;
    if (totalItems === 0) return { percent: 0, checked: 0, total: 0 };
    const checkedItems = Object.values(checkedState).filter(Boolean).length;
    return {
        percent: Math.round((checkedItems / totalItems) * 100),
        checked: checkedItems,
        total: totalItems,
    };
  }, [checkedState, checklistResult]);

  if (isLoading) {
    return <ChecklistSkeleton />;
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <X className="h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-semibold tracking-tight">No Business Profile Found</h2>
        <p className="text-muted-foreground max-w-md">
          To generate a personalized compliance checklist, you need to complete the business profile onboarding first.
        </p>
        <Button asChild className="group">
          <Link href="/business-management">
            <ArrowLeft className="mr-2" />
            <span>Complete Your Profile</span>
          </Link>
        </Button>
      </div>
    );
  }
  
  if (!checklistResult) {
     return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <X className="h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-semibold tracking-tight">Could Not Generate Checklist</h2>
        <p className="text-muted-foreground max-w-md">
          There was an error generating your compliance checklist. Please try again later.
        </p>
      </div>
     )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Compliance Checklist</h1>
            <p className="text-muted-foreground">A personalized checklist based on your business profile.</p>
        </div>
        <Button variant="outline" className="gap-2">
            <FileDown />
            <span>Download as PDF</span>
        </Button>
      </div>

       <Alert>
          <FileText className="h-4 w-4" />
          <AlertTitle>Your Business Summary</AlertTitle>
          <AlertDescription>
            {checklistResult.businessSummary}
          </AlertDescription>
        </Alert>

       <Card>
            <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
            </CardHeader>
            <CardContent>
                <ComplianceMeter percentage={completionStats.percent} />
                 <Alert className="mt-4">
                    <Info className="h-4 w-4" />
                    <AlertTitle>AI Status Summary</AlertTitle>
                    <AlertDescription>
                        {checklistResult.statusSummary}
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>

      <Accordion type="multiple" defaultValue={Object.keys(groupedChecklist)} className="w-full space-y-4">
        {Object.entries(groupedChecklist).map(([category, items]) => (
          <Card key={category}>
             <AccordionItem value={category} className="border-b-0">
                <AccordionTrigger className="p-4 hover:no-underline">
                    <h2 className="text-lg font-semibold">{category}</h2>
                </AccordionTrigger>
                <AccordionContent>
                   <div className="divide-y px-4 pb-4">
                        {items.map((item) => (
                            <ChecklistItemComponent
                                key={item.requirement}
                                item={item}
                                isChecked={!!checkedState[item.requirement]}
                                onCheckedChange={(checked) => handleCheckedChange(item.requirement, !!checked)}
                            />
                        ))}
                   </div>
                </AccordionContent>
            </AccordionItem>
          </Card>
        ))}
      </Accordion>
    </div>
  );
}
