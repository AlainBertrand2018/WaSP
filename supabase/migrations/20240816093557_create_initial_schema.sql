
-- Create a schema to safely install extensions
create schema if not exists extensions;

-- Enable the pg_tle extension for trusted language extensions in its required schema
create extension if not exists pg_tle with schema pgtle;

-- Enable pgcrypto for generating UUIDs
create extension if not exists pgcrypto with schema extensions;

-- Enable pgjwt for JWT validation
create extension if not exists pgjwt with schema extensions;


-- Function to get user ID from JWT
create or replace function auth.user_id()
returns uuid
language sql
stable
as $$
  select nullif(current_setting('request.jwt.claims', true)::json->>'sub', '')::uuid;
$$;

-- Function to check if a user has a specific role
create or replace function public.user_has_role(user_id uuid, role_name text)
returns boolean
language plpgsql
stable
as $$
begin
  return exists (
    select 1
    from public.user_roles ur
    join public.roles r on ur.role_id = r.id
    where ur.user_id = user_id and r.name = role_name
  );
end;
$$;


-- TABLES

-- 1. Profiles Table
-- Stores public user information, linked to auth.users
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default now()
);
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update their own profile." on public.profiles for update using (auth.uid() = id);


-- 2. Business Profiles Table
-- Stores detailed information about a user's business
create table public.business_profiles (
  id uuid primary key default extensions.uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  profile_data jsonb not null, -- Stores all form fields from the onboarding process
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
alter table public.business_profiles enable row level security;
create policy "Users can manage their own business profiles." on public.business_profiles for all using (auth.uid() = user_id);


-- 3. Idea Validations Table
-- Stores results from the Business Idea Validation step
create table public.idea_validations (
  id uuid primary key default extensions.uuid_generate_v4(),
  business_profile_id uuid not null references public.business_profiles(id) on delete cascade,
  form_data jsonb not null,
  analysis_result jsonb,
  created_at timestamp with time zone default now()
);
alter table public.idea_validations enable row level security;
create policy "Users can manage validations linked to their business profile." on public.idea_validations for all using (
  exists (
    select 1 from public.business_profiles bp
    where bp.id = idea_validations.business_profile_id and bp.user_id = auth.uid()
  )
);


-- 4. MVP Plans Table
-- Stores results from the MVP Planner step
create table public.mvp_plans (
  id uuid primary key default extensions.uuid_generate_v4(),
  validation_id uuid not null references public.idea_validations(id) on delete cascade,
  mvp_result jsonb,
  prd_result jsonb,
  created_at timestamp with time zone default now()
);
alter table public.mvp_plans enable row level security;
create policy "Users can manage MVP plans linked to their validations." on public.mvp_plans for all using (
  exists (
    select 1
    from public.idea_validations iv
    join public.business_profiles bp on iv.business_profile_id = bp.id
    where iv.id = mvp_plans.validation_id and bp.user_id = auth.uid()
  )
);


-- 5. Budgets Table
-- Stores results from the Startup Budget Planner
create table public.budgets (
  id uuid primary key default extensions.uuid_generate_v4(),
  mvp_plan_id uuid not null references public.mvp_plans(id) on delete cascade,
  funding_data jsonb,
  costs_data jsonb,
  summary_data jsonb,
  created_at timestamp with time zone default now()
);
alter table public.budgets enable row level security;
create policy "Users can manage budgets linked to their MVP plans." on public.budgets for all using (
  exists (
    select 1
    from public.mvp_plans mp
    join public.idea_validations iv on mp.validation_id = iv.id
    join public.business_profiles bp on iv.business_profile_id = bp.id
    where mp.id = budgets.mvp_plan_id and bp.user_id = auth.uid()
  )
);


-- 6. Business Plans Table
-- Stores the final generated business plan
create table public.business_plans (
  id uuid primary key default extensions.uuid_generate_v4(),
  budget_id uuid not null references public.budgets(id) on delete cascade,
  plan_content jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
alter table public.business_plans enable row level security;
create policy "Users can manage business plans linked to their budgets." on public.business_plans for all using (
  exists (
    select 1
    from public.budgets b
    join public.mvp_plans mp on b.mvp_plan_id = mp.id
    join public.idea_validations iv on mp.validation_id = iv.id
    join public.business_profiles bp on iv.business_profile_id = bp.id
    where b.id = business_plans.budget_id and bp.user_id = auth.uid()
  )
);

-- Handle new user creation by creating a corresponding profile
create or replace function public.handle_new_user()
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

-- Trigger the function upon new user creation in auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
