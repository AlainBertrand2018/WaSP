-- Create the required schema for the pg_tle extension first.
create schema if not exists pgtle;

-- Enable the pg_tle extension within its own dedicated schema.
create extension if not exists pg_tle with schema pgtle;

-- Create the table for public user profiles, linked to auth.users.
create table
  public.profiles (
    id uuid not null references auth.users on delete cascade,
    full_name text null,
    avatar_url text null,
    updated_at timestamp with time zone null,
    constraint profiles_pkey primary key (id)
  );

-- Set up Row Level Security (RLS) for the profiles table.
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid () = id);
create policy "Users can update their own profile." on public.profiles for update using (auth.uid () = id);

-- Business Profile table to store onboarding data.
create table
  public.business_profiles (
    id uuid primary key default gen_random_uuid (),
    user_id uuid not null references public.profiles on delete cascade,
    business_type text null,
    other_business_type text null,
    business_form text null,
    other_business_form text null,
    brn text null,
    is_vat_registered text null,
    vat_number text null,
    is_startup boolean null,
    annual_turnover text null,
    gross_income text null,
    projected_annual_income_threshold text null,
    has_employees text null,
    number_of_employees text null,
    industry text null,
    business_name text null,
    website text null,
    description text null,
    logo text null,
    main_goal text null,
    biggest_challenge text null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
  );

-- Set up RLS for business_profiles.
alter table public.business_profiles enable row level security;
create policy "Users can manage their own business profiles." on public.business_profiles for all using (auth.uid () = user_id);

-- Idea Validations table for the Business Creation suite.
create table
  public.idea_validations (
    id uuid primary key default gen_random_uuid (),
    business_profile_id uuid not null references public.business_profiles on delete cascade,
    user_id uuid not null references public.profiles on delete cascade,
    form_data jsonb not null,
    analysis_result jsonb not null,
    created_at timestamp with time zone not null default now()
  );

-- Set up RLS for idea_validations.
alter table public.idea_validations enable row level security;
create policy "Users can manage their own idea validations." on public.idea_validations for all using (auth.uid () = user_id);

-- MVP Plans table.
create table
  public.mvp_plans (
    id uuid primary key default gen_random_uuid (),
    idea_validation_id uuid not null references public.idea_validations on delete cascade,
    user_id uuid not null references public.profiles on delete cascade,
    mvp_result jsonb not null,
    created_at timestamp with time zone not null default now()
  );

-- Set up RLS for mvp_plans.
alter table public.mvp_plans enable row level security;
create policy "Users can manage their own MVP plans." on public.mvp_plans for all using (auth.uid () = user_id);

-- Budgets table for the budget planner.
create table
  public.budgets (
    id uuid primary key default gen_random_uuid (),
    business_profile_id uuid not null references public.business_profiles on delete cascade,
    user_id uuid not null references public.profiles on delete cascade,
    budget_data jsonb not null,
    created_at timestamp with time zone not null default now()
  );

-- Set up RLS for budgets.
alter table public.budgets enable row level security;
create policy "Users can manage their own budgets." on public.budgets for all using (auth.uid () = user_id);

-- Business Plans table.
create table
  public.business_plans (
    id uuid primary key default gen_random_uuid (),
    business_profile_id uuid not null references public.business_profiles on delete cascade,
    user_id uuid not null references public.profiles on delete cascade,
    plan_content jsonb not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
  );

-- Set up RLS for business_plans.
alter table public.business_plans enable row level security;
create policy "Users can manage their own business plans." on public.business_plans for all using (auth.uid () = user_id);

-- This function handles creating a profile entry when a new user signs up.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

-- Trigger the function after a new user is created.
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
