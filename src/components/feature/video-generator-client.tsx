
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

// Mock AI flow for now
async function generateVideoScript(prompt: string): Promise<{ script: string }> {
    console.log('Generating script for:', prompt);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { script: `This is a mock AI-generated video script based on the prompt: "${prompt}". It would normally contain scenes, dialogue, and visual cues.` };
}


const formSchema = z.object({
  prompt: z.string().min(10, {
    message: 'Prompt must be at least 10 characters.',
  }),
});

export function VideoGeneratorClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedScript('');
    try {
      const result = await generateVideoScript(values.prompt);
      setGeneratedScript(result.script);
      toast({
        title: 'Script Generated!',
        description: 'Your video script is ready below.',
      });
    } catch (error) {
      console.error('Error generating video script:', error);
      toast({
        title: 'Error',
        description: 'Could not generate video script. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Script Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your video idea</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A 30-second ad for a new local coffee shop, focusing on a cozy atmosphere and artisanal beans."
                        className="resize-y min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe the video you want to create. Include the topic, tone, and any key points.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                 {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                 ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                 )}
                <span>{isLoading ? 'Generating...' : 'Generate Script'}</span>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {generatedScript && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Script</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
              {generatedScript}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
