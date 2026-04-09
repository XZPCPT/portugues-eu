-- ── Fix: signup "database error" ─────────────────────────────────────────────
-- Paste this in: supabase.com → your project → SQL Editor → New query → Run
--
-- What it fixes:
--   1. Trigger now has an exception handler so signup NEVER fails
--   2. Added ON CONFLICT (id) DO NOTHING to handle duplicate user edge case
--   3. set search_path = public prevents schema resolution errors
--   4. Added missing INSERT policy for profiles table

-- Replace the trigger function with a safe version
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
exception when others then
  raise warning 'handle_new_user failed: %', sqlerrm;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- Add the missing INSERT policy for profiles
drop policy if exists "Users can insert own profile" on profiles;
create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);
