
-- Add columns for the secondary business profile
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS secondary_business_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS secondary_website text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS secondary_description text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS secondary_logo_url text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS secondary_industry text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS secondary_business_form text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS secondary_brn text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS secondary_is_vat_registered boolean;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS secondary_vat_number text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS secondary_has_employees boolean;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS secondary_number_of_employees integer;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS secondary_main_goal text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS secondary_biggest_challenge text;

-- Add a column to track the active profile context
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profile_context text NOT NULL DEFAULT 'primary';
