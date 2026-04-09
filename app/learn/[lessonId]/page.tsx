'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ALL_LESSONS } from '@/data/all-lessons';
import { ACHIEVEMENTS } from '@/data/lessons';
import LessonPlayer from '@/components/LessonPlayer';
import { loadProgress, saveProgress, defaultProgress, type ProgressState } from '@/lib/progress';
import { nextReview, wordKey } from '@/lib/srs';

export default function LessonPage({ params }: { params: { lessonId: string } }) {
  const router = useRouter();
  const lessonId = parseInt(params.lessonId);
  const lesson = ALL_LESSONS.find(l => l.id === lessonId);

  const [progressLoaded, setProgressLoaded] = useState(false);

  useEffect(() => {
    // Pre-load progress so it's warm in localStorage for handleComplete
    loadProgress().then(() => setProgressLoaded(true));
  }, []);

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

  const handleComplete = async (stars: number, xpGained: number) => {
    try {
      const state: ProgressState = await loadProgress();

      // Update lesson progress
      const existing = state.lessonProgress[lessonId];
      state.lessonProgress[lessonId] = {
        stars: Math.max(stars, existing?.stars ?? 0),
        completed: true,
      };

      // Add XP
      state.xp += xpGained;

      // Update SRS for all words in this lesson
      lesson.words.forEach((_, idx) => {
        const key = wordKey(lessonId, idx);
        // Mark each word as seen (correct = true for first encounter)
        state.wordReviews[key] = nextReview(state.wordReviews[key], true);
      });

      // Check achievements
      const earned = new Set(state.earnedAchievements);
      const completedCount = Object.values(state.lessonProgress).filter(p => p.completed).length;
      const totalWords = completedCount * 5;

      if (completedCount >= 1) earned.add('first_step');
      if (totalWords >= 20) earned.add('word_collector');
      if (completedCount >= 5) earned.add('halfway');
      if (stars === 3) earned.add('flawless');
      if (completedCount >= ALL_LESSONS.length) earned.add('graduate');
      if (state.xp >= 200) earned.add('speed');
      if (new Date().getHours() >= 21) earned.add('night_owl');

      state.earnedAchievements = Array.from(earned);

      await saveProgress(state);
    } catch (_) {}
  };

  return (
    <div className="min-h-screen bg-cream">
      <LessonPlayer lesson={lesson} onComplete={handleComplete} />
    </div>
  );
}
