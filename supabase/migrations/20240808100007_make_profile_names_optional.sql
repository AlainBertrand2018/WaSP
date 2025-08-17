-- supabase/migrations/20240808100007_make_profile_names_optional.sql

-- Make first_name and last_name columns optional to allow for social logins
-- where this data may not be provided by the OAuth provider.
-- This prevents the user creation trigger from failing.
ALTER TABLE public.profiles
ALTER COLUMN first_name DROP NOT NULL,
ALTER COLUMN last_name DROP NOT NULL;
