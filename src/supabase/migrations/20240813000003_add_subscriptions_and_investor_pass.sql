
-- Create a custom type for subscription statuses for data consistency.
CREATE TYPE public.subscription_status AS ENUM ('active', 'canceled', 'past_due', 'incomplete');

-- Create the products table to store subscription plan details.
CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  active boolean NULL,
  name text NULL,
  description text NULL,
  image text NULL,
  metadata jsonb NULL
);
COMMENT ON TABLE public.products IS 'Stores information about the subscription products (plans) offered.';

-- Create the subscriptions table to link users to products.
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  status public.subscription_status NULL,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  ended_at timestamptz NULL,
  metadata jsonb NULL,
  CONSTRAINT subscriptions_user_id_product_id_key UNIQUE (user_id, product_id)
);
COMMENT ON TABLE public.subscriptions IS 'Stores user subscription information, linking them to a product.';

-- Add the has_used_free_run column to profiles for the investor journey.
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS has_used_free_run boolean NOT NULL DEFAULT false;
COMMENT ON COLUMN public.profiles.has_used_free_run IS 'Tracks if an investor has used their one-time free run of the app suite.';

-- Enable Row-Level Security for the new tables.
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for the products table.
-- Allow authenticated users to view all active products.
CREATE POLICY "Allow authenticated user read access to active products"
ON public.products
FOR SELECT
TO authenticated
USING (active = true);

-- Create RLS policies for the subscriptions table.
-- Allow users to view their own subscriptions.
CREATE POLICY "Allow individual user read access to their subscriptions"
ON public.subscriptions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
