-- supabase/migrations/YYYYMMDDHHMMSS_update_profiles_table_for_registration.sql

-- Add new columns for the registration form if they don't already exist.

-- Rename full_name to last_name, but only if full_name exists.
DO $$
BEGIN
   IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='full_name') THEN
      ALTER TABLE public.profiles RENAME COLUMN full_name TO last_name;
   END IF;
END $$;

-- Add all other required columns, checking for existence first.
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS civility TEXT,
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS email TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS company_name TEXT,
ADD COLUMN IF NOT EXISTS position TEXT,
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS mobile_number TEXT,
ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'subscriber';

-- It seems 'last_name' might not exist if 'full_name' didn't, so add it if it's still missing.
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS last_name TEXT;

-- Drop the avatar_url column if it exists and is no longer needed.
ALTER TABLE public.profiles
DROP COLUMN IF EXISTS avatar_url;

-- Drop the updated_at column if it exists, to be replaced by Supabase's built-in functionality if needed.
ALTER TABLE public.profiles
DROP COLUMN IF EXISTS updated_at;
