/**
 * @fileOverview A one-time script to read the Constitution of Mauritius,
 * generate vector embeddings for its sections, and store them in Supabase.
 * 
 * To run this script:
 * 1. Ensure your .env file has the correct Supabase URL and service_role key.
 * 2. Run the SQL from `src/lib/supabase/schema.sql` in your Supabase dashboard.
 * 3. Run the SQL from `src/lib/supabase/search_constitution_sections.sql` in your Supabase dashboard.
 * 4. From your terminal, run `npm install` to install dependencies.
 * 5. From your terminal, run `npm run index:constitution`.
 */

// IMPORTANT: Environment variables are now loaded via the --require flag in package.json

import { ai } from '@/ai/genkit';
// Use the secure admin client for write operations
import { supabaseAdminClient } from '@/lib/supabase';
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
  // Verify that environment variables are loaded
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase URL or Service Role Key is missing. Make sure it is set in your .env file and the script can access it.');
      process.exit(1);
  }
    
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
  const { error: deleteError } = await supabaseAdminClient.from('constitution_sections').delete().gt('id', 0);
  if (deleteError) {
    console.error('Error clearing table:', deleteError);
    return;
  }
  console.log('Table cleared successfully.');
  
  // 3. Generate embeddings for all chunks first
  console.log('Generating embeddings for each chunk...');
  const embeddingResults = [];
  for (const chunk of chunks) {
    try {
      // FIX: Pass the raw chunk string directly to the content property.
      const embedding = await ai.embed({
        embedder: 'googleai/text-embedding-004',
        content: chunk,
      });
      embeddingResults.push(embedding);
    } catch(e) {
      console.error("Failed to generate embedding for a chunk. Skipping.", e);
      embeddingResults.push(null); // Push null to keep array lengths consistent
    }
  }

  // 4. Prepare data for insertion, explicitly extracting the vector
  const documentsToInsert = chunks
    .map((chunk, i) => {
      const result = embeddingResults[i];

      // Check if the result and the nested structure are valid
      if (!result) {
        console.warn(`Skipping chunk ${i} due to missing or invalid embedding structure.`);
        return null;
      }
      
      const rawVector = result;

      return {
        content: chunk,
        tokens: chunk.length, 
        embedding: rawVector,
      };
    })
    .filter(doc => doc !== null); // Filter out any null entries from failed embeddings

  if (documentsToInsert.length === 0) {
    console.error("No valid documents could be prepared for insertion. Aborting.");
    process.exit(1);
  }
  
  // --- Verification Step ---
  console.log('Verifying the structure of the first embedding vector:', documentsToInsert[0]!.embedding.slice(0, 5), '...');
  if (!documentsToInsert[0] || !Array.isArray(documentsToInsert[0]!.embedding)) {
    console.error("The prepared data for insertion is incorrect. The 'embedding' field is not a valid array.");
    process.exit(1); // Exit the script to prevent the error
  }
  console.log('Data structure is correct. Proceeding with insertion...');
  // -------------------------


  console.log(`${documentsToInsert.length} documents are ready to be inserted.`);

  // 5. Insert data into Supabase
  if (documentsToInsert.length > 0) {
    console.log('Inserting documents into Supabase using the admin client...');
    // Use the secure admin client to insert data
    const { error } = await supabaseAdminClient.from('constitution_sections').insert(documentsToInsert as any);

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
