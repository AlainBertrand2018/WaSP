
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, Loader2, Sparkles } from 'lucide-react';
import { generateBrainstormIdeas } from '@/ai/flows/ideation/generate-brainstorm-ideas-flow';
import { marked } from 'marked';

export default function BrainstormingPage() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ideas, setIdeas] = useState('');

  const handleGenerate = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setIdeas('');
    try {
      const result = await generateBrainstormIdeas({ query });
      setIdeas(result.ideas);
    } catch (error) {
      console.error('Error generating brainstorming ideas:', error);
      setIdeas('<p class="text-destructive">Sorry, an error occurred while generating ideas. Please try again.</p>');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="text-center items-center">
        <div className="p-4 bg-primary/10 rounded-full">
            <Lightbulb className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="mt-4 text-3xl">AI Business Idea Brainstorming</CardTitle>
        <CardDescription className="max-w-prose">
          Stuck for an idea? Enter a topic or question below, and our AI, trained on the Mauritian SME landscape, will generate relevant business concepts for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., 'What are some opportunities in sustainable tourism?' or 'Ideas for a FinTech startup'"
                className="min-h-24 text-base"
                disabled={isLoading}
            />
        </div>
        <div className="text-center">
            <Button size="lg" onClick={handleGenerate} disabled={isLoading || !query.trim()}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate Ideas
                    </>
                )}
            </Button>
        </div>

        {ideas && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4 text-center">Generated Ideas</h3>
            <div
              className="prose prose-sm dark:prose-invert max-w-none bg-muted p-6 rounded-lg"
              dangerouslySetInnerHTML={{ __html: marked(ideas) }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
