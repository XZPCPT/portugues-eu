'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FillBlankProps {
  instruction: string;
  sentence: string;
  correct: string;
  options: string[];
  translation?: string;
  onResult: (correct: boolean) => void;
}

export default function FillBlank({ instruction, sentence, correct, options, translation, onResult }: FillBlankProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const parts = sentence.split('___');

  const handleSelect = (opt: string) => {
    if (submitted) return;
    setSelected(opt);
    setSubmitted(true);
    const isCorrect = opt.toLowerCase() === correct.toLowerCase();
    setTimeout(() => onResult(isCorrect), 900);
  };

  return (
    <div className="animate-slide-up">
      <div className="flex items-start gap-3 mb-6">
        <div className="text-xl">✏️</div>
        <div>
          <div className="text-xs font-bold text-txt3 uppercase tracking-widest mb-1">Fill in the blank</div>
          <p className="font-medium text-txt2 mb-1">{instruction}</p>
          {translation && <p className="text-xs text-txt3 italic">{translation}</p>}
        </div>
      </div>

      {/* Sentence with blank */}
      <div className="bg-ivory border border-brd rounded-xl px-5 py-4 mb-6 text-center">
        <p className="font-serif text-2xl text-txt leading-relaxed">
          {parts[0]}
          <span className={cn(
            'inline-block min-w-[80px] border-b-2 mx-1 px-2 text-center transition-all duration-200',
            !submitted && 'border-blu text-blu/40',
            submitted && selected?.toLowerCase() === correct.toLowerCase() && 'border-sage text-sage',
            submitted && selected?.toLowerCase() !== correct.toLowerCase() && 'border-coral text-coral',
          )}>
            {selected || '___'}
          </span>
          {parts[1]}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => {
          const isSelected = selected === opt;
          const isCorrectOpt = opt.toLowerCase() === correct.toLowerCase();
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className={cn(
                'rounded-xl border-2 px-4 py-3 font-serif text-lg text-center transition-all duration-200',
                !submitted && 'border-brd bg-ivory hover:border-blu2 hover:bg-blu4/30 hover:scale-[1.01]',
                submitted && isSelected && isCorrectOpt && 'border-sage bg-sage2 text-sage',
                submitted && isSelected && !isCorrectOpt && 'border-coral bg-coral/10 text-coral',
                submitted && !isSelected && isCorrectOpt && 'border-sage bg-sage2 text-sage',
                submitted && !isSelected && !isCorrectOpt && 'border-brd bg-ivory opacity-50',
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
