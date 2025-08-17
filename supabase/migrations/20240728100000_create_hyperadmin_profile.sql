-- supabase/migrations/20240728100000_create_hyperadmin_profile.sql

-- This script creates the hyperadmin profile by linking the auth user
-- to the owner_data record.
--
-- IMPORTANT:
-- 1. Ensure you have already signed up in the application with the email
--    that matches the 'contact_email' in the 'owner_data' table.
-- 2. This script is designed to run once.

INSERT INTO public.profiles (id, full_name, website, role)
SELECT
    u.id,
    od.full_name,
    od.website_url,
    'hyperadmin'::public.user_role
FROM
    auth.users u,
    public.owner_data od
WHERE
    u.email = od.contact_email
ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    website = EXCLUDED.website,
    role = EXCLUDED.role;
