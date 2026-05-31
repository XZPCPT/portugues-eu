'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FillBlankProps {
  instruction: string;
  sentence: string;   // contains ___ for the blank
  correct: string;
  options: string[];
  translation?: string;
  onResult: (correct: boolean) => void;
}

export default function FillBlank({
  instruction, sentence, correct, options, translation, onResult,
}: FillBlankProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isMatch = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

  const handleSelect = (opt: string) => {
    if (submitted) return;
    setSelected(opt);
    setSubmitted(true);
    setTimeout(() => onResult(isMatch(opt, correct)), 820);
  };

  const parts = sentence.split('___');
  const filled = selected || '';
  const resultOk = submitted && isMatch(filled, correct);

  return (
    <div className="animate-slide-up flex flex-col gap-5">

      {/* Prompt */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
          Fill in the blank
        </p>
        <p className="text-sm font-medium" style={{ color: 'var(--navy)' }}>{instruction}</p>
        {translation && (
          <p className="text-xs italic" style={{ color: 'var(--muted)' }}>{translation}</p>
        )}
      </div>

      {/* Sentence display */}
      <div className="px-5 py-4 rounded-2xl text-center"
        style={{ background: 'var(--cream-2)', border: '1px solid var(--border)' }}>
        <p className="font-serif text-2xl leading-relaxed" style={{ color: 'var(--navy)' }}>
          {parts[0]}
          <span
            className="inline-block min-w-[72px] mx-1 px-2 text-center border-b-2 transition-all duration-200"
            style={{
              borderColor: !submitted
                ? 'var(--cobalt)'
                : resultOk
                  ? '#2E7D5A'
                  : 'var(--terra)',
              color: !submitted
                ? 'var(--cobalt)'
                : resultOk
                  ? '#2E7D5A'
                  : 'var(--terra)',
              opacity: submitted ? 1 : selected ? 1 : 0.4,
              fontStyle: 'italic',
            }}
          >
            {selected || '___'}
          </span>
          {parts[1]}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-2.5">
        {options.map(opt => {
          const isSelected   = selected === opt;
          const isCorrectOpt = isMatch(opt, correct);
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={submitted}
              className={cn(
                'option-chip text-center font-serif text-lg',
                submitted && isSelected && isCorrectOpt  && 'correct',
                submitted && isSelected && !isCorrectOpt && 'wrong animate-shake',
                submitted && !isSelected && isCorrectOpt  && 'correct',
                submitted && !isSelected && !isCorrectOpt && 'dimmed',
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
