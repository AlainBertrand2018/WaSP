
-- Function to handle new user signup and create a profile
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, user_id, civility, first_name, last_name, role, business_name, job_title, phone_number, mobile_number, avatar_url)
  values (
    new.id, -- The user's ID from auth.users
    new.id, -- Set user_id to be the same as the user's auth ID
    new.raw_user_meta_data ->> 'civility',
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'role',
    new.raw_user_meta_data ->> 'business_name',
    new.raw_user_meta_data ->> 'job_title',
    new.raw_user_meta_data ->> 'phone_number',
    new.raw_user_meta_data ->> 'mobile_number',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

-- Trigger to execute the function on new user creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS policy to allow users to update their own profile
drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles for update
using ( auth.uid() = user_id );
