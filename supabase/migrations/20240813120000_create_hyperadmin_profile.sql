-- supabase/migrations/YYYYMMDDHHMMSS_create_hyperadmin_profile.sql

-- This script creates a 'hyperadmin' profile by linking owner data to an authenticated user.
-- It is designed to run once and will not overwrite existing data.
--
-- IMPORTANT:
-- Before running this migration, you MUST:
-- 1. Sign up in the application with the owner's email address. This creates the user in `auth.users`.
-- 2. Ensure the `owner_data` table is populated with the correct owner details.

INSERT INTO public.profiles (id, full_name, role)
SELECT
    u.id,
    od.full_name,
    'hyperadmin' AS role
FROM
    auth.users u,
    public.owner_data od
WHERE
    u.email = od.contact_email -- Match the user by the email stored in owner_data
ON CONFLICT (id)
DO NOTHING; -- If a profile for this user already exists, do nothing.
