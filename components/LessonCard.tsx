'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Lesson } from '@/data/lessons';

interface LessonCardProps {
  lesson: Lesson;
  status: 'completed' | 'active' | 'locked';
  stars?: number; // 0–3
}

const starDisplay = (stars: number) => {
  return [1, 2, 3].map(i => (i <= stars ? '⭐' : '☆')).join('');
};

export default function LessonCard({ lesson, status, stars = 0 }: LessonCardProps) {
  const isLocked = status === 'locked';
  const isActive = status === 'active';
  const isDone   = status === 'completed';

  const circleClass = cn(
    'w-16 h-16 rounded-full flex items-center justify-center text-3xl border-[3px] shadow-md transition-all duration-200',
    isDone  && 'bg-gradient-to-br from-sage2 to-[#d0f0de] border-sage',
    isActive && 'bg-gradient-to-br from-blu4 to-[#c8e8ff] border-blu animate-glow',
    isLocked && 'bg-cream border-brd opacity-50 grayscale-[0.8]',
  );

  const content = (
    <div className={cn(
      'flex flex-col items-center gap-2 cursor-pointer group',
      isLocked && 'cursor-not-allowed'
    )}>
      <div className={cn(circleClass, !isLocked && 'group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:shadow-xl')}>
        {lesson.emoji}
        {isLocked && (
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-[9px]">🔒</span>
        )}
      </div>
      <div className="text-xs font-semibold tracking-wide text-txt3">{lesson.number}</div>
      <div className="text-[10px] font-semibold text-txt2 text-center max-w-[72px] leading-tight line-clamp-2">
        {lesson.title}
      </div>
      <div className="text-xs">{starDisplay(stars)}</div>
    </div>
  );

  if (isLocked) return <div className="relative">{content}</div>;

  return (
    <Link href={`/learn/${lesson.id}`} className="relative block no-underline">
      {content}
    </Link>
  );
}
