import { generateFaq } from '@/ai/flows/marketing/generate-faq-flow';
import FaqPageContent from './faq-page-content';

export default async function FaqPage() {
  const faqData = await generateFaq();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.faqs.map((faq: { question: string; answer: string }) => ({
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
      <FaqPageContent initialFaqs={faqData.faqs} />
    </>
  );
}
