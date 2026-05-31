'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Pair { pt: string; en: string }

interface TapPairsProps {
  instruction: string;
  pairs: Pair[];
  onResult: (correct: boolean) => void;
}

type Selection = { side: 'pt' | 'en'; value: string } | null;

export default function TapPairs({ instruction, pairs, onResult }: TapPairsProps) {
  const [selection, setSelection] = useState<Selection>(null);
  const [matched, setMatched]     = useState<Set<string>>(new Set());
  const [shaking, setShaking]     = useState<string[]>([]);
  const [mistakes, setMistakes]   = useState(0);

  // Shuffle EN column once
  const [shuffledEn] = useState(() => [...pairs].sort(() => Math.random() - 0.5));

  useEffect(() => {
    if (matched.size === pairs.length * 2) {
      setTimeout(() => onResult(mistakes === 0), 400);
    }
  }, [matched, pairs.length, mistakes, onResult]);

  const handleTap = (side: 'pt' | 'en', value: string) => {
    if (matched.has(value)) return;

    // Same side — switch selection
    if (selection?.side === side) {
      setSelection({ side, value });
      return;
    }

    // Nothing selected yet
    if (!selection) {
      setSelection({ side, value });
      return;
    }

    // Cross-side — attempt match
    const ptVal = side === 'pt' ? value : selection.value;
    const enVal = side === 'en' ? value : selection.value;
    const pair  = pairs.find(p => p.pt === ptVal && p.en === enVal);

    if (pair) {
      setMatched(prev => new Set([...prev, pair.pt, pair.en]));
    } else {
      setMistakes(m => m + 1);
      setShaking([ptVal, enVal]);
      setTimeout(() => setShaking([]), 400);
    }
    setSelection(null);
  };

  const isSelected = (side: 'pt' | 'en', v: string) =>
    selection?.side === side && selection.value === v;

  const chipClass = (side: 'pt' | 'en', value: string, isSansFont?: boolean) =>
    cn(
      'w-full px-4 py-3 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer',
      isSansFont ? 'text-sm font-medium' : 'font-serif text-lg',
      matched.has(value) && 'opacity-50 cursor-default',
      shaking.includes(value) && 'animate-shake',
      matched.has(value)
        ? 'border-[rgba(58,125,92,.38)] bg-[rgba(58,125,92,.09)] text-[#2E7D5A]'
        : isSelected(side, value)
          ? 'border-[rgba(26,59,158,.4)] bg-[rgba(26,59,158,.08)] text-[#1A3B9E] scale-105'
          : 'border-[var(--border)] bg-[var(--ivory)] hover:border-[var(--border-2)] hover:bg-[var(--cream-2)]',
    );

  return (
    <div className="animate-slide-up flex flex-col gap-5">

      {/* Prompt */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>
          Tap to match
        </p>
        <p className="text-sm font-medium" style={{ color: 'var(--navy)' }}>{instruction}</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* PT column */}
        <div className="flex flex-col gap-3">
          {pairs.map(p => (
            <button
              key={p.pt}
              onClick={() => handleTap('pt', p.pt)}
              disabled={matched.has(p.pt)}
              className={chipClass('pt', p.pt)}
            >
              {p.pt}
            </button>
          ))}
        </div>

        {/* EN column (shuffled) */}
        <div className="flex flex-col gap-3">
          {shuffledEn.map(p => (
            <button
              key={p.en}
              onClick={() => handleTap('en', p.en)}
              disabled={matched.has(p.en)}
              className={chipClass('en', p.en, true)}
            >
              {p.en}
            </button>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      {matched.size > 0 && (
        <p className="text-center text-xs font-medium" style={{ color: 'var(--muted)' }}>
          {matched.size / 2} of {pairs.length} matched
        </p>
      )}
    </div>
  );
}
