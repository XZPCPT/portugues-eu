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
  const [bank, setBank] = useState(() => [...words].sort(() => Math.random() - 0.5));
  const [arranged, setArranged] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const addWord = (word: string, idx: number) => {
    if (submitted) return;
    setArranged(prev => [...prev, word]);
    setBank(prev => prev.filter((_, i) => i !== idx));
  };

  const removeWord = (word: string, idx: number) => {
    if (submitted) return;
    setBank(prev => [...prev, word]);
    setArranged(prev => prev.filter((_, i) => i !== idx));
  };

  const handleCheck = () => {
    if (arranged.length !== words.length) return;
    const attempt = arranged.join(' ');
    const ok = attempt.trim() === correct.trim();
    setIsCorrect(ok);
    setSubmitted(true);
    setTimeout(() => onResult(ok), 900);
  };

  return (
    <div className="animate-slide-up">
      <div className="flex items-start gap-3 mb-6">
        <div className="text-xl">🧩</div>
        <div>
          <div className="text-xs font-bold text-txt3 uppercase tracking-widest mb-1">Arrange the words</div>
          <p className="font-medium text-txt2">{instruction}</p>
        </div>
      </div>

      {/* Answer area */}
      <div className={cn(
        'min-h-[56px] rounded-xl border-2 p-3 mb-5 flex flex-wrap gap-2 items-center transition-all',
        !submitted && 'border-blu/30 bg-blu4/20',
        submitted && isCorrect && 'border-sage bg-sage2',
        submitted && !isCorrect && 'border-coral bg-coral/10',
      )}>
        {arranged.length === 0 && (
          <span className="text-txt3 text-sm italic">Tap words below to build your sentence…</span>
        )}
        {arranged.map((word, i) => (
          <button
            key={`${word}-${i}`}
            onClick={() => removeWord(word, i)}
            className={cn(
              'rounded-lg border px-3 py-1.5 font-serif text-base transition-all duration-150',
              !submitted && 'border-blu bg-white text-blu hover:bg-blu4 active:scale-95',
              submitted && isCorrect && 'border-sage text-sage bg-white',
              submitted && !isCorrect && 'border-coral text-coral bg-white',
            )}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Word bank */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {bank.map((word, i) => (
          <button
            key={`${word}-${i}`}
            onClick={() => addWord(word, i)}
            className="rounded-lg border-2 border-brd bg-ivory px-3 py-1.5 font-serif text-base text-txt2 hover:border-blu2 hover:bg-blu4/20 active:scale-95 transition-all duration-150"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Check button */}
      {!submitted && (
        <button
          onClick={handleCheck}
          disabled={arranged.length !== words.length}
          className={cn(
            'w-full btn-primary py-3.5',
            arranged.length !== words.length && 'opacity-40 cursor-not-allowed',
          )}
        >
          Check ✓
        </button>
      )}

      {submitted && (
        <div className={cn(
          'rounded-xl p-4 text-center font-medium',
          isCorrect ? 'bg-sage2 text-sage' : 'bg-coral/10 text-coral',
        )}>
          {isCorrect ? '✅ Perfect!' : `❌ Correct answer: "${correct}"`}
        </div>
      )}
    </div>
  );
}
