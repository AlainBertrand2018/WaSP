
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { generateFaq } from '@/ai/flows/marketing/generate-faq-flow';
import { HelpCircle } from 'lucide-react';

export default async function FaqPage() {
  const { faqs } = await generateFaq();

  return (
    <div className="flex flex-col gap-8 py-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <HelpCircle className="text-primary h-8 w-8" />
            Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground">
          Find answers to common questions about StudioFlow AI.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
