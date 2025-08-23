'use client';

import React, { useEffect, useState } from 'react';
import FaqPageContent from './faq-page-content';
import { toast } from '@/hooks/use-toast';
import { AiLoadingSpinner } from '@/components/feature/ai-loading-spinner';

type Faq = {
  question: string;
  answer: string;
};

export default function FaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const response = await fetch('/api/generate-faq');
        if (!response.ok) {
          throw new Error('Failed to fetch FAQs');
        }
        const data = await response.json();
        setFaqs(data.faqs);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        toast({
          title: 'Error',
          description: 'Could not load frequently asked questions. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchFaqs();
  }, []);
  
  if (isLoading) {
    return <AiLoadingSpinner show={true} title="CLAIRE is fetching the FAQs..." />;
  }

  // Create the JSON-LD schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqPageContent initialFaqs={faqs} />
    </>
  );
}
