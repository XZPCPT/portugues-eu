'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import LessonCard from '@/components/LessonCard';
import { ALL_LESSONS, ACHIEVEMENTS } from '@/data/all-lessons';
import { loadProgress, type ProgressState, defaultProgress } from '@/lib/progress';
import { countDue } from '@/lib/srs';
import { createClient } from '@/lib/supabase';

export default function HomePage() {
  const [state, setState] = useState<ProgressState>(defaultProgress);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
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

  const nextLesson = ALL_LESSONS.find(l => !state.lessonProgress[l.id]?.completed) ?? ALL_LESSONS[0];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar xp={state.xp} hearts={state.hearts} streak={state.streak} reviewCount={dueCount} />

      <main className="max-w-3xl mx-auto px-4 py-8 pb-24">

        {/* Greeting */}
        {greeting && (
          <p className="font-serif text-2xl text-txt mb-6 animate-slide-up italic">{greeting}</p>
        )}

        {/* ── Hero card — dark azulejo ── */}
        <Link
          href={`/learn/${nextLesson.id}`}
          className="card-dark block no-underline rounded-3xl overflow-hidden mb-6 shadow-hero group"
          style={{ borderRadius: '24px' }}
        >
          <div className="relative p-7 flex items-center justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full mb-3"
                style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)', color: 'rgba(255,255,255,.55)' }}>
                {completedCount === 0 ? 'Start here' : 'Continue learning'}
              </span>
              <h2 className="font-serif text-2xl text-white mb-1 font-normal">{nextLesson.title}</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,.6)' }}>{nextLesson.theme}</p>
              <button className="btn-primary text-sm px-6 py-2.5">
                {completedCount === 0 ? 'Begin Lesson →' : 'Continue →'}
              </button>
            </div>
            <div className="shrink-0 text-6xl opacity-90">{nextLesson.emoji}</div>
          </div>
        </Link>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: 'XP', value: state.xp, sub: 'points', accent: '#1A3B9E' },
            { label: 'Words', value: totalWords, sub: 'learned', accent: '#BF4F2A' },
            { label: 'Lessons', value: completedCount, sub: `of ${ALL_LESSONS.length}`, accent: '#C49A2E' },
            { label: 'Streak', value: state.streak, sub: 'days 🔥', accent: '#e53e2f' },
          ].map(({ label, value, sub, accent }) => (
            <div key={label} className="card p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: accent }} />
              <div className="text-xs font-bold uppercase tracking-widest text-txt3 mb-1">{label}</div>
              <div className="font-serif text-2xl text-txt">{value}</div>
              <div className="text-xs text-txt3 mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        {/* ── SRS review nudge ── */}
        {dueCount > 0 && (
          <Link href="/review" className="block no-underline mb-6">
            <div className="card p-4 flex items-center gap-4 hover:shadow-hero transition-shadow group"
              style={{ borderColor: 'rgba(191,79,42,.25)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                style={{ background: 'rgba(191,79,42,.1)', color: '#BF4F2A' }}>↺</div>
              <div className="flex-1">
                <span className="font-semibold text-txt text-sm">{dueCount} word{dueCount !== 1 ? 's' : ''} due for review</span>
                <p className="text-txt3 text-xs mt-0.5">Keep your streak strong</p>
              </div>
              <span className="chip-gold shrink-0">Review →</span>
            </div>
          </Link>
        )}

        {/* ── Lesson path ── */}
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-txt3 mb-4">Your Learning Path</p>
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
                    <div className={`w-8 h-1 rounded-full mx-1 ${state.lessonProgress[lesson.id]?.completed ? 'bg-sage' : 'bg-brd'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Culture Trivia — active card style ── */}
        <Link href="/trivia" className="block no-underline mb-6">
          <div className="card-active rounded-3xl p-6 flex items-center gap-5 shadow-card hover:shadow-hero transition-shadow group"
            style={{ border: '1px solid rgba(26,59,158,.15)', borderRadius: '24px' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 -rotate-3 group-hover:rotate-0 transition-transform"
              style={{ background: 'rgba(26,59,158,.1)', color: '#1A3B9E' }}>🏰</div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-txt3 mb-1">Culture Trivia</p>
              <h3 className="font-serif text-lg text-txt font-normal">Test your Portugal knowledge</h3>
              <p className="text-sm text-txt3 mt-0.5">Fado · Geography · History · Food · Football</p>
            </div>
            <span className="chip-gold shrink-0">5 topics</span>
          </div>
        </Link>

        {/* ── Achievements ── */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-txt3 mb-4">Achievements</p>
          <div className="flex flex-wrap gap-2">
            {ACHIEVEMENTS.map(ach => {
              const earned = state.earnedAchievements.includes(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                    earned ? 'bg-gold2 border-gold text-gold shadow-sm' : 'bg-ivory border-brd text-txt3 opacity-40 grayscale'
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
