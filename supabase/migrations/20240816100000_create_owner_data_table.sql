-- Create the owner_data table to store a single record for the app owner.
CREATE TABLE IF NOT EXISTS public.owner_data (
    id smallint PRIMARY KEY DEFAULT 1,
    full_name TEXT NOT NULL,
    company_name TEXT,
    contact_email TEXT,
    phone_number TEXT,
    website_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    -- Enforce that only one row can exist in this table
    CONSTRAINT single_row_check CHECK (id = 1)
);

-- Enable Row-Level Security for the table
ALTER TABLE public.owner_data ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read-only access to this data.
-- This is safe as it's intended for public display (e.g., copyright notices).
CREATE POLICY "Allow public read access to owner data"
ON public.owner_data
FOR SELECT
USING (true);

-- Insert the initial owner data.
-- This data can be queried by the app to display dynamic copyright/contact info.
INSERT INTO public.owner_data (full_name, company_name, contact_email, phone_number, website_url)
VALUES ('Alain Bertrand', 'BusinessStudio AI', 'admin@avantaz.online', '+230 5930 9104', 'https://www.avantaz.online')
ON CONFLICT (id) DO UPDATE 
SET 
    full_name = EXCLUDED.full_name,
    company_name = EXCLUDED.company_name,
    contact_email = EXCLUDED.contact_email,
    phone_number = EXCLUDED.phone_number,
    website_url = EXCLUDED.website_url;
