
/**
 * @fileOverview A one-time script to read the Constitution of Mauritius,
 * generate vector embeddings for its sections, and store them in Supabase.
 * 
 * To run this script:
 * 1. Ensure your .env.local file has the correct Supabase URL and Anon Key.
 * 2. Run the SQL from `src/lib/supabase/schema.sql` in your Supabase dashboard.
 * 3. Run the SQL from `src/lib/supabase/search_constitution_sections.sql` in your Supabase dashboard.
 * 4. From your terminal, run `npm run index:constitution`.
 */

import 'dotenv/config'
import { ai } from '@/ai/genkit';
import { supabase } from '@/lib/supabase';
import * as fs from 'fs/promises';
import * as path from 'path';

// Helper to split text into chunks
function chunkText(text: string, chunkSize = 1000, overlap = 100) {
  const chunks: string[] = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + chunkSize));
    i += chunkSize - overlap;
  }
  return chunks;
}

async function main() {
  console.log('Starting the indexing process...');

  // 1. Read the document
  const filePath = path.join(process.cwd(), 'public', 'documents', 'constitution-of-Mauritius_rev2022.md');
  const documentContent = await fs.readFile(filePath, 'utf-8');
  console.log('Successfully read the constitution document.');

  // 2. Split the document into chunks
  const chunks = chunkText(documentContent);
  console.log(`Document split into ${chunks.length} chunks.`);

  // Clear existing data from the table to prevent duplicates
  console.log('Clearing existing data from the `constitution_sections` table...');
  const { error: deleteError } = await supabase.from('constitution_sections').delete().gt('id', 0);
  if (deleteError) {
    console.error('Error clearing table:', deleteError);
    return;
  }
  console.log('Table cleared successfully.');
  
  // 3. Generate embeddings and prepare data for insertion
  console.log('Generating embeddings for each chunk...');
  const documentsToInsert = [];

  for (const chunk of chunks) {
    try {
      const embedding = await ai.embed({
        embedder: 'googleai/text-embedding-004',
        content: chunk,
      });

      documentsToInsert.push({
        content: chunk,
        tokens: chunk.length, // Simple character count, can be improved
        embedding,
      });
    } catch(e) {
      console.error("Failed to generate embedding for a chunk. Skipping.", e);
    }
  }

  console.log(`${documentsToInsert.length} documents are ready to be inserted.`);

  // 4. Insert data into Supabase
  if (documentsToInsert.length > 0) {
    console.log('Inserting documents into Supabase...');
    const { data, error } = await supabase.from('constitution_sections').insert(documentsToInsert);

    if (error) {
      console.error('Error inserting data into Supabase:', error);
    } else {
      console.log('Successfully inserted all documents into Supabase!');
    }
  } else {
    console.log("No documents to insert. Exiting.");
  }
}

main().catch(console.error);
