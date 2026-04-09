-- ── Run this entire file in your Supabase dashboard ──────────────────────────
-- Go to: supabase.com → your project → SQL Editor → New query → paste → Run

-- ── 1. Profiles ──────────────────────────────────────────────────────────────
create table if not exists profiles (
  id          uuid references auth.users on delete cascade primary key,
  full_name   text,
  created_at  timestamptz default now()
);

-- Auto-create a profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

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
$$ language plpgsql;

drop trigger if exists user_progress_updated_at on user_progress;
create trigger user_progress_updated_at
  before update on user_progress
  for each row execute procedure update_updated_at();

-- ── 3. Row Level Security ─────────────────────────────────────────────────────
alter table profiles      enable row level security;
alter table user_progress enable row level security;

-- Profiles: users can only see/edit their own
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Progress: users can only see/edit their own
create policy "Users can view own progress"
  on user_progress for select using (auth.uid() = user_id);
create policy "Users can insert own progress"
  on user_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress"
  on user_progress for update using (auth.uid() = user_id);
