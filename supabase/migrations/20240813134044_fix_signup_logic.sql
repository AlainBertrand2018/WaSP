
-- This function is triggered when a new user signs up.
-- It inserts a new row into the public.profiles table, populating it with data from the user's metadata.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, civility, first_name, last_name, role, business_name, job_title, phone_number, mobile_number, avatar_url)
  values (
    new.id,
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
$$ language plpgsql security definer;

-- Drop the existing trigger if it exists
drop trigger if exists on_auth_user_created on auth.users;

-- Create the trigger to run the function after a new user is created in auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
