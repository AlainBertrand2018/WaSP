-- Alter the existing 'profiles' table to remove the 'website' column.
ALTER TABLE public.profiles
DROP COLUMN IF EXISTS website;
