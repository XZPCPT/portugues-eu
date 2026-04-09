'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

// ── Types ────────────────────────────────────────────────────────────────────

export interface UserStats {
  xp: number;
  streak: number;
  last_active: string | null;
}

export interface LessonProgress {
  lesson_id: number;
  stars: number;
  completed: boolean;
}

export interface AppState {
  user: User | null;
  stats: UserStats;
  lessonProgress: Record<number, LessonProgress>;
  loading: boolean;
}

const DEFAULT_STATS: UserStats = { xp: 0, streak: 0, last_active: null };
const LOCAL_KEY = 'pt_eu_v1';

// ── Main hook ────────────────────────────────────────────────────────────────

export function useAppState() {
  const [state, setState] = useState<AppState>({
    user: null,
    stats: DEFAULT_STATS,
    lessonProgress: {},
    loading: true,
  });

  const supabase = createClient();

  // Load initial state
  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Load from Supabase
        const [statsRes, progressRes] = await Promise.all([
          supabase.from('user_stats').select('*').eq('user_id', user.id).single(),
          supabase.from('lesson_progress').select('*').eq('user_id', user.id),
        ]);

        const stats = statsRes.data ?? DEFAULT_STATS;
        const progressArr: LessonProgress[] = progressRes.data ?? [];
        const progress: Record<number, LessonProgress> = {};
        progressArr.forEach(p => { progress[p.lesson_id] = p; });

        // Check and update streak
        const today = new Date().toISOString().split('T')[0];
        const lastActive = stats.last_active;
        let streak = stats.streak;

        if (lastActive) {
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
          if (lastActive < yesterday) streak = 0;
        }

        setState({ user, stats: { ...stats, streak }, lessonProgress: progress, loading: false });
      } else {
        // Load from localStorage
        try {
          const saved = localStorage.getItem(LOCAL_KEY);
          if (saved) {
            const local = JSON.parse(saved);
            setState({
              user: null,
              stats: { xp: local.xp ?? 0, streak: local.streak ?? 0, last_active: null },
              lessonProgress: local.lessonProgress ?? {},
              loading: false,
            });
            return;
          }
        } catch (_) {}
        setState(s => ({ ...s, loading: false }));
      }
    };

    load();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => load());
    return () => subscription.unsubscribe();
  }, []);

  // Save lesson completion
  const saveCompletion = useCallback(async (
    lessonId: number,
    stars: number,
    xpGained: number,
  ) => {
    setState(prev => {
      const existing = prev.lessonProgress[lessonId];
      const newProgress = {
        ...prev.lessonProgress,
        [lessonId]: {
          lesson_id: lessonId,
          stars: Math.max(stars, existing?.stars ?? 0),
          completed: true,
        },
      };

      const today = new Date().toISOString().split('T')[0];
      const lastActive = prev.stats.last_active;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const newStreak = lastActive === today
        ? prev.stats.streak
        : lastActive === yesterday
          ? prev.stats.streak + 1
          : 1;

      const newStats = {
        xp: prev.stats.xp + xpGained,
        streak: newStreak,
        last_active: today,
      };

      // Persist
      if (prev.user) {
        const supabase = createClient();
        // Upsert lesson progress
        supabase.from('lesson_progress').upsert({
          user_id: prev.user.id,
          lesson_id: lessonId,
          stars: newProgress[lessonId].stars,
          completed: true,
          completed_at: new Date().toISOString(),
        }, { onConflict: 'user_id,lesson_id' }).then(() => {});

        // Update stats
        supabase.from('user_stats').update({
          xp: newStats.xp,
          streak: newStats.streak,
          last_active: today,
        }).eq('user_id', prev.user.id).then(() => {});
      } else {
        // Save to localStorage
        try {
          const saved = localStorage.getItem(LOCAL_KEY);
          const local = saved ? JSON.parse(saved) : {};
          localStorage.setItem(LOCAL_KEY, JSON.stringify({
            ...local,
            xp: newStats.xp,
            streak: newStats.streak,
            lessonProgress: newProgress,
          }));
        } catch (_) {}
      }

      return { ...prev, stats: newStats, lessonProgress: newProgress };
    });
  }, []);

  return { ...state, saveCompletion };
}
