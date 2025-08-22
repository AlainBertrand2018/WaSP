
-- Create a custom type for subscriber roles
create type public.subscriber_role as enum ('Individual', 'Company/Startup', 'Investor');

-- Create the profiles table
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  first_name text,
  last_name text,
  role public.subscriber_role,
  business_name text,
  job_title text,
  phone_number text,
  mobile_number text,
  avatar_url text,
  civility text,
  updated_at timestamp with time zone,

  primary key (id)
);

-- Set up Row Level Security (RLS)
alter table public.profiles
  enable row level security;

-- Create policy for users to view their own profile
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

-- Create policy for users to insert their own profile
create policy "Users can insert their own profile." on public.profiles
  for insert with check ((select auth.uid()) = id);

-- Create policy for users to update their own profile
create policy "Users can update own profile." on public.profiles
  for update using ((select auth.uid()) = id);


-- Function to automatically create a profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name, role, business_name, job_title, phone_number, mobile_number, avatar_url, civility)
  values (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    (new.raw_user_meta_data->>'role')::public.subscriber_role,
    new.raw_user_meta_data->>'business_name',
    new.raw_user_meta_data->>'job_title',
    new.raw_user_meta_data->>'phone_number',
    new.raw_user_meta_data->>'mobile_number',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'civility'
  );
  return new;
end;
$$;

-- Trigger the function after a new user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create a storage bucket for avatars if it doesn't exist
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Set up access policies for the avatars bucket
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

create policy "Anyone can update their own avatar." on storage.objects
  for update using ((select auth.uid()) = owner) with check (bucket_id = 'avatars');
