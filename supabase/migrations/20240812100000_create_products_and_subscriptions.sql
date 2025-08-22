-- Create a table for public products
create table
  public.products (
    id uuid not null default gen_random_uuid (),
    active boolean null,
    name text null,
    description text null,
    metadata jsonb null,
    constraint products_pkey primary key (id)
  ) tablespace pg_default;

-- Create a table for user subscriptions
create table
  public.subscriptions (
    id uuid not null default gen_random_uuid (),
    user_id uuid not null,
    status public.subscription_status null,
    metadata jsonb null,
    product_id uuid null,
    cancel_at_period_end boolean null,
    created timestamp with time zone not null default now(),
    current_period_start timestamp with time zone not null default now(),
    current_period_end timestamp with time zone not null default now(),
    ended_at timestamp with time zone null,
    cancel_at timestamp with time zone null,
    canceled_at timestamp with time zone null,
    trial_start timestamp with time zone null,
    trial_end timestamp with time zone null,
    constraint subscriptions_pkey primary key (id),
    constraint subscriptions_product_id_fkey foreign key (product_id) references products (id) on delete restrict,
    constraint subscriptions_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
  ) tablespace pg_default;

-- Add subscription_status type
create type public.subscription_status as enum ('trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid');

-- Secure the tables with Row-Level Security
alter table public.products enable row level security;
alter table public.subscriptions enable row level security;

-- Define RLS policies
create policy "Allow public read-only access." on public.products for select using (true);
create policy "Allow individual read access." on public.subscriptions for select using (auth.uid () = user_id);
