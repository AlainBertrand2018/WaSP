-- Create a custom type for user roles
create type public.subscriber_role as enum ('Individual', 'Company/Startup', 'Investor');

-- Create the profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  first_name text,
  last_name text,
  civility text,
  business_name text,
  job_title text,
  phone_number text,
  mobile_number text,
  avatar_url text,
  role public.subscriber_role
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Policy: Users can see their own profile
create policy "Users can view their own profile."
on public.profiles for select
using ( auth.uid() = id );

-- Policy: Users can update their own profile
create policy "Users can update their own profile."
on public.profiles for update
using ( auth.uid() = id );

-- This trigger automatically creates a profile entry when a new user signs up.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id,
    first_name,
    last_name,
    civility,
    business_name,
    job_title,
    phone_number,
    mobile_number,
    avatar_url,
    role
  )
  values (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'civility',
    new.raw_user_meta_data->>'business_name',
    new.raw_user_meta_data->>'job_title',
    new.raw_user_meta_data->>'phone_number',
    new.raw_user_meta_data->>'mobile_number',
    new.raw_user_meta_data->>'avatar_url',
    (new.raw_user_meta_data->>'role')::public.subscriber_role
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create the trigger that fires after a new user is inserted into auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
