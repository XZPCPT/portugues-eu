'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypeAnswerProps {
  prompt: string;
  hint?: string;
  correct: string;
  alternates?: string[];
  onResult: (correct: boolean) => void;
}

export default function TypeAnswer({ prompt, hint, correct, alternates = [], onResult }: TypeAnswerProps) {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const normalize = (s: string) => s.trim().toLowerCase();

  const handleSubmit = () => {
    if (submitted || !value.trim()) return;
    const all = [correct, ...alternates].map(normalize);
    const ok = all.includes(normalize(value));
    setIsCorrect(ok);
    setSubmitted(true);
    setTimeout(() => onResult(ok), 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="animate-slide-up">
      <div className="flex items-start gap-3 mb-6">
        <div className="text-xl">⌨️</div>
        <div>
          <div className="text-xs font-bold text-txt3 uppercase tracking-widest mb-1">Type your answer</div>
          <p className="font-serif text-xl text-txt">{prompt}</p>
          {hint && (
            <div className="mt-2 inline-flex items-center gap-2 bg-blu4 rounded-full px-3 py-1 text-xs text-blu italic">
              🔈 {hint}
            </div>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={submitted}
        placeholder="Type in Portuguese…"
        autoFocus
        className={cn(
          'w-full rounded-xl border-2 px-4 py-3.5 font-serif text-xl text-txt outline-none transition-all duration-200 mb-4',
          !submitted && 'border-brd bg-ivory focus:border-blu focus:bg-blu4/20',
          submitted && isCorrect && 'border-sage bg-sage2 text-sage',
          submitted && !isCorrect && 'border-coral bg-coral/10 text-coral',
        )}
      />

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className={cn('w-full btn-primary py-3.5', !value.trim() && 'opacity-40 cursor-not-allowed')}
        >
          Check ✓
        </button>
      ) : (
        <div className={cn(
          'rounded-xl p-4 text-center font-medium',
          isCorrect ? 'bg-sage2 text-sage' : 'bg-coral/10 text-coral',
        )}>
          {isCorrect ? '✅ Perfeito!' : `❌ Correct: "${correct}"`}
        </div>
      )}
    </div>
  );
}
