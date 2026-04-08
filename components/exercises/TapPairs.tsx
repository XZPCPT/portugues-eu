'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Pair { pt: string; en: string; }

interface TapPairsProps {
  instruction: string;
  pairs: Pair[];
  onResult: (correct: boolean) => void;
}

type SelectedSide = { side: 'pt' | 'en'; value: string } | null;

export default function TapPairs({ instruction, pairs, onResult }: TapPairsProps) {
  const [selected, setSelected] = useState<SelectedSide>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);

  // Shuffle the EN column for display
  const [shuffledEn] = useState(() => [...pairs].sort(() => Math.random() - 0.5));

  useEffect(() => {
    if (matched.size === pairs.length) {
      setTimeout(() => onResult(mistakes === 0), 500);
    }
  }, [matched, pairs.length, mistakes, onResult]);

  const handleTap = (side: 'pt' | 'en', value: string) => {
    if (matched.has(value)) return;

    if (!selected) {
      setSelected({ side, value });
      return;
    }

    if (selected.side === side) {
      // Same side — switch selection
      setSelected({ side, value });
      return;
    }

    // Different sides — check match
    const ptVal = side === 'pt' ? value : selected.value;
    const enVal = side === 'en' ? value : selected.value;
    const pair = pairs.find(p => p.pt === ptVal && p.en === enVal);

    if (pair) {
      setMatched(prev => new Set([...prev, pair.pt, pair.en]));
    } else {
      setMistakes(m => m + 1);
      setWrong([ptVal, enVal]);
      setTimeout(() => setWrong([]), 600);
    }
    setSelected(null);
  };

  const isSelected = (side: 'pt' | 'en', value: string) =>
    selected?.side === side && selected?.value === value;

  return (
    <div className="animate-slide-up">
      <div className="flex items-start gap-3 mb-6">
        <div className="text-xl">🤝</div>
        <div>
          <div className="text-xs font-bold text-txt3 uppercase tracking-widest mb-1">Tap to match</div>
          <p className="font-medium text-txt2">{instruction}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* PT column */}
        <div className="flex flex-col gap-3">
          {pairs.map(p => (
            <button
              key={p.pt}
              onClick={() => handleTap('pt', p.pt)}
              disabled={matched.has(p.pt)}
              className={cn(
                'rounded-xl border-2 px-3 py-3 font-serif text-lg text-center transition-all duration-200',
                matched.has(p.pt) && 'border-sage bg-sage2 text-sage opacity-60 cursor-default',
                wrong.includes(p.pt) && 'border-coral bg-coral/10 animate-pop-in',
                isSelected('pt', p.pt) && 'border-blu bg-blu4 text-blu scale-105',
                !matched.has(p.pt) && !wrong.includes(p.pt) && !isSelected('pt', p.pt) && 'border-brd bg-ivory hover:border-blu2 hover:bg-blu4/20',
              )}
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
              className={cn(
                'rounded-xl border-2 px-3 py-3 text-sm font-medium text-center transition-all duration-200',
                matched.has(p.en) && 'border-sage bg-sage2 text-sage opacity-60 cursor-default',
                wrong.includes(p.en) && 'border-coral bg-coral/10 animate-pop-in',
                isSelected('en', p.en) && 'border-blu bg-blu4 text-blu scale-105',
                !matched.has(p.en) && !wrong.includes(p.en) && !isSelected('en', p.en) && 'border-brd bg-ivory hover:border-blu2 hover:bg-blu4/20',
              )}
            >
              {p.en}
            </button>
          ))}
        </div>
      </div>

      {matched.size > 0 && (
        <p className="text-center text-xs text-txt3 mt-4">
          {matched.size / 2} / {pairs.length} matched ✨
        </p>
      )}
    </div>
  );
}
