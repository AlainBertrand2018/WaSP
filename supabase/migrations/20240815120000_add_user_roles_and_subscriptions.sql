
-- Step 1: Add a 'role' column to the existing 'profiles' table.
-- This column will store the user's role, selected during signup.
-- We use a CHECK constraint to ensure data integrity.
ALTER TABLE public.profiles
ADD COLUMN role TEXT CHECK (role IN ('Individual', 'Company/Startup', 'Investor')) DEFAULT 'Individual';

-- Add a comment to describe the new column's purpose.
COMMENT ON COLUMN public.profiles.role IS 'The role of the user, e.g., Individual, Company/Startup, or Investor.';


-- Step 2: Create a 'subscriptions' table to manage user access to paid features.
-- This table links users to specific plans or products they have purchased.
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_id TEXT NOT NULL, -- e.g., 'PRO_PLAN', 'APP_CRM', 'APP_FINANCIALS'
    status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'incomplete')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    current_period_end_at TIMESTAMPTZ NOT NULL
);

-- Add indexes for faster queries on frequently accessed columns.
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);

-- Add comments for clarity on the table and its columns.
COMMENT ON TABLE public.subscriptions IS 'Manages user subscriptions to various plans and apps.';
COMMENT ON COLUMN public.subscriptions.user_id IS 'Links to the authenticated user.';
COMMENT ON COLUMN public.subscriptions.plan_id IS 'Identifier for the subscribed plan or app.';
COMMENT ON COLUMN public.subscriptions.status IS 'The current status of the subscription.';
COMMENT ON COLUMN public.subscriptions.current_period_end_at IS 'The date when the current subscription period ends.';

