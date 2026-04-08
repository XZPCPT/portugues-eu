'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LESSONS } from '@/data/lessons';
import LessonPlayer from '@/components/LessonPlayer';

const STORAGE_KEY = 'pt_eu_v1';

interface ProgressState {
  xp: number;
  hearts: number;
  streak: number;
  lessonProgress: Record<number, { stars: number; completed: boolean }>;
  earnedAchievements: string[];
}

const defaultState: ProgressState = {
  xp: 0,
  hearts: 5,
  streak: 0,
  lessonProgress: {},
  earnedAchievements: [],
};

export default function LessonPage({ params }: { params: { lessonId: string } }) {
  const router = useRouter();
  const lessonId = parseInt(params.lessonId);
  const lesson = LESSONS.find(l => l.id === lessonId);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🤔</div>
          <p className="font-serif text-xl text-txt mb-4">Lesson not found</p>
          <button onClick={() => router.push('/learn')} className="btn-primary">Back to Lessons</button>
        </div>
      </div>
    );
  }

  const handleComplete = (stars: number, xpGained: number) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const state: ProgressState = saved ? JSON.parse(saved) : { ...defaultState };

      // Update lesson progress
      const existing = state.lessonProgress[lessonId];
      state.lessonProgress[lessonId] = {
        stars: Math.max(stars, existing?.stars ?? 0),
        completed: true,
      };

      // Add XP
      state.xp += xpGained;

      // Check achievements
      const earned = new Set(state.earnedAchievements);
      const completedCount = Object.values(state.lessonProgress).filter(p => p.completed).length;
      const totalWords = completedCount * 5;

      if (completedCount >= 1) earned.add('first_step');
      if (totalWords >= 20) earned.add('word_collector');
      if (completedCount >= 5) earned.add('halfway');
      if (stars === 3) earned.add('flawless');
      if (completedCount >= LESSONS.length) earned.add('graduate');
      if (state.xp >= 200) earned.add('speed');
      if (new Date().getHours() >= 21) earned.add('night_owl');

      state.earnedAchievements = [...earned];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {}
  };

  return (
    <div className="min-h-screen bg-cream">
      <LessonPlayer lesson={lesson} onComplete={handleComplete} />
    </div>
  );
}
