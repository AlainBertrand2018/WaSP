
-- Enable the uuid-ossp extension if it's not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop the type if it exists, to recreate it with potentially new values
DROP TYPE IF EXISTS public.business_type_enum;

-- Create a custom type for business_type
CREATE TYPE public.business_type_enum AS ENUM (
    'Not set yet',
    'Individual/Self-Employed',
    'Company'
);

-- Create the business_profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.business_profiles (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    business_name text NOT NULL,
    business_type public.business_type_enum DEFAULT 'Not set yet'::public.business_type_enum NOT NULL,
    other_business_type text,
    business_form text,
    other_business_form text,
    brn text,
    is_vat_registered boolean DEFAULT false NOT NULL,
    vat_number text,
    is_startup boolean DEFAULT false NOT NULL,
    annual_turnover text,
    gross_income text,
    projected_annual_income_threshold text,
    has_employees boolean DEFAULT false NOT NULL,
    number_of_employees integer,
    industry text,
    website text,
    description text,
    logo_url text,
    main_goal text,
    biggest_challenge text,
    created_at timestamptz DEFAULT now() NOT NULL
);

-- Add comments to the table and columns
COMMENT ON TABLE public.business_profiles IS 'Stores individual business profiles created by users.';
COMMENT ON COLUMN public.business_profiles.user_id IS 'Foreign key to the user who owns this profile.';
COMMENT ON COLUMN public.business_profiles.business_name IS 'The legal or trading name of the business.';
COMMENT ON COLUMN public.business_profiles.brn IS 'Business Registration Number.';
COMMENT ON COLUMN public.business_profiles.industry IS 'The industry or sector the business operates in.';

-- Enable Row-Level Security
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own business profiles." ON public.business_profiles;
DROP POLICY IF EXISTS "Users can insert their own business profiles." ON public.business_profiles;
DROP POLICY IF EXISTS "Users can update their own business profiles." ON public.business_profiles;
DROP POLICY IF EXISTS "Users can delete their own business profiles." ON public.business_profiles;

-- Create RLS policies
CREATE POLICY "Users can view their own business profiles."
ON public.business_profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own business profiles."
ON public.business_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own business profiles."
ON public.business_profiles FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own business profiles."
ON public.business_profiles FOR DELETE
USING (auth.uid() = user_id);

