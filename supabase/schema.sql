-- ── Run this entire file in your Supabase dashboard ──────────────────────────
-- Go to: supabase.com → your project → SQL Editor → New query → paste → Run
-- Safe to re-run: uses IF NOT EXISTS and DROP IF EXISTS throughout

-- ── 1. Profiles ──────────────────────────────────────────────────────────────
create table if not exists profiles (
  id          uuid references auth.users on delete cascade primary key,
  full_name   text,
  -- 'M' = Masculino (Bem-vindo/obrigado), 'F' = Feminino (Bem-vinda/obrigada)
  gender      char(1) check (gender in ('M','F')),
  created_at  timestamptz default now()
);

-- Auto-create a profile when a new user signs up
-- IMPORTANT: exception handler ensures signup NEVER fails due to profile errors
-- set search_path = public avoids schema resolution issues in Supabase
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
  -- Log the error but never block signup
  raise warning 'handle_new_user failed: %', sqlerrm;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── 2. User progress ─────────────────────────────────────────────────────────
create table if not exists user_progress (
  id                   uuid default gen_random_uuid() primary key,
  user_id              uuid references auth.users on delete cascade not null unique,
  xp                   integer default 0,
  hearts               integer default 5,
  streak               integer default 0,
  last_practiced       date,
  earned_achievements  text[]  default '{}',
  lesson_progress      jsonb   default '{}',
  -- SRS: word review data { wordKey: { due: ISO date, interval: days, ease: float } }
  word_reviews         jsonb   default '{}',
  updated_at           timestamptz default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql set search_path = public;

drop trigger if exists user_progress_updated_at on user_progress;
create trigger user_progress_updated_at
  before update on user_progress
  for each row execute procedure update_updated_at();

-- ── 3. Row Level Security ─────────────────────────────────────────────────────
alter table profiles      enable row level security;
alter table user_progress enable row level security;

-- Drop policies first so this file is safe to re-run
drop policy if exists "Users can view own profile"   on profiles;
drop policy if exists "Users can insert own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;
drop policy if exists "Users can view own progress"   on user_progress;
drop policy if exists "Users can insert own progress" on user_progress;
drop policy if exists "Users can update own progress" on user_progress;

-- Profiles
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);
create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Progress
create policy "Users can view own progress"
  on user_progress for select using (auth.uid() = user_id);
create policy "Users can insert own progress"
  on user_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress"
  on user_progress for update using (auth.uid() = user_id);
