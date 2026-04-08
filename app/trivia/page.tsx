'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import { TRIVIA_CATEGORIES, type TriviaQuestion } from '@/data/trivia';

type Screen = 'hub' | 'quiz' | 'result';
type Level = 1 | 2 | 3;

const LEVEL_LABELS: Record<Level, string> = { 1: 'Starter', 2: 'Explorer', 3: 'Expert' };
const LEVEL_COLORS: Record<Level, string> = { 1: 'text-sage bg-sage2 border-sage', 2: 'text-blu bg-blu4 border-blu3', 3: 'text-gold bg-gold2 border-gold' };

export default function TriviaPage() {
  const [screen, setScreen] = useState<Screen>('hub');
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level>(1);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFact, setShowFact] = useState(false);

  const startQuiz = (catId: string, level: Level) => {
    const cat = TRIVIA_CATEGORIES.find(c => c.id === catId);
    if (!cat) return;
    const qs = cat.questions.filter(q => q.lvl === level);
    setQuestions(qs);
    setSelectedCat(catId);
    setSelectedLevel(level);
    setQIdx(0);
    setAnswered(null);
    setScore(0);
    setShowFact(false);
    setScreen('quiz');
  };

  const handleAnswer = (idx: number) => {
    if (answered !== null) return;
    setAnswered(idx);
    if (idx === questions[qIdx].correct) setScore(s => s + 1);
    setShowFact(true);
  };

  const nextQuestion = () => {
    if (qIdx + 1 >= questions.length) {
      setScreen('result');
    } else {
      setQIdx(q => q + 1);
      setAnswered(null);
      setShowFact(false);
    }
  };

  const cat = TRIVIA_CATEGORIES.find(c => c.id === selectedCat);
  const currentQ = questions[qIdx];

  /* ── Hub ── */
  if (screen === 'hub') {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-8 pb-20">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/" className="btn-secondary text-sm px-3 py-2">← Home</Link>
            <div>
              <h1 className="font-serif text-2xl text-txt">Culture Trivia</h1>
              <p className="text-xs text-txt3">5 categories · 3 difficulty levels · 60 questions</p>
            </div>
          </div>

          <div className="grid gap-4">
            {TRIVIA_CATEGORIES.map(cat => (
              <div key={cat.id} className="card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{cat.emoji}</span>
                  <div>
                    <h3 className="font-serif text-lg text-txt">{cat.name}</h3>
                    <p className="text-xs text-txt3">{cat.desc}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {([1, 2, 3] as Level[]).map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => startQuiz(cat.id, lvl)}
                      className={cn(
                        'flex-1 rounded-xl border py-2 text-xs font-bold transition-all hover:scale-105 active:scale-95',
                        LEVEL_COLORS[lvl]
                      )}
                    >
                      {LEVEL_LABELS[lvl]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  /* ── Quiz ── */
  if (screen === 'quiz' && currentQ) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main className="max-w-lg mx-auto px-4 py-8">
          {/* Progress */}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setScreen('hub')} className="text-txt3 hover:text-txt text-sm">✕</button>
            <div className="flex-1 bg-brd rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full progress-shimmer transition-all duration-500"
                style={{ width: `${(qIdx / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-txt3">{qIdx + 1}/{questions.length}</span>
          </div>

          {/* Category pill */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">{cat?.emoji}</span>
            <span className={cn('text-xs font-bold border rounded-full px-2 py-0.5', LEVEL_COLORS[selectedLevel])}>
              {LEVEL_LABELS[selectedLevel]}
            </span>
          </div>

          {/* Question card */}
          <div className="card p-6 mb-4 animate-slide-up">
            <div className="text-4xl text-center mb-3">{currentQ.visual}</div>
            <p className="font-serif text-xl text-txt text-center mb-6 leading-snug">{currentQ.q}</p>

            <div className="grid gap-3">
              {currentQ.options.map((opt, i) => {
                const isSelected = answered === i;
                const isCorrect = i === currentQ.correct;
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={cn(
                      'rounded-xl border-2 px-4 py-3 text-left font-medium text-sm transition-all duration-200',
                      answered === null && 'border-brd bg-ivory hover:border-blu2 hover:bg-blu4/30 hover:scale-[1.01]',
                      answered !== null && isCorrect && 'border-sage bg-sage2 text-sage',
                      answered !== null && isSelected && !isCorrect && 'border-coral bg-coral/10 text-coral',
                      answered !== null && !isSelected && !isCorrect && 'border-brd bg-ivory opacity-40',
                    )}
                  >
                    <span className="mr-2">
                      {answered !== null && isCorrect ? '✅' :
                       answered !== null && isSelected && !isCorrect ? '❌' : '◦'}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fun fact */}
          {showFact && (
            <div className="bg-gold2 border border-gold rounded-xl p-4 mb-4 animate-slide-up">
              <div className="text-xs font-bold text-gold uppercase tracking-widest mb-1">💡 Did you know?</div>
              <p className="text-sm text-txt2 leading-relaxed">{currentQ.fact}</p>
            </div>
          )}

          {answered !== null && (
            <button onClick={nextQuestion} className="w-full btn-primary py-3.5">
              {qIdx + 1 >= questions.length ? 'See Results →' : 'Next Question →'}
            </button>
          )}
        </main>
      </div>
    );
  }

  /* ── Result ── */
  if (screen === 'result') {
    const pct = Math.round((score / questions.length) * 100);
    const rating = pct === 100 ? '🏆 Perfect!' : pct >= 75 ? '🌟 Excellent!' : pct >= 50 ? '👍 Good effort!' : '📘 Keep learning!';

    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main className="max-w-lg mx-auto px-4 py-16 text-center animate-pop-in">
          <div className="text-6xl mb-4">{cat?.emoji}</div>
          <h2 className="font-serif text-3xl text-txt mb-1">{rating}</h2>
          <p className="text-txt3 mb-8">{cat?.name} · {LEVEL_LABELS[selectedLevel]}</p>

          <div className="card p-6 mb-8">
            <div className="font-serif text-5xl text-blu mb-2">{score}/{questions.length}</div>
            <div className="text-txt3 text-sm mb-4">correct answers</div>
            <div className="bg-brd rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full progress-shimmer"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button onClick={() => setScreen('hub')} className="btn-secondary">All Topics</button>
            <button onClick={() => startQuiz(selectedCat!, selectedLevel)} className="btn-primary">Try Again →</button>
          </div>
        </main>
      </div>
    );
  }

  return null;
}
