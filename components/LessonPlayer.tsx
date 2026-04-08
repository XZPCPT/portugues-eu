'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { cn, XP_PER_EXERCISE, XP_BONUS_FLAWLESS, MAX_HEARTS, starsFromMistakes, speak } from '@/lib/utils';
import type { Lesson } from '@/data/lessons';
import Hearts from '@/components/ui/Hearts';
import XPBar from '@/components/ui/XPBar';
import MultipleChoice from '@/components/exercises/MultipleChoice';
import FillBlank from '@/components/exercises/FillBlank';
import TapPairs from '@/components/exercises/TapPairs';
import ArrangeWords from '@/components/exercises/ArrangeWords';
import TypeAnswer from '@/components/exercises/TypeAnswer';

interface LessonPlayerProps {
  lesson: Lesson;
  onComplete?: (stars: number, xpGained: number) => void;
}

type Phase = 'vocab' | 'exercises' | 'complete';

export default function LessonPlayer({ lesson, onComplete }: LessonPlayerProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('vocab');
  const [vocabIdx, setVocabIdx] = useState(0);
  const [exIdx, setExIdx] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [mistakes, setMistakes] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [key, setKey] = useState(0); // force remount exercise

  const totalExercises = lesson.exercises.length;
  const currentExercise = lesson.exercises[exIdx];
  const currentWord = lesson.words[vocabIdx];

  /* ── Vocab phase handlers ── */
  const nextVocab = () => {
    if (vocabIdx < lesson.words.length - 1) {
      setVocabIdx(v => v + 1);
    } else {
      setPhase('exercises');
    }
  };

  const prevVocab = () => {
    if (vocabIdx > 0) setVocabIdx(v => v - 1);
  };

  /* ── Exercise result handler ── */
  const handleResult = useCallback((correct: boolean) => {
    if (correct) {
      setXpGained(x => x + XP_PER_EXERCISE);
    } else {
      setMistakes(m => m + 1);
      setHearts(h => Math.max(0, h - 1));
    }

    const nextIdx = exIdx + 1;
    if (nextIdx >= totalExercises) {
      // Lesson complete
      const stars = starsFromMistakes(mistakes + (correct ? 0 : 1));
      const bonusXp = (mistakes === 0 && correct) ? XP_BONUS_FLAWLESS : 0;
      const totalXp = xpGained + (correct ? XP_PER_EXERCISE : 0) + bonusXp;
      setXpGained(totalXp);
      setPhase('complete');
      onComplete?.(stars, totalXp);
    } else {
      setExIdx(nextIdx);
      setKey(k => k + 1);
    }
  }, [exIdx, totalExercises, mistakes, xpGained, onComplete]);

  /* ── Vocabulary phase ── */
  if (phase === 'vocab') {
    return (
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()} className="btn-secondary px-3 py-2 text-sm">← Back</button>
          <div className="flex-1">
            <div className="text-xs font-bold uppercase tracking-widest text-txt3 mb-1">{lesson.number}</div>
            <h1 className="font-serif text-xl text-txt">{lesson.title}</h1>
          </div>
          <div className="chip-gold">{lesson.emoji}</div>
        </div>

        <XPBar current={vocabIdx} total={lesson.words.length} label="Words" />

        {/* Flashcard */}
        <div className="mt-6 rounded-3xl border border-blu/10 bg-gradient-to-br from-ivory to-[#f0f8ff] shadow-hero p-8 text-center min-h-[320px] flex flex-col items-center justify-center gap-3 relative overflow-hidden animate-slide-up">
          <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-blu/5 pointer-events-none" />
          <div className="text-6xl animate-float">{currentWord ? lesson.emoji : '🎉'}</div>
          <button
            onClick={() => speak(currentWord.pt)}
            className="font-serif text-5xl text-blu hover:opacity-75 transition-opacity active:scale-95"
          >
            {currentWord.pt}
          </button>
          <p className="text-lg text-txt2">{currentWord.en}</p>
          <div className="flex items-center gap-2 bg-blu4 rounded-full px-4 py-1.5 text-sm text-blu italic">
            🔈 {currentWord.phonetic}
          </div>
          <div className="bg-sage2 rounded-xl px-4 py-2.5 text-sm text-sage font-medium w-full">
            {currentWord.example}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-5">
          {lesson.words.map((_, i) => (
            <div key={i} className={cn('w-2 h-2 rounded-full transition-colors', i === vocabIdx ? 'bg-blu' : i < vocabIdx ? 'bg-blu3' : 'bg-brd')} />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 gap-3">
          <button onClick={prevVocab} disabled={vocabIdx === 0} className="btn-secondary disabled:opacity-30">← Prev</button>
          <button onClick={() => speak(currentWord.pt)} className="flex items-center gap-2 bg-blu/10 text-blu rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-blu/20 transition-colors">
            🔊 Listen
          </button>
          <button onClick={nextVocab} className="btn-primary">
            {vocabIdx < lesson.words.length - 1 ? 'Next →' : 'Start Exercises →'}
          </button>
        </div>
      </div>
    );
  }

  /* ── Exercises phase ── */
  if (phase === 'exercises') {
    return (
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()} className="text-txt3 hover:text-txt text-sm">✕</button>
          <div className="flex-1 bg-brd rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full progress-shimmer transition-all duration-500"
              style={{ width: `${((exIdx) / totalExercises) * 100}%` }}
            />
          </div>
          <Hearts current={hearts} />
        </div>

        {/* Exercise card */}
        <div className="card p-6 min-h-[380px]" key={key}>
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
          ) : currentExercise.type === 'typeAnswer' ? (
            <TypeAnswer
              prompt={currentExercise.prompt!}
              hint={currentExercise.hint}
              correct={currentExercise.correct!}
              alternates={currentExercise.alternates}
              onResult={handleResult}
            />
          ) : null}
        </div>

        {/* XP indicator */}
        <p className="text-center text-xs text-txt3 mt-3">
          {exIdx + 1} / {totalExercises} · {xpGained} XP earned
        </p>
      </div>
    );
  }

  /* ── Complete screen ── */
  const stars = starsFromMistakes(mistakes);
  const starStr = ['☆☆☆', '⭐☆☆', '⭐⭐☆', '⭐⭐⭐'][stars] ?? '⭐⭐⭐';

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center animate-pop-in">
      <div className="text-7xl mb-4">{lesson.emoji}</div>
      <h2 className="font-serif text-3xl text-txt mb-2">Lesson Complete!</h2>
      <p className="text-txt3 mb-6">{lesson.title}</p>

      <div className="text-4xl mb-2">{starStr}</div>

      <div className="flex justify-center gap-8 my-8">
        <div className="text-center">
          <div className="font-serif text-3xl text-gold">+{xpGained}</div>
          <div className="text-xs text-txt3 uppercase tracking-wide">XP Earned</div>
        </div>
        <div className="text-center">
          <div className="font-serif text-3xl text-txt">{hearts}</div>
          <div className="text-xs text-txt3 uppercase tracking-wide">Hearts Left</div>
        </div>
        <div className="text-center">
          <div className="font-serif text-3xl text-sage">{mistakes === 0 ? '✨' : mistakes}</div>
          <div className="text-xs text-txt3 uppercase tracking-wide">{mistakes === 0 ? 'Flawless!' : 'Mistakes'}</div>
        </div>
      </div>

      {mistakes === 0 && (
        <div className="bg-gold2 border border-gold rounded-xl p-3 mb-6 text-sm text-gold font-semibold">
          ✨ Flawless lesson! +{XP_BONUS_FLAWLESS} bonus XP
        </div>
      )}

      <div className="flex gap-3 justify-center">
        <button onClick={() => router.push('/learn')} className="btn-secondary">
          All Lessons
        </button>
        <button onClick={() => router.push('/learn')} className="btn-primary">
          Continue →
        </button>
      </div>
    </div>
  );
}
