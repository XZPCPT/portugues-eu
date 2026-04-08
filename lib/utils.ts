import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** XP awarded per completed exercise */
export const XP_PER_EXERCISE = 10;
export const XP_BONUS_FLAWLESS = 20;
export const MAX_HEARTS = 5;

/** Format a number with locale separators */
export function fmt(n: number) {
  return n.toLocaleString();
}

/** Stars earned based on mistakes */
export function starsFromMistakes(mistakes: number): number {
  if (mistakes === 0) return 3;
  if (mistakes <= 2) return 2;
  return 1;
}

/** Speak a word using the browser's speech synthesis (EU Portuguese fallback) */
export function speak(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'pt-PT';
  utter.rate = 0.85;
  const voices = window.speechSynthesis.getVoices();
  const ptVoice = voices.find(v => v.lang.startsWith('pt-PT') || v.lang.startsWith('pt-pt'));
  if (ptVoice) utter.voice = ptVoice;
  window.speechSynthesis.speak(utter);
}
