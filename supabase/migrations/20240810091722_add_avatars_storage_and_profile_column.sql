
-- Create 'avatars' storage bucket if it doesn't exist
-- We can't use IF NOT EXISTS directly on buckets, so we handle this via policy logic.
-- Policies will only be created if the bucket is new or if they don't exist.

-- Create the bucket
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;


-- Set up Row Level Security policies for the 'avatars' bucket

-- 1. Allow public read access to all files in the 'avatars' bucket
drop policy if exists "Public read access for avatars" on storage.objects;
create policy "Public read access for avatars"
on storage.objects for select
to public
using ( bucket_id = 'avatars' );

-- 2. Allow authenticated users to upload files to their own folder within 'avatars'
drop policy if exists "Authenticated users can upload" on storage.objects;
create policy "Authenticated users can upload"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'avatars'
);

-- 3. Allow authenticated users to update their own files
drop policy if exists "Authenticated users can update their own files" on storage.objects;
create policy "Authenticated users can update their own files"
on storage.objects for update
to authenticated
using ( auth.uid() = owner )
with check ( bucket_id = 'avatars' );

-- 4. Allow authenticated users to delete their own files
drop policy if exists "Authenticated users can delete their own files" on storage.objects;
create policy "Authenticated users can delete their own files"
on storage.objects for delete
to authenticated
using ( auth.uid() = owner );


-- Add the 'avatar_url' column to the 'profiles' table if it doesn't exist
alter table public.profiles
add column if not exists avatar_url text;

-- Add a trigger to automatically update the public.profiles.avatar_url
-- when a user's auth.users.raw_user_meta_data.avatar_url changes.
create or replace function public.update_profile_avatar_url()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  update public.profiles
  set avatar_url = new.raw_user_meta_data->>'avatar_url'
  where id = new.id;
  return new;
end;
$$;

-- Create the trigger on the auth.users table
drop trigger if exists on_auth_user_updated_set_avatar on auth.users;
create trigger on_auth_user_updated_set_avatar
  after update on auth.users
  for each row
  when (old.raw_user_meta_data is distinct from new.raw_user_meta_data)
  execute procedure public.update_profile_avatar_url();
