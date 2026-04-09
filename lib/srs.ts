// ── SM-2 Spaced Repetition Algorithm ─────────────────────────────────────────

import type { WordReview } from '@/lib/progress';

export function nextReview(prev: WordReview | undefined, correct: boolean): WordReview {
  const ease     = prev?.ease     ?? 2.5;
  const reps     = prev?.reps     ?? 0;
  const interval = prev?.interval ?? 1;
  const quality  = correct ? 4 : 1;

  let newEase = ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEase < 1.3) newEase = 1.3;

  let newInterval: number;
  if (!correct) {
    newInterval = 1;
  } else if (reps === 0) {
    newInterval = 1;
  } else if (reps === 1) {
    newInterval = 6;
  } else {
    newInterval = Math.round(interval * newEase);
  }

  const due = new Date();
  due.setDate(due.getDate() + newInterval);

  return {
    due: due.toISOString().split('T')[0],
    interval: newInterval,
    ease: Math.round(newEase * 100) / 100,
    reps: correct ? reps + 1 : 0,
  };
}

export function isDue(review: WordReview | undefined): boolean {
  if (!review) return true;
  const today = new Date().toISOString().split('T')[0];
  return review.due <= today;
}

export function wordKey(lessonId: number, wordIndex: number): string {
  return `${lessonId}-${wordIndex}`;
}

export function getDueReviews(wordReviews: Record<string, WordReview>, maxItems = 20): string[] {
  const today = new Date().toISOString().split('T')[0];
  return Object.entries(wordReviews)
    .filter(([, r]) => r.due <= today)
    .sort(([, a], [, b]) => a.due.localeCompare(b.due))
    .slice(0, maxItems)
    .map(([key]) => key);
}

export function countDue(wordReviews: Record<string, WordReview>): number {
  return getDueReviews(wordReviews).length;
}
