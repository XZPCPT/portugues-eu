'use client';

interface HeartsProps {
  current: number;
  max?: number;
}

export default function Hearts({ current, max = 5 }: HeartsProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`text-lg transition-all duration-300 ${i < current ? 'text-red-500' : 'text-gray-300'}`}>
          {i < current ? '❤️' : '🤍'}
        </span>
      ))}
    </div>
  );
}
