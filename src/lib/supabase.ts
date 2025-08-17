/**
 * @fileOverview Centralized Supabase client initialization.
 */
import { createClient } from '@supabase/supabase-js';

// Ensure the environment variables are not null or undefined.
// In a real application, you might want to throw an error if they are missing.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a single, reusable Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
