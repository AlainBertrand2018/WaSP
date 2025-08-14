
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
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import ComplianceMeter from '@/components/feature/compliance-meter';

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
}: {
  item: { category: string; requirement: string };
  analysis: ChecklistItemAnalysis | undefined;
  isChecked: boolean;
  uploadedFile: File | null;
  onCheckedChange: (checked: boolean) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCheckboxClick = (checked: boolean) => {
    onCheckedChange(checked);
    // If checking the box and it's relevant, trigger file upload
    if (checked && analysis?.isRelevant && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onCheckedChange(true, file); // This will be a new function signature
    } else {
        // If user cancels file selection, uncheck the box
        onCheckedChange(false, null);
    }
  };


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

  const isRelevant = analysis.isRelevant;

  return (
    <div className="flex items-start gap-4 py-3">
      <Checkbox
        id={item.requirement}
        checked={isChecked}
        onCheckedChange={handleCheckboxClick}
        disabled={!isRelevant}
        className="mt-1"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <label htmlFor={item.requirement} className={`font-medium ${!isRelevant ? 'text-muted-foreground line-through' : 'cursor-pointer'}`}>
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
          </div>
        </div>
        {!isRelevant ? (
            <p className="text-xs text-muted-foreground">Not Required For Your Type of Business</p>
        ) : uploadedFile ? (
            <p className="text-xs text-green-600 font-medium mt-1">Uploaded: {uploadedFile.name}</p>
        ) : (
             <p className="text-xs text-muted-foreground mt-1">Please check the box to upload the document.</p>
        )}
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
          // Initialize checked state based on AI's initial status, only if relevant
          const initialChecked: CheckedState = {};
          result.analysis.forEach(item => {
            if (item.isRelevant && (item.initialStatus === 'Compliant' || item.initialStatus === 'Not Applicable')) {
                initialChecked[item.requirement] = true;
            } else {
                initialChecked[item.requirement] = false;
            }
          });
          setCheckedState(initialChecked);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
        setIsLoading(false);
    }
  }, [profile]);
  
  const handleCheckedChange = (requirement: string, file: File | null) => {
    setCheckedState(prev => ({ ...prev, [requirement]: !!file }));
    setUploadedFiles(prev => ({ ...prev, [requirement]: file }));
  };

  const groupedChecklist = useMemo(() => {
    return PREDEFINED_CHECKLIST.reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {} as Record<string, { category: string; requirement: string }[]>);
  }, []);

  const completionStats = useMemo(() => {
    if (!checklistResult) return { percent: 0, checked: 0, total: 0 };
    
    const relevantItems = checklistResult.analysis.filter(a => a.isRelevant);
    const totalRelevant = relevantItems.length;

    if (totalRelevant === 0) return { percent: 100, checked: 0, total: 0 };
    
    const checkedAndUploaded = relevantItems.filter(item => {
        return checkedState[item.requirement] && uploadedFiles[item.requirement];
    }).length;
    
    return {
        percent: Math.round((checkedAndUploaded / totalRelevant) * 100),
        checked: checkedAndUploaded,
        total: totalRelevant,
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
                        <ul className="list-disc pl-5 space-y-1">
                            {checklistResult.statusSummary.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
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
                                analysis={analysisMap.get(item.requirement)}
                                isChecked={!!checkedState[item.requirement]}
                                uploadedFile={uploadedFiles[item.requirement] || null}
                                onCheckedChange={(checked, file) => handleCheckedChange(item.requirement, file)}
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
