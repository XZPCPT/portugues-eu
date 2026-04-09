'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import LessonCard from '@/components/LessonCard';
import { ALL_LESSONS, ACHIEVEMENTS } from '@/data/all-lessons';
import { loadProgress, type ProgressState, defaultProgress } from '@/lib/progress';
import { countDue } from '@/lib/srs';
import { createClient } from '@/lib/supabase';

export default function HomePage() {
  const router = useRouter();
  const [state, setState] = useState<ProgressState>(defaultProgress);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      // Build gender-aware greeting
      if (user) {
        const gender = user.user_metadata?.gender as string | undefined;
        const name = user.user_metadata?.full_name as string | undefined;
        const first = name?.split(' ')[0] ?? '';
        const welcome = gender === 'F' ? 'Bem-vinda' : 'Bem-vindo';
        setGreeting(first ? `${welcome}, ${first}!` : `${welcome}!`);
      }
    };
    init();
    loadProgress().then(setState);
  }, []);

  const completedCount = Object.values(state.lessonProgress).filter(p => p.completed).length;
  const totalWords = completedCount * 5;
  const dueCount = countDue(state.wordReviews);

  const getLessonStatus = (id: number): 'completed' | 'active' | 'locked' => {
    if (state.lessonProgress[id]?.completed) return 'completed';
    const firstIncomplete = ALL_LESSONS.find(l => !state.lessonProgress[l.id]?.completed);
    if (firstIncomplete?.id === id) return 'active';
    if (id === 1 && !state.lessonProgress[1]?.completed) return 'active';
    return 'locked';
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar xp={state.xp} hearts={state.hearts} streak={state.streak} reviewCount={dueCount} />

      <main className="max-w-3xl mx-auto px-4 py-8 pb-20">

        {/* Gender-aware welcome */}
        {greeting && (
          <p className="font-serif text-xl text-txt mb-6 animate-slide-up">{greeting}</p>
        )}

        {/* Hero / next lesson card */}
        {(() => {
          const nextLesson = ALL_LESSONS.find(l => !state.lessonProgress[l.id]?.completed) ?? ALL_LESSONS[0];
          return (
            <Link
              href={`/learn/${nextLesson.id}`}
              className="block no-underline rounded-2xl overflow-hidden mb-8 shadow-hero relative"
              style={{ background: 'linear-gradient(135deg,#0b3d82 0%,#1a6ec4 100%)' }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg,rgba(255,255,255,.04) 0,rgba(255,255,255,.04) 1px,transparent 1px,transparent 14px),repeating-linear-gradient(-45deg,rgba(255,255,255,.04) 0,rgba(255,255,255,.04) 1px,transparent 1px,transparent 14px)',
                }}
              />
              <div className="relative p-6 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">
                    {completedCount === 0 ? 'Start here' : 'Continue learning'}
                  </div>
                  <h2 className="font-serif text-2xl text-white mb-1">{nextLesson.title}</h2>
                  <p className="text-sm text-white/75 max-w-sm leading-relaxed">{nextLesson.theme}</p>
                  <div className="mt-3 text-xs text-white/60">{nextLesson.number} · 5 new words · 10 exercises</div>
                </div>
                <div className="shrink-0 text-5xl">{nextLesson.emoji}</div>
              </div>
              <div className="relative px-6 pb-5">
                <div className="bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold text-sm rounded-xl px-5 py-2.5 inline-block hover:bg-white/25 transition-colors">
                  {completedCount === 0 ? 'Begin Lesson →' : 'Continue →'}
                </div>
              </div>
            </Link>
          );
        })()}

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { label: 'XP', value: state.xp, sub: 'total points', accent: '#0b3d82' },
            { label: 'Words', value: totalWords, sub: 'words learned', accent: '#c85830' },
            { label: 'Lessons', value: completedCount, sub: `of ${ALL_LESSONS.length} done`, accent: '#c98f00' },
            { label: 'Streak', value: state.streak, sub: 'day streak 🔥', accent: '#e53e2f' },
          ].map(({ label, value, sub, accent }) => (
            <div key={label} className="card p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: accent }} />
              <div className="text-xs font-bold uppercase tracking-widest text-txt3 mb-1">{label}</div>
              <div className="font-serif text-2xl font-extrabold text-txt">{value}</div>
              <div className="text-xs text-txt3 mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        {/* SRS review nudge */}
        {dueCount > 0 && (
          <Link href="/review" className="block no-underline card p-4 mb-6 border border-terra/30 hover:shadow-hero transition-shadow group flex items-center gap-4">
            <div className="text-2xl group-hover:animate-float">🔁</div>
            <div className="flex-1">
              <span className="font-semibold text-txt">{dueCount} word{dueCount !== 1 ? 's' : ''} due for review</span>
              <span className="text-txt3 text-sm ml-2">· Keep your streak strong</span>
            </div>
            <div className="chip-gold shrink-0">Review →</div>
          </Link>
        )}

        {/* Lesson path */}
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-widest text-txt3 mb-4">Your Learning Path</div>
          <div className="overflow-x-auto pb-2">
            <div className="flex items-center gap-0 min-w-max px-2">
              {ALL_LESSONS.map((lesson, i) => (
                <div key={lesson.id} className="flex items-center">
                  <LessonCard
                    lesson={lesson}
                    status={getLessonStatus(lesson.id)}
                    stars={state.lessonProgress[lesson.id]?.stars ?? 0}
                  />
                  {i < ALL_LESSONS.length - 1 && (
                    <div className={`w-10 h-1 rounded-full mx-1 ${state.lessonProgress[lesson.id]?.completed ? 'bg-gradient-to-r from-sage to-blu2' : 'bg-brd'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Culture Trivia CTA */}
        <Link href="/trivia" className="block no-underline card p-5 mb-8 hover:shadow-hero transition-shadow group">
          <div className="flex items-center gap-4">
            <div className="text-3xl group-hover:animate-float">🏰</div>
            <div className="flex-1">
              <div className="text-xs font-bold uppercase tracking-widest text-txt3 mb-1">Culture Trivia</div>
              <h3 className="font-serif text-lg text-txt">Test your Portugal knowledge</h3>
              <p className="text-sm text-txt3 mt-0.5">Fado · Geography · History · Food · Football</p>
            </div>
            <div className="chip-gold shrink-0">5 topics</div>
          </div>
        </Link>

        {/* Achievements */}
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-txt3 mb-4">Achievements</div>
          <div className="flex flex-wrap gap-2">
            {ACHIEVEMENTS.map(ach => {
              const earned = state.earnedAchievements.includes(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                    earned
                      ? 'bg-gold2 border-gold text-gold shadow-sm'
                      : 'bg-ivory border-brd text-txt3 opacity-50 grayscale'
                  }`}
                  title={ach.desc}
                >
                  <span>{ach.emoji}</span>
                  <span>{ach.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
