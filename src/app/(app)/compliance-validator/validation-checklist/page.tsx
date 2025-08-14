
'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  generateComplianceChecklist,
  type GenerateComplianceChecklistOutput,
  type ChecklistItemAnalysis,
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
import { ArrowLeft, Check, FileDown, Info, Loader2, X, FileText, Upload } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import ComplianceMeter from '@/components/feature/compliance-meter';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

type UploadedFilesState = {
  [requirement: string]: File | null;
};

type CheckedState = {
  [requirement:string]: boolean;
};

// This is now the single source of truth for the checklist structure.
const PREDEFINED_CHECKLIST = [
    { category: "Registration & Legal", requirement: "Company Registration Certificate" },
    { category: "Registration & Legal", requirement: "Business Registration Number (BRN)" },
    { category: "MRA Tax Compliance", requirement: "Tax Account Number (TAN)" },
    { category: "MRA Tax Compliance", requirement: "VAT Registration Certificate" },
    { category: "MRA Tax Compliance", requirement: "PAYE Registration" },
    { category: "MRA Tax Compliance", requirement: "CSG / NSF Registration" },
    { category: "Data Protection", requirement: "Data Protection Office (DPO) Registration" },
    { category: "Employment Law", requirement: "Employee Contracts" },
    { category: "Industry-Specific", requirement: "Construction Industry Development Board (CIDB) Registration" },
    { category: "Industry-Specific", requirement: "Tourism Authority (TA) License" },
    { category: "Industry-Specific", requirement: "Food Handler's Certificate" },
];


const ChecklistItemComponent = ({
  item,
  analysis,
  isChecked,
  uploadedFile,
  onCheckedChange,
  onFileChange,
}: {
  item: { category: string; requirement: string };
  analysis: ChecklistItemAnalysis | undefined;
  isChecked: boolean;
  uploadedFile: File | null;
  onCheckedChange: (checked: boolean) => void;
  onFileChange: (file: File | null) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onFileChange(file || null);
    if(file) {
      toast({
        title: "File Uploaded",
        description: `${file.name} has been successfully attached.`,
      })
    }
  };

  const isRelevant = analysis?.isRelevant;
  const subtext = !isRelevant 
    ? "Not Required For Your Type of Business"
    : uploadedFile
    ? <span className="text-green-600 font-medium">Proof Uploaded: {uploadedFile.name}</span>
    : "Upload proof for a better score.";


  if (!analysis) {
    return (
       <div className="flex items-start gap-4 py-3">
         <Skeleton className="h-6 w-6 rounded" />
         <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
         </div>
       </div>
    );
  }

  return (
    <div className="flex items-start gap-4 py-3">
      <Checkbox
        id={item.requirement}
        checked={isChecked}
        onCheckedChange={(checked) => onCheckedChange(Boolean(checked))}
        disabled={!isRelevant}
        className="mt-1"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <label htmlFor={item.requirement} className={cn('font-medium', !isRelevant ? 'text-muted-foreground line-through' : 'cursor-pointer')}>
            {item.requirement}
          </label>
           <div className="flex items-center gap-2">
              <TooltipProvider>
                  <Tooltip>
                      <TooltipTrigger asChild>
                          <button className="text-muted-foreground"><Info size={16}/></button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="max-w-xs">
                          <p>{analysis.explanation}</p>
                      </TooltipContent>
                  </Tooltip>
              </TooltipProvider>
              {isRelevant && (
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => fileInputRef.current?.click()}>
                    <Upload size={14} />
                    <span className="sr-only">Upload Document</span>
                </Button>
              )}
          </div>
        </div>
         <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*,application/pdf"
        onChange={handleFileChange}
      />
    </div>
  );
};


const ChecklistSkeleton = () => (
    <div className="space-y-6">
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
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesState>({});

  useEffect(() => {
    if (profile) {
      setIsLoading(true);
      generateComplianceChecklist(profile)
        .then((result) => {
          setChecklistResult(result);
          const initialChecked: CheckedState = {};
          result.analysis.forEach(item => {
            initialChecked[item.requirement] = item.initialStatus === 'Compliant';
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

  const handleFileChange = (requirement: string, file: File | null) => {
    setUploadedFiles(prev => ({...prev, [requirement]: file}));
  }

  const groupedChecklist = useMemo(() => {
    return PREDEFINED_CHECKLIST.reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {} as Record<string, { category: string; requirement: string }[]>);
  }, []);

  const completionStats = useMemo(() => {
    if (!checklistResult) return { percent: 0 };

    const relevantItems = checklistResult.analysis.filter(a => a.isRelevant);
    const totalPossiblePoints = relevantItems.length;

    if (totalPossiblePoints === 0) return { percent: 100 };

    let totalScore = 0;
    
    relevantItems.forEach(item => {
        const isChecked = !!checkedState[item.requirement];
        const hasDocument = !!uploadedFiles[item.requirement];
        
        if (isChecked) {
            totalScore += 0.4; // Ticking the box accounts for 40% of the item's score
        }
        if (hasDocument) {
             totalScore += 0.6; // Uploading proof accounts for the other 60%
        }
    });

    const finalPercentage = totalPossiblePoints > 0 ? (totalScore / totalPossiblePoints) * 100 : 100;
    
    return {
        percent: Math.round(finalPercentage),
    };
}, [checkedState, uploadedFiles, checklistResult]);
  
  const analysisMap = useMemo(() => {
    if (!checklistResult) return new Map();
    return new Map(checklistResult.analysis.map(a => [a.requirement, a]));
  }, [checklistResult]);


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
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compliance Checklist & Validator</h1>
          <p className="text-muted-foreground">A personalized checklist based on your business profile.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <FileDown />
          <span>Download as PDF</span>
        </Button>
      </div>
      
      {/* Top section for summary & score */}
      <Card className="mb-8">
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertTitle>Your Business Summary</AlertTitle>
              <AlertDescription>
                {checklistResult.businessSummary}
              </AlertDescription>
            </Alert>
            <ComplianceMeter percentage={completionStats.percent} />
        </CardContent>
      </Card>

      {/* Main two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
         {/* Left Column (AI Summary) */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>AI Status Summary</CardTitle>
              <CardDescription>Key actions required for full compliance based on our analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Summary of Required Actions</AlertTitle>
                  <AlertDescription>
                      <ul className="list-disc pl-5 space-y-1 mt-2">
                          {checklistResult.statusSummary.map((point, index) => (
                              <li key={index}>{point}</li>
                          ))}
                      </ul>
                  </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (Checklist) */}
        <div className="lg:col-span-2">
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
                          analysis={analysisMap.get(item.requirement)}
                          isChecked={!!checkedState[item.requirement]}
                          uploadedFile={uploadedFiles[item.requirement] || null}
                          onCheckedChange={(checked) => handleCheckedChange(item.requirement, checked)}
                          onFileChange={(file) => handleFileChange(item.requirement, file)}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Card>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
