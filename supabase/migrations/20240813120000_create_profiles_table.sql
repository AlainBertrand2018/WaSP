-- supabase/migrations/20240813120000_create_profiles_table.sql

-- Drop the existing trigger if it exists to prevent errors
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop the existing function if it exists
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create the custom enum type for subscriber roles if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subscriber_role') THEN
        CREATE TYPE public.subscriber_role AS ENUM ('Individual', 'Company/Startup', 'Investor');
    END IF;
END
$$;

-- Create the profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    role public.subscriber_role,
    business_name TEXT,
    job_title TEXT,
    phone_number TEXT,
    mobile_number TEXT,
    avatar_url TEXT,
    civility TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Secure the profiles table with Row-Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for the profiles table
-- 1. Allow users to read their own profile
DROP POLICY IF EXISTS "Users can read their own profile" ON public.profiles;
CREATE POLICY "Users can read their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

-- 2. Allow users to update their own profile
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);


-- Create or replace the function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, role, business_name, job_title, phone_number, mobile_number, avatar_url, civility, created_at, updated_at)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    (new.raw_user_meta_data->>'role')::public.subscriber_role,
    new.raw_user_meta_data->>'business_name',
    new.raw_user_meta_data->>'job_title',
    new.raw_user_meta_data->>'phone_number',
    new.raw_user_meta_data->>'mobile_number',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'civility',
    new.created_at,
    new.updated_at
  );
  RETURN new;
END;
$$;


-- Create the trigger to call the function on new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add a comment to the profiles table for clarity
COMMENT ON TABLE public.profiles IS 'Stores public profile information for each user, linked to their auth.users record.';
