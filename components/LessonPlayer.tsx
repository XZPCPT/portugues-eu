'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { Lesson } from '@/data/lessons';
import MultipleChoice from '@/components/exercises/MultipleChoice';
import FillBlank      from '@/components/exercises/FillBlank';
import TapPairs       from '@/components/exercises/TapPairs';
import ArrangeWords   from '@/components/exercises/ArrangeWords';

// ── Constants ──────────────────────────────────────────────────────────────
const XP_PER_EXERCISE  = 10;
const XP_BONUS_FLAWLESS = 30;
const MAX_HEARTS = 5;

function starsFromMistakes(n: number) {
  if (n === 0) return 3;
  if (n <= 2)  return 2;
  if (n <= 4)  return 1;
  return 0;
}

// ── Types ──────────────────────────────────────────────────────────────────
type Phase = 'vocab' | 'exercises' | 'complete';

interface LessonPlayerProps {
  lesson: Lesson;
  onComplete?: (stars: number, xpGained: number) => void;
}

// ── Sub-components ─────────────────────────────────────────────────────────

/** Thin top bar shared across phases */
function PlayerBar({
  progress, total, hearts, onClose,
}: { progress: number; total: number; hearts: number; onClose: () => void }) {
  return (
    <div
      className="flex items-center gap-3 px-5 py-4"
      style={{
        background: 'rgba(250,247,242,.90)',
        backdropFilter: 'saturate(160%) blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <button
        onClick={onClose}
        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
        style={{ background: 'var(--ivory)', border: '1px solid var(--border)' }}
        aria-label="Close lesson"
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--muted)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      {/* Progress bar */}
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(progress / total) * 100}%`,
            background: 'var(--cobalt)',
          }}
        />
      </div>

      {/* Hearts */}
      <div className="flex gap-1 flex-shrink-0">
        {Array.from({ length: MAX_HEARTS }).map((_, i) => (
          <span
            key={i}
            className="text-sm transition-all duration-300"
            style={{ opacity: i < hearts ? 1 : 0.18 }}
          >
            ♥
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function LessonPlayer({ lesson, onComplete }: LessonPlayerProps) {
  const router = useRouter();

  const [phase, setPhase]     = useState<Phase>('vocab');
  const [vocabIdx, setVocabIdx] = useState(0);
  const [exIdx, setExIdx]     = useState(0);
  const [hearts, setHearts]   = useState(MAX_HEARTS);
  const [mistakes, setMistakes] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [exerciseKey, setExerciseKey] = useState(0);

  const totalExercises = lesson.exercises.length;
  const currentExercise = lesson.exercises[exIdx];
  const currentWord = lesson.words[vocabIdx];

  // ── Vocab phase ────────────────────────────────────────────────────────
  const nextVocab = () => {
    if (vocabIdx < lesson.words.length - 1) setVocabIdx(v => v + 1);
    else setPhase('exercises');
  };
  const prevVocab = () => { if (vocabIdx > 0) setVocabIdx(v => v - 1); };

  // ── Exercise result ───────────────────────────────────────────────────
  const handleResult = useCallback((correct: boolean) => {
    let newMistakes = mistakes;
    let newXp = xpGained;

    if (correct) {
      newXp = xpGained + XP_PER_EXERCISE;
      setXpGained(newXp);
    } else {
      newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setHearts(h => Math.max(0, h - 1));
    }

    const nextIdx = exIdx + 1;
    if (nextIdx >= totalExercises) {
      const stars = starsFromMistakes(newMistakes);
      const bonus = newMistakes === 0 ? XP_BONUS_FLAWLESS : 0;
      setXpGained(newXp + bonus);
      setPhase('complete');
      onComplete?.(stars, newXp + bonus);
    } else {
      setExIdx(nextIdx);
      setExerciseKey(k => k + 1);
    }
  }, [exIdx, totalExercises, mistakes, xpGained, onComplete]);

  // ── VOCAB PHASE ────────────────────────────────────────────────────────
  if (phase === 'vocab') {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--cream)' }}>
        {/* Top bar */}
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid var(--border)', background: 'rgba(250,247,242,.90)', backdropFilter: 'saturate(160%) blur(12px)' }}>
          <button onClick={() => router.back()} className="btn-secondary py-2 px-3 text-sm">← Back</button>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>{lesson.number}</p>
            <p className="font-serif text-base font-medium" style={{ color: 'var(--navy)' }}>{lesson.title}</p>
          </div>
          {/* Word dots */}
          <div className="flex gap-1.5">
            {lesson.words.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{ background: i <= vocabIdx ? 'var(--cobalt)' : 'var(--border)' }}
              />
            ))}
          </div>
        </div>

        {/* Flashcard */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
          <div
            className="w-full max-w-sm rounded-3xl p-8 text-center flex flex-col items-center gap-4"
            style={{
              background: 'var(--ivory)',
              border: '1px solid var(--border)',
              boxShadow: '0 1px 0 rgba(15,28,63,.02), 0 16px 48px rgba(15,28,63,.08)',
            }}
          >
            <span className="text-5xl">{lesson.emoji}</span>

            <div>
              <p
                className="font-serif italic text-5xl font-light leading-none mb-2"
                style={{ color: 'var(--cobalt)', letterSpacing: '-0.02em' }}
              >
                {currentWord.pt}
              </p>
              <p className="text-lg font-medium" style={{ color: 'var(--navy)' }}>{currentWord.en}</p>
            </div>

            {/* Phonetic */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono"
              style={{ background: 'var(--cream-2)', color: 'var(--muted)', fontSize: 12 }}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--cobalt)', flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"/>
              </svg>
              {currentWord.phonetic}
            </div>

            {/* Example */}
            <div
              className="w-full rounded-xl px-4 py-3 text-sm text-left font-serif italic"
              style={{ background: 'var(--cream-2)', color: 'var(--navy)', borderLeft: '3px solid var(--cobalt)', borderRadius: '0 12px 12px 0' }}
            >
              {currentWord.example}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3 w-full max-w-sm">
            <button
              onClick={prevVocab}
              disabled={vocabIdx === 0}
              className="btn-secondary flex-shrink-0 disabled:opacity-30"
            >
              ←
            </button>
            <button onClick={nextVocab} className="btn-primary flex-1 justify-center py-3.5">
              {vocabIdx < lesson.words.length - 1 ? 'Next word' : 'Start exercises →'}
            </button>
          </div>

          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            {vocabIdx + 1} of {lesson.words.length} words
          </p>
        </div>
      </div>
    );
  }

  // ── EXERCISES PHASE ────────────────────────────────────────────────────
  if (phase === 'exercises') {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--cream)' }}>
        <PlayerBar
          progress={exIdx}
          total={totalExercises}
          hearts={hearts}
          onClose={() => router.back()}
        />

        <div className="flex-1 flex flex-col items-center justify-center p-5">
          <div className="w-full max-w-md card p-6 min-h-[360px] flex flex-col" key={exerciseKey}>

            {currentExercise.type === 'multipleChoice' || currentExercise.type === 'reverseChoice' ? (
              <MultipleChoice
                prompt={currentExercise.prompt!}
                audio={currentExercise.audio}
                options={currentExercise.options!}
                correct={currentExercise.correct!}
                onResult={handleResult}
              />
            ) : currentExercise.type === 'fillBlank' ? (
              <FillBlank
                instruction={currentExercise.instruction!}
                sentence={currentExercise.sentence!}
                correct={currentExercise.correct!}
                options={currentExercise.options!}
                translation={currentExercise.translation}
                onResult={handleResult}
              />
            ) : currentExercise.type === 'tapPairs' ? (
              <TapPairs
                instruction={currentExercise.instruction!}
                pairs={currentExercise.pairs!}
                onResult={handleResult}
              />
            ) : currentExercise.type === 'arrangeWords' ? (
              <ArrangeWords
                instruction={currentExercise.instruction!}
                words={currentExercise.words!}
                correct={currentExercise.correct!}
                onResult={handleResult}
              />
            ) : null}

          </div>

          <p className="mt-4 text-xs" style={{ color: 'var(--muted)' }}>
            {exIdx + 1} / {totalExercises} · {xpGained} XP
          </p>
        </div>
      </div>
    );
  }

  // ── COMPLETE SCREEN ────────────────────────────────────────────────────
  const stars = starsFromMistakes(mistakes);
  const flawless = mistakes === 0;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 animate-pop-in"
      style={{ background: 'var(--cream)' }}
    >
      <div
        className="w-full max-w-sm rounded-3xl p-8 flex flex-col items-center gap-6 text-center"
        style={{ background: 'var(--ivory)', border: '1px solid var(--border)', boxShadow: '0 1px 0 rgba(15,28,63,.02), 0 20px 60px rgba(15,28,63,.10)' }}
      >
        {/* Lesson emoji */}
        <span className="text-5xl">{lesson.emoji}</span>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
            Lesson complete
          </p>
          <h2 className="font-serif text-2xl font-medium" style={{ color: 'var(--navy)', letterSpacing: '-0.015em' }}>
            {lesson.title}
          </h2>
        </div>

        {/* Stars */}
        <div className="flex gap-2">
          {[1, 2, 3].map(s => (
            <svg
              key={s}
              width="28" height="28"
              viewBox="0 0 24 24"
              fill={s <= stars ? 'var(--gold)' : 'none'}
              stroke={s <= stars ? 'var(--gold)' : 'var(--border-2)'}
              strokeWidth="1.5"
              className="transition-all duration-300"
              style={{ transitionDelay: `${s * 80}ms` }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
            </svg>
          ))}
        </div>

        {/* Stats row */}
        <div
          className="w-full grid grid-cols-3 gap-2 rounded-2xl p-4"
          style={{ background: 'var(--cream-2)', border: '1px solid var(--border)' }}
        >
          {[
            { k: 'XP earned', v: `+${xpGained}`, color: 'var(--gold-deep)' },
            { k: 'Hearts left', v: `${hearts}/${MAX_HEARTS}`, color: 'var(--terra)' },
            { k: 'Mistakes', v: mistakes === 0 ? '0' : `${mistakes}`, color: mistakes === 0 ? '#2E7D5A' : 'var(--terra)' },
          ].map(stat => (
            <div key={stat.k} className="flex flex-col items-center gap-1">
              <span className="font-serif text-2xl font-medium" style={{ color: stat.color, letterSpacing: '-0.01em' }}>
                {stat.v}
              </span>
              <span className="text-xs uppercase tracking-wide font-bold" style={{ color: 'var(--muted)', fontSize: 9 }}>
                {stat.k}
              </span>
            </div>
          ))}
        </div>

        {/* Flawless bonus */}
        {flawless && (
          <div
            className="w-full rounded-xl px-4 py-3 text-sm font-semibold flex items-center justify-center gap-2"
            style={{ background: 'rgba(196,154,46,.10)', border: '1px solid rgba(196,154,46,.28)', color: 'var(--gold-deep)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--gold)" stroke="none"><path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/></svg>
            Flawless! +{XP_BONUS_FLAWLESS} bonus XP
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 w-full">
          <button onClick={() => router.push('/learn')} className="btn-secondary flex-1 justify-center">
            All lessons
          </button>
          <button onClick={() => router.push('/learn')} className="btn-primary flex-1 justify-center">
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
