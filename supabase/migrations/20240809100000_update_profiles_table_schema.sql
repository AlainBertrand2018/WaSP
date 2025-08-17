-- Alter the existing profiles table to match the new schema for user registration.

-- Add new columns if they don't already exist
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS civility TEXT,
  ADD COLUMN IF NOT EXISTS first_name TEXT,
  ADD COLUMN IF NOT EXISTS company_name TEXT,
  ADD COLUMN IF NOT EXISTS "position" TEXT,
  ADD COLUMN IF NOT EXISTS phone_number TEXT,
  ADD COLUMN IF NOT EXISTS mobile_number TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT;

-- Rename 'full_name' to 'last_name' if 'full_name' exists and 'last_name' does not.
DO $$
BEGIN
  IF EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='full_name') AND
     NOT EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='last_name') THEN
    ALTER TABLE public.profiles RENAME COLUMN full_name TO last_name;
  END IF;
END $$;

-- If 'last_name' still doesn't exist (e.g., 'full_name' was also missing), add it.
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS last_name TEXT;


-- Set a default value for the 'role' column.
ALTER TABLE public.profiles
  ALTER COLUMN role SET DEFAULT 'subscriber';

-- Remove the old avatar_url column as it's no longer specified.
ALTER TABLE public.profiles
  DROP COLUMN IF EXISTS avatar_url;

-- It's good practice to ensure the email in profiles is unique, just like in auth.users
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_email_key UNIQUE (email);

-- Re-apply comments to new or modified columns for clarity in the Supabase dashboard.
COMMENT ON COLUMN public.profiles.civility IS 'e.g., Mr., Mrs., Ms.';
COMMENT ON COLUMN public.profiles.first_name IS 'User''s first name.';
COMMENT ON COLUMN public.profiles.last_name IS 'User''s last name.';
COMMENT ON COLUMN public.profiles.company_name IS 'Name of the user''s primary company or business.';
COMMENT ON COLUMN public.profiles.position IS 'User''s position or title in their business.';
COMMENT ON COLUMN public.profiles.phone_number IS 'Primary contact phone number.';
COMMENT ON COLUMN public.profiles.mobile_number IS 'Mobile or WhatsApp number.';
COMMENT ON COLUMN public.profiles.email IS 'User''s contact email, linked to their auth identity.';
COMMENT ON COLUMN public.profiles.role IS 'Defines user permissions. Defaults to ''subscriber''.';
