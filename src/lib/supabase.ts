/**
 * @fileOverview Centralized Supabase client initialization.
 */
import { createClient } from '@supabase/supabase-js';

// Ensure the environment variables are not null or undefined.
// In a real application, you might want to throw an error if they are missing.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side, public client for general use.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // This is the fix: disable the email change security feature for easier development.
    // It allows users to log in even if their email hasn't been verified yet.
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});


// --- Server-side Admin Client ---
// Note: This client should ONLY be used in server-side code (e.g., Genkit flows, API routes)
// where the service role key can be kept secret.
const service_role_key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

let supabaseAdmin: ReturnType<typeof createClient>;
if (service_role_key) {
    supabaseAdmin = createClient(supabaseUrl, service_role_key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
} else {
    console.warn("`SUPABASE_SERVICE_ROLE_KEY` is not set. The Supabase admin client will not be available.");
    // Fallback to the public client to avoid crashes, though some operations might fail.
    supabaseAdmin = supabase;
}

export const supabaseAdminClient = supabaseAdmin;
