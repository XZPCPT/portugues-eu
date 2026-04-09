import { createClient } from '@/lib/supabase';

export const STORAGE_KEY = 'pt_eu_v1';

export interface LessonRecord {
  stars: number;
  completed: boolean;
}

export interface WordReview {
  due: string;      // ISO date string
  interval: number; // days until next review
  ease: number;     // easiness factor (SM-2)
  reps: number;     // total repetitions
}

export interface ProgressState {
  xp: number;
  hearts: number;
  streak: number;
  lastPracticed?: string; // ISO date
  earnedAchievements: string[];
  lessonProgress: Record<number, LessonRecord>;
  wordReviews: Record<string, WordReview>; // key: `${lessonId}-${wordIndex}`
}

export const defaultProgress: ProgressState = {
  xp: 0,
  hearts: 5,
  streak: 0,
  earnedAchievements: [],
  lessonProgress: {},
  wordReviews: {},
};

// ── Streak calculation ────────────────────────────────────────────────────────
export function calculateStreak(lastPracticed: string | undefined, currentStreak: number): number {
  if (!lastPracticed) return 0;
  const last = new Date(lastPracticed);
  const today = new Date();
  const diffDays = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return currentStreak;       // already practiced today
  if (diffDays === 1) return currentStreak + 1;   // practiced yesterday — keep streak
  return 0;                                        // streak broken
}

// ── Local storage ─────────────────────────────────────────────────────────────
export function loadLocal(): ProgressState {
  if (typeof window === 'undefined') return { ...defaultProgress };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultProgress, ...JSON.parse(raw) } : { ...defaultProgress };
  } catch { return { ...defaultProgress }; }
}

export function saveLocal(state: ProgressState) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

// ── Supabase ──────────────────────────────────────────────────────────────────
export async function loadFromSupabase(): Promise<ProgressState | null> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error || !data) return null;

    return {
      xp: data.xp ?? 0,
      hearts: data.hearts ?? 5,
      streak: calculateStreak(data.last_practiced, data.streak ?? 0),
      lastPracticed: data.last_practiced,
      earnedAchievements: data.earned_achievements ?? [],
      lessonProgress: data.lesson_progress ?? {},
      wordReviews: data.word_reviews ?? {},
    };
  } catch { return null; }
}

export async function saveToSupabase(state: ProgressState): Promise<void> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];

    await supabase.from('user_progress').upsert({
      user_id: user.id,
      xp: state.xp,
      hearts: state.hearts,
      streak: state.streak,
      last_practiced: today,
      earned_achievements: state.earnedAchievements,
      lesson_progress: state.lessonProgress,
      word_reviews: state.wordReviews,
    }, { onConflict: 'user_id' });
  } catch {}
}

// ── Unified save (saves to both local + Supabase if logged in) ────────────────
export async function saveProgress(state: ProgressState): Promise<void> {
  saveLocal(state);
  await saveToSupabase(state); // silently no-ops if not logged in
}

// ── Unified load (prefers Supabase if logged in, falls back to local) ─────────
export async function loadProgress(): Promise<ProgressState> {
  const remote = await loadFromSupabase();
  if (remote) {
    saveLocal(remote); // keep local in sync
    return remote;
  }
  return loadLocal();
}
