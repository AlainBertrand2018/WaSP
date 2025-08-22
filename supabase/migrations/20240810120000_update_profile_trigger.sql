
-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name, civility, role, business_name, job_title, phone_number, mobile_number, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'civility',
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
