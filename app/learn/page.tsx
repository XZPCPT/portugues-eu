'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { ALL_LESSONS } from '@/data/all-lessons';
import { loadProgress, type ProgressState, defaultProgress } from '@/lib/progress';

export default function LearnPage() {
  const [state, setState] = useState<ProgressState>(defaultProgress);

  useEffect(() => {
    loadProgress().then(setState);
  }, []);

  const getLessonStatus = (id: number): 'completed' | 'active' | 'locked' => {
    if (state.lessonProgress[id]?.completed) return 'completed';
    const firstIncomplete = ALL_LESSONS.find(l => !state.lessonProgress[l.id]?.completed);
    if (firstIncomplete?.id === id || (id === 1 && !state.lessonProgress[1]?.completed)) return 'active';
    return 'locked';
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar xp={state.xp} hearts={state.hearts} streak={state.streak} />

      <main className="max-w-3xl mx-auto px-4 py-8 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="btn-secondary text-sm px-3 py-2">← Home</Link>
          <div>
            <h1 className="font-serif text-2xl text-txt">A1 Lessons</h1>
            <p className="text-xs text-txt3">European Portuguese · Beginner · {ALL_LESSONS.length} lessons</p>
          </div>
        </div>

        <div className="grid gap-4">
          {ALL_LESSONS.map((lesson) => {
            const status = getLessonStatus(lesson.id);
            const progress = state.lessonProgress[lesson.id];
            const stars = progress?.stars ?? 0;
            const isLocked = status === 'locked';
            const isDone = status === 'completed';

            const card = (
              <div className={`card p-4 flex items-center gap-4 transition-all duration-200 ${
                isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-hero hover:-translate-y-0.5'
              } ${status === 'active' ? 'ring-2 ring-blu/30' : ''}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0 border-2 ${
                  isDone ? 'bg-sage2 border-sage' :
                  status === 'active' ? 'bg-blu4 border-blu animate-glow' :
                  'bg-cream border-brd'
                }`}>
                  {isLocked ? '🔒' : lesson.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold uppercase tracking-widest text-txt3">{lesson.number}</div>
                  <div className="font-serif text-lg text-txt leading-tight">{lesson.title}</div>
                  <div className="text-xs text-txt3 mt-0.5 truncate">{lesson.theme}</div>
                </div>

                <div className="text-right shrink-0">
                  {isDone && <div className="text-sm mb-1">{[1,2,3].map(s => s <= stars ? '⭐' : '☆').join('')}</div>}
                  {status === 'active' && <div className="chip-gold text-xs">Start!</div>}
                  {isLocked && <div className="text-xs text-txt3">🔒 Locked</div>}
                </div>
              </div>
            );

            return isLocked ? (
              <div key={lesson.id}>{card}</div>
            ) : (
              <Link key={lesson.id} href={`/learn/${lesson.id}`} className="no-underline block">
                {card}
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
