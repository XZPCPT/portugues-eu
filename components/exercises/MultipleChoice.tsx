'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface MultipleChoiceProps {
  prompt: string;
  audio?: string;
  options: string[];
  correct: string;
  onResult: (correct: boolean) => void;
}

export default function MultipleChoice({
  prompt, audio, options, correct, onResult,
}: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (opt: string) => {
    if (submitted) return;
    setSelected(opt);
    setSubmitted(true);
    setTimeout(() => onResult(opt === correct), 820);
  };

  return (
    <div className="animate-slide-up flex flex-col gap-5">

      {/* Prompt */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
          What does this mean?
        </p>
        <p className="font-serif text-2xl leading-snug" style={{ color: 'var(--navy)' }}>
          {audio ? (
            <em className="italic" style={{ color: 'var(--cobalt)' }}>{audio}</em>
          ) : prompt}
        </p>
        {audio && (
          <p className="text-sm" style={{ color: 'var(--muted)' }}>{prompt}</p>
        )}
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2.5">
        {options.map(opt => {
          const isSelected   = selected === opt;
          const isCorrectOpt = opt === correct;
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={submitted}
              className={cn(
                'option-chip',
                submitted && isSelected && isCorrectOpt  && 'correct',
                submitted && isSelected && !isCorrectOpt && 'wrong animate-shake',
                submitted && !isSelected && isCorrectOpt  && 'correct',
                submitted && !isSelected && !isCorrectOpt && 'dimmed',
              )}
            >
              <span className="flex items-center gap-3">
                {/* State indicator */}
                <span className="flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-xs"
                  style={{
                    borderColor: submitted && isCorrectOpt
                      ? 'rgba(58,125,92,.5)'
                      : submitted && isSelected && !isCorrectOpt
                        ? 'rgba(191,79,42,.5)'
                        : 'var(--border-2)',
                    background: submitted && isCorrectOpt
                      ? 'rgba(58,125,92,.15)'
                      : submitted && isSelected && !isCorrectOpt
                        ? 'rgba(191,79,42,.12)'
                        : 'transparent',
                  }}
                >
                  {submitted && isCorrectOpt ? (
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#2E7D5A" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                  ) : submitted && isSelected && !isCorrectOpt ? (
                    <svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" style={{ color: 'var(--terra)' }}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                  ) : null}
                </span>
                <span className="font-serif text-base">{opt}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
