
'use client';

import { useEffect, useState, useMemo } from 'react';
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
import { useAudioPlayerStore } from '@/store/audio-player-store';
import { AiLoadingSpinner } from '@/components/feature/ai-loading-spinner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
                           <Dialog>
                                <DialogTrigger asChild>
                                    <button className="text-muted-foreground"><Info size={16}/></button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>{analysis.requirement}</DialogTitle>
                                    </DialogHeader>
                                    <p>{analysis.explanation}</p>
                                </DialogContent>
                           </Dialog>
                      </TooltipTrigger>
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

export default function ValidationChecklistPage() {
  const { profile } = useBusinessProfileStore();
  const [checklistResult, setChecklistResult] = useState<GenerateComplianceChecklistOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [checkedState, setCheckedState] = useState<CheckedState>({});
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesState>({});
  const { openPlayer } = useAudioPlayerStore();

  useEffect(() => {
    if (profile) {
      setIsLoading(true);
      generateComplianceChecklist(profile)
        .then((result) => {
          setChecklistResult(result);
          const initialChecked: CheckedState = {};
          result.analysis.forEach(item => {
            if (item.isRelevant && item.initialStatus === 'Compliant') {
                 initialChecked[item.requirement] = true;
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
  
  const handleCheckedChange = (requirement: string, checked: boolean) => {
    setCheckedState(prev => ({ ...prev, [requirement]: checked }));
  };

  const handleFileChange = (requirement: string, file: File | null) => {
    setUploadedFiles(prev => ({...prev, [requirement]: file}));
  }

  const completionStats = useMemo(() => {
    if (!checklistResult) return { percent: 0, score: 0 };
    
    const relevantItems = checklistResult.analysis.filter(a => a.isRelevant);
    const totalPossiblePoints = relevantItems.length;

    if (totalPossiblePoints === 0) return { percent: 100, score: 10 };

    let totalScore = 0;
    
    relevantItems.forEach(item => {
      const isTicked = !!checkedState[item.requirement];
      const hasDocument = !!uploadedFiles[item.requirement];

      if (isTicked) {
        totalScore += 0.4;
      }
      if (hasDocument) {
        totalScore += 0.6;
      }
    });

    const finalPercentage = (totalScore / totalPossiblePoints) * 100;
    const finalScore = (totalScore / totalPossiblePoints) * 10;
    
    return {
        percent: Math.round(finalPercentage),
        score: parseFloat(finalScore.toFixed(1)),
    };
  }, [checkedState, uploadedFiles, checklistResult]);
  
  const analysisMap = useMemo(() => {
    if (!checklistResult) return new Map();
    return new Map(checklistResult.analysis.map(a => [a.requirement, a]));
  }, [checklistResult]);

  const handleClaireClick = () => {
    openPlayer('/audio/Claire Presentation.mp3');
  };

  if (isLoading) {
    return <AiLoadingSpinner show={true} />;
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

  const groupedChecklist = PREDEFINED_CHECKLIST.reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {} as Record<string, { category: string; requirement: string }[]>);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Compliance Checklist & Validator</h1>
        <p className="text-muted-foreground">A personalized checklist based on your business profile.</p>
      </div>

      <Card>
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              <Alert>
                <FileText className="h-4 w-4" />
                <AlertTitle>Your Business Summary</AlertTitle>
                <AlertDescription>
                  {checklistResult.businessSummary}
                </AlertDescription>
              </Alert>
              <ComplianceMeter percentage={completionStats.percent} score={completionStats.score} />
          </CardContent>
      </Card>
      
      {/* Main two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5">
                  <Button variant="link" className="p-0 h-auto text-xl" onClick={handleClaireClick}>CLAIRE's</Button>
                  <span>Compliance Summary</span>
              </CardTitle>
              <CardDescription>Key actions required for full compliance based on our analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Summary of Required Actions</AlertTitle>
                  <AlertDescription>
                      <ul className="list-disc pl-5 space-y-1 mt-2">
                          {checklistResult.statusSummary.map((point, index) => (
                              <li key={index} dangerouslySetInnerHTML={{ __html: point.replace(/(MRA|CBRD)/g, '<strong>$1</strong>') }}></li>
                          ))}
                      </ul>
                  </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Checklist</CardTitle>
              <CardDescription>Check off items and upload proof to improve your score.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" defaultValue={Object.keys(groupedChecklist)} className="w-full">
                {Object.entries(groupedChecklist).map(([category, items]) => (
                  <AccordionItem value={category} key={category}>
                    <AccordionTrigger>
                      <h2 className="text-lg font-semibold">{category}</h2>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="divide-y">
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
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
       <div className="flex justify-center pt-4 border-t mt-4">
            <Button variant="outline" className="gap-2">
              <FileDown />
              <span>Download Summary as PDF</span>
            </Button>
      </div>
    </div>
  );
}
