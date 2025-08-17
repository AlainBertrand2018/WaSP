-- supabase/migrations/YYYYMMDDHHMMSS_create_initial_schema.sql

-- TLE Extension Setup
CREATE SCHEMA IF NOT EXISTS pgtle;
CREATE EXTENSION IF NOT EXISTS "pg_tle" WITH SCHEMA "pgtle";

-- Profiles Table
-- Stores public-facing user information.
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'subscriber',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- RLS Policy for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Business Profiles Table
-- Stores detailed information for different business entities a user might manage.
CREATE TABLE IF NOT EXISTS public.business_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  business_type TEXT NOT NULL,
  other_business_type TEXT,
  business_form TEXT,
  other_business_form TEXT,
  brn TEXT,
  is_vat_registered BOOLEAN DEFAULT false,
  vat_number TEXT,
  is_startup BOOLEAN DEFAULT false,
  annual_turnover TEXT,
  gross_income TEXT,
  projected_annual_income_threshold TEXT,
  has_employees BOOLEAN DEFAULT false,
  number_of_employees INTEGER,
  industry TEXT,
  business_name TEXT NOT NULL,
  website TEXT,
  description TEXT,
  logo_url TEXT,
  main_goal TEXT,
  biggest_challenge TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- RLS Policy for Business Profiles
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own business profiles." ON business_profiles
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Idea Validations Table
CREATE TABLE IF NOT EXISTS public.idea_validations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_profile_id UUID NOT NULL REFERENCES public.business_profiles(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    form_data JSONB NOT NULL,
    ai_result JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.idea_validations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own idea validations." ON idea_validations
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- MVP Plans Table
CREATE TABLE IF NOT EXISTS public.mvp_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    idea_validation_id UUID NOT NULL REFERENCES public.idea_validations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    ai_result JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.mvp_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own MVP plans." ON mvp_plans
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Budgets Table
CREATE TABLE IF NOT EXISTS public.budgets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_profile_id UUID NOT NULL REFERENCES public.business_profiles(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    budget_data JSONB NOT NULL,
    ai_summary JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own budgets." ON budgets
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Business Plans Table
CREATE TABLE IF NOT EXISTS public.business_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    budget_id UUID NOT NULL REFERENCES public.budgets(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_content JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.business_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own business plans." ON business_plans
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
