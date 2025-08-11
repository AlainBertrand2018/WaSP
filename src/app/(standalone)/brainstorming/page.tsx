
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Lightbulb, Loader2, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { generatePromisingSectors, type PromisingSector } from '@/ai/flows/ideation/generate-promising-sectors-flow';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';


export default function BrainstormingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sectors, setSectors] = useState<PromisingSector[]>([]);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [customSector, setCustomSector] = useState('');

  useEffect(() => {
    const fetchSectors = async () => {
      setIsLoading(true);
      try {
        const result = await generatePromisingSectors();
        setSectors(result.sectors);
      } catch (error) {
        console.error('Error fetching promising sectors:', error);
        // Handle error state in UI, maybe show a toast
      } finally {
        setIsLoading(false);
      }
    };
    fetchSectors();
  }, []);

  const handleSelectSector = (sectorTitle: string) => {
    setCustomSector(''); // Clear custom input if a card is selected
    if (selectedSector === sectorTitle) {
      setSelectedSector(null); // Deselect if clicked again
    } else {
      setSelectedSector(sectorTitle);
    }
  };
  
  const handleCustomSectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSector(null); // Clear card selection if user types
    setCustomSector(e.target.value);
  }

  const canProceed = selectedSector || customSector.trim();

  const handleNextStep = () => {
    if (!canProceed) return;
    setCurrentStep(2);
    // In a real multi-step app, you would now use the `selectedSector` or `customSector`
    // to feed into the next AI flow.
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <Card className="w-full shadow-lg">
        <CardHeader className="text-center items-center">
          <div className="p-4 bg-primary/10 rounded-full">
              <Lightbulb className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="mt-4 text-3xl">AI Business Idea Brainstormer</CardTitle>
          <CardDescription className="max-w-prose">
            {currentStep === 1 ? "Let's start by exploring the most promising sectors in Mauritius, according to our AI analysis." : "Now let's dive deeper into your chosen sector."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-center mb-4">Step 1: Select a Promising Sector</h3>
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
                <p className="text-muted-foreground mb-2">...or enter your own</p>
                <Input 
                    placeholder="e.g., Artificial Intelligence Services" 
                    className="max-w-md mx-auto"
                    value={customSector}
                    onChange={handleCustomSectorChange}
                />
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button size="lg" disabled={!canProceed} onClick={handleNextStep}>
                  <span>Next Step</span>
                  <ArrowRight />
                </Button>
              </div>

            </div>
          )}
           {currentStep === 2 && (
             <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Step 2: Brainstorm Ideas</h3>
                <p>Great! You've selected: <span className="font-bold text-primary">{selectedSector || customSector}</span>.</p>
                <p className="text-muted-foreground">The next step would involve using this sector to generate specific business ideas. This part is under construction.</p>
                <Button onClick={() => setCurrentStep(1)}>Go Back</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
