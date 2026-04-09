-- ── Add gender column to profiles ────────────────────────────────────────────
-- Run in: supabase.com → your project → SQL Editor → New query → Run
--
-- 'M' = Masculino → Bem-vindo, obrigado
-- 'F' = Feminino  → Bem-vinda, obrigada

alter table profiles
  add column if not exists gender char(1) check (gender in ('M','F'));

-- Update the trigger to also save gender from signup metadata
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, gender)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'gender'
  )
  on conflict (id) do nothing;
  return new;
exception when others then
  raise warning 'handle_new_user failed: %', sqlerrm;
  return new;
end;
$$ language plpgsql security definer set search_path = public;
