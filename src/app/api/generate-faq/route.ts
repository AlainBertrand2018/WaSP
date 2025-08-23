// src/app/api/generate-faq/route.ts

import { generateFaq } from '@/ai/flows/marketing/generate-faq-flow';
import { NextResponse } from 'next/server';

// Opt out of caching for this dynamic route.
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const faqData = await generateFaq();
    return NextResponse.json(faqData);
  } catch (error) {
    console.error('Error generating FAQ:', error);
    // In case of an error, return a 500 status with an error message
    return NextResponse.json(
      { error: 'Failed to generate FAQ content.' },
      { status: 500 }
    );
  }
}
