'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { speak } from '@/lib/utils';

interface MultipleChoiceProps {
  prompt: string;
  audio?: string;
  options: string[];
  correct: string;
  onResult: (correct: boolean) => void;
}

export default function MultipleChoice({ prompt, audio, options, correct, onResult }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (opt: string) => {
    if (submitted) return;
    setSelected(opt);
    setSubmitted(true);
    const isCorrect = opt === correct;
    setTimeout(() => onResult(isCorrect), 900);
  };

  return (
    <div className="animate-slide-up">
      <div className="flex items-start gap-3 mb-6">
        <div className="text-xl">🎯</div>
        <div>
          <div className="text-xs font-bold text-txt3 uppercase tracking-widest mb-1">Multiple Choice</div>
          <p className="font-serif text-xl text-txt">{prompt}</p>
          {audio && (
            <button
              onClick={() => speak(audio)}
              className="mt-2 flex items-center gap-2 bg-blu4 text-blu rounded-full px-3 py-1 text-sm font-medium hover:bg-blu3/40 transition-colors"
            >
              🔊 <span>{audio}</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => {
          const isSelected = selected === opt;
          const isCorrectOpt = opt === correct;
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className={cn(
                'rounded-xl border-2 px-4 py-3.5 text-left font-medium text-sm transition-all duration-200',
                !submitted && 'border-brd bg-ivory hover:border-blu2 hover:bg-blu4/30 hover:scale-[1.01]',
                submitted && isSelected && isCorrectOpt && 'border-sage bg-sage2 text-sage',
                submitted && isSelected && !isCorrectOpt && 'border-coral bg-coral/10 text-coral',
                submitted && !isSelected && isCorrectOpt && 'border-sage bg-sage2 text-sage',
                submitted && !isSelected && !isCorrectOpt && 'border-brd bg-ivory opacity-50',
              )}
            >
              <span className="mr-2">
                {submitted && isCorrectOpt ? '✅' : submitted && isSelected && !isCorrectOpt ? '❌' : '◦'}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
