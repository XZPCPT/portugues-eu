'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ArrangeWordsProps {
  instruction: string;
  words: string[];
  correct: string;
  onResult: (correct: boolean) => void;
}

export default function ArrangeWords({ instruction, words, correct, onResult }: ArrangeWordsProps) {
  const [bank, setBank]         = useState(() => [...words].sort(() => Math.random() - 0.5));
  const [arranged, setArranged] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const addWord = (word: string, idx: number) => {
    if (submitted) return;
    setArranged(prev => [...prev, word]);
    setBank(prev => prev.filter((_, i) => i !== idx));
  };

  const removeWord = (idx: number) => {
    if (submitted) return;
    const word = arranged[idx];
    setBank(prev => [...prev, word]);
    setArranged(prev => prev.filter((_, i) => i !== idx));
  };

  const handleCheck = () => {
    const ok = arranged.join(' ').trim() === correct.trim();
    setIsCorrect(ok);
    setSubmitted(true);
    setTimeout(() => onResult(ok), 880);
  };

  return (
    <div className="animate-slide-up flex flex-col gap-5">

      {/* Prompt */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>
          Arrange the words
        </p>
        <p className="text-sm font-medium" style={{ color: 'var(--navy)' }}>{instruction}</p>
      </div>

      {/* Answer slot */}
      <div
        className={cn(
          'min-h-[52px] rounded-2xl p-3 flex flex-wrap gap-2 items-center transition-all duration-300',
          !submitted && 'border-2 border-dashed',
        )}
        style={{
          borderColor: submitted
            ? 'transparent'
            : 'var(--border-2)',
          background: submitted && isCorrect
            ? 'rgba(58,125,92,.08)'
            : submitted && !isCorrect
              ? 'rgba(191,79,42,.06)'
              : 'rgba(255,255,255,.5)',
          border: submitted
            ? `1px solid ${isCorrect ? 'rgba(58,125,92,.30)' : 'rgba(191,79,42,.28)'}`
            : undefined,
          borderRadius: 16,
        }}
      >
        {arranged.length === 0 ? (
          <span className="text-sm italic" style={{ color: 'var(--muted)' }}>
            Tap words below to build your answer…
          </span>
        ) : (
          arranged.map((word, i) => (
            <button
              key={`${word}-${i}`}
              onClick={() => removeWord(i)}
              className={cn(
                'word-chip',
                submitted && isCorrect  && 'correct',
                submitted && !isCorrect && 'wrong',
                !submitted && 'in-slot',
              )}
            >
              {word}
            </button>
          ))
        )}
      </div>

      {/* Word bank */}
      <div className="flex flex-wrap gap-2 justify-center">
        {bank.map((word, i) => (
          <button
            key={`${word}-${i}`}
            onClick={() => addWord(word, i)}
            className="word-chip"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Check / feedback */}
      {!submitted ? (
        <button
          onClick={handleCheck}
          disabled={arranged.length !== words.length}
          className="btn-primary w-full justify-center py-3.5"
        >
          Check
        </button>
      ) : (
        <div className={isCorrect ? 'feedback-correct' : 'feedback-wrong'}>
          {isCorrect ? (
            <>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#2E7D5A" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
              <span>Correct!</span>
            </>
          ) : (
            <>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--terra)' }}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              <span>Answer: <span className="font-serif italic ml-1" style={{ color: 'var(--navy)' }}>{correct}</span></span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
