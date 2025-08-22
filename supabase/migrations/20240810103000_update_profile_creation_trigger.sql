
-- This function is triggered when a new user signs up.
-- It inserts a new row into the public.profiles table.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    first_name,
    last_name,
    email,
    role,
    civility,
    company_name,
    position,
    phone_number,
    mobile_number,
    avatar_url
  )
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.email,
    new.raw_user_meta_data ->> 'role',
    new.raw_user_meta_data ->> 'civility',
    new.raw_user_meta_data ->> 'company_name',
    new.raw_user_meta_data ->> 'position',
    new.raw_user_meta_data ->> 'phone_number',
    new.raw_user_meta_data ->> 'mobile_number',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

-- Drop the existing trigger if it exists
drop trigger if exists on_auth_user_created on auth.users;

-- Create the trigger to run the function on new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

