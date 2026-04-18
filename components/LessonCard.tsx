'use client';

import Link from 'next/link';
import type { Lesson } from '@/data/lessons';

interface LessonCardProps {
  lesson: Lesson;
  status: 'completed' | 'active' | 'locked';
  stars?: number;
}

export default function LessonCard({ lesson, status, stars = 0 }: LessonCardProps) {
  const isLocked = status === 'locked';
  const isActive = status === 'active';
  const isDone   = status === 'completed';

  const node = (
    <div className="flex flex-col items-center gap-1.5 group">
      {/* Node circle — UI Kit style with 3D press */}
      <div className={[
        'rounded-full flex items-center justify-center text-2xl transition-all duration-150',
        isDone  ? 'node-completed w-14 h-14 hover:scale-105' : '',
        isActive ? 'node-active w-16 h-16 ring-4 ring-[#1A3B9E]/20 hover:scale-105' : '',
        isLocked ? 'node-locked w-14 h-14' : '',
      ].join(' ')}>
        {isLocked ? '🔒' : lesson.emoji}
      </div>

      {/* Label */}
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
        isLocked ? 'text-txt3 opacity-60' : 'text-txt2'
      }`} style={{ background: 'rgba(250,247,242,.9)' }}>
        {lesson.number}
      </span>

      {/* Stars for completed */}
      {isDone && (
        <div className="text-[10px] leading-none">
          {[1,2,3].map(i => (
            <span key={i} style={{ color: i <= stars ? '#C49A2E' : '#E2D9CE' }}>★</span>
          ))}
        </div>
      )}
    </div>
  );

  if (isLocked) return <div className="cursor-not-allowed">{node}</div>;

  return (
    <Link href={`/learn/${lesson.id}`} className="block no-underline">
      {node}
    </Link>
  );
}
