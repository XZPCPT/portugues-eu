'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { loadProgress, type ProgressState, defaultProgress } from '@/lib/progress';
import { countDue } from '@/lib/srs';
import { ALL_LESSONS, ACHIEVEMENTS } from '@/data/all-lessons';
import { createClient } from '@/lib/supabase';

interface UserInfo {
  email: string | null;
  fullName: string | null;
}

export default function ProfilePage() {
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: { user: u } } = await supabase.auth.getUser();
      if (u) {
        setUser({
          email: u.email ?? null,
          fullName: u.user_metadata?.full_name ?? null,
        });
      }
      const p = await loadProgress();
      setProgress(p);
      setLoading(false);
    };
    init();
  }, []);

  const completedCount = Object.values(progress.lessonProgress).filter(p => p.completed).length;
  const totalWords = completedCount * 5;
  const dueCount = countDue(progress.wordReviews);
  const maxStars = completedCount * 3;
  const earnedStars = Object.values(progress.lessonProgress).reduce((sum, p) => sum + (p.stars ?? 0), 0);

  // Last 7 days practice history (based on wordReviews "reps" as proxy)
  const today = new Date();
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  const displayName = user?.fullName ?? user?.email?.split('@')[0] ?? 'Learner';

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl mb-3 animate-float">🇵🇹</div>
          <p className="text-txt3 text-sm">Loading your progress…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar xp={progress.xp} hearts={progress.hearts} streak={progress.streak} />

      <main className="max-w-2xl mx-auto px-4 py-8 pb-20">

        {/* Back link */}
        <Link href="/home" className="btn-secondary text-sm px-3 py-2 inline-block mb-6">← Home</Link>

        {/* Profile header */}
        <div className="card p-6 mb-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blu2 to-blu flex items-center justify-center text-white font-serif text-2xl shrink-0 shadow-sm">
            {displayName[0]?.toUpperCase() ?? '?'}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-serif text-2xl text-txt leading-tight truncate">{displayName}</h1>
            {user?.email && <p className="text-xs text-txt3 mt-0.5 truncate">{user.email}</p>}
            {!user && (
              <p className="text-xs text-txt3 mt-0.5">
                Guest mode ·{' '}
                <Link href="/auth/login" className="text-blu2 underline-offset-2 hover:underline">Sign in</Link>
                {' '}to sync across devices
              </p>
            )}
          </div>
          <div className="shrink-0 text-right">
            <div className="chip-gold">{progress.streak > 0 ? `🔥 ${progress.streak} day streak` : 'No streak yet'}</div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total XP', value: progress.xp, emoji: '⚡', accent: '#0b3d82' },
            { label: 'Words Learned', value: totalWords, emoji: '📖', accent: '#c85830' },
            { label: 'Lessons Done', value: `${completedCount} / ${ALL_LESSONS.length}`, emoji: '🎓', accent: '#c98f00' },
            { label: 'Stars Earned', value: `${earnedStars} / ${maxStars || completedCount * 3}`, emoji: '⭐', accent: '#e07b39' },
          ].map(({ label, value, emoji, accent }) => (
            <div key={label} className="card p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: accent }} />
              <div className="text-xl mb-1">{emoji}</div>
              <div className="font-serif text-xl font-extrabold text-txt">{value}</div>
              <div className="text-xs text-txt3 mt-0.5 leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* SRS Review card — only shown if words are due */}
        {dueCount > 0 && (
          <Link href="/review" className="block no-underline card p-5 mb-6 border-2 border-terra/30 hover:shadow-hero transition-shadow group">
            <div className="flex items-center gap-4">
              <div className="text-3xl group-hover:animate-float">🔁</div>
              <div className="flex-1">
                <div className="text-xs font-bold uppercase tracking-widest text-terra mb-1">Spaced Repetition</div>
                <h3 className="font-serif text-lg text-txt">
                  {dueCount} word{dueCount !== 1 ? 's' : ''} due for review
                </h3>
                <p className="text-sm text-txt3 mt-0.5">Practice now to lock them in long-term</p>
              </div>
              <div className="shrink-0 bg-terra/10 text-terra font-bold text-sm rounded-full px-3 py-1">
                Review →
              </div>
            </div>
          </Link>
        )}

        {/* Lesson progress list */}
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-widest text-txt3 mb-3">Lessons</div>
          <div className="space-y-2">
            {ALL_LESSONS.map(lesson => {
              const lp = progress.lessonProgress[lesson.id];
              const done = lp?.completed ?? false;
              const stars = lp?.stars ?? 0;
              return (
                <div key={lesson.id} className={`card px-4 py-3 flex items-center gap-3 ${done ? '' : 'opacity-40'}`}>
                  <div className="text-xl shrink-0">{done ? lesson.emoji : '🔒'}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-txt3 font-bold uppercase tracking-widest">{lesson.number}</div>
                    <div className="font-medium text-txt truncate">{lesson.title}</div>
                  </div>
                  <div className="shrink-0 text-sm">
                    {done
                      ? [1, 2, 3].map(s => s <= stars ? '⭐' : '☆').join('')
                      : <span className="text-txt3 text-xs">Not started</span>
                    }
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-txt3 mb-3">Achievements</div>
          <div className="flex flex-wrap gap-2">
            {ACHIEVEMENTS.map(ach => {
              const earned = progress.earnedAchievements.includes(ach.id);
              return (
                <div
                  key={ach.id}
                  title={ach.desc}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                    earned
                      ? 'bg-gold2 border-gold text-gold shadow-sm'
                      : 'bg-ivory border-brd text-txt3 opacity-40 grayscale'
                  }`}
                >
                  <span>{ach.emoji}</span>
                  <span>{ach.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sign out / sign in */}
        <div className="mt-8 text-center">
          {user ? (
            <button
              onClick={async () => {
                const supabase = createClient();
                await supabase.auth.signOut();
                window.location.href = '/';
              }}
              className="btn-secondary text-sm px-5 py-2"
            >
              Sign out
            </button>
          ) : (
            <Link href="/auth/login" className="btn-primary text-sm px-5 py-2">
              Sign in to sync progress
            </Link>
          )}
        </div>

      </main>
    </div>
  );
}
