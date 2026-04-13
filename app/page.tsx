'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

const features = [
  {
    icon: '🧠',
    title: 'Spaced Repetition',
    desc: 'Words resurface exactly when you\'re about to forget them. Built on the proven SM-2 algorithm — the same science behind top language apps.',
  },
  {
    icon: '🎭',
    title: 'European Portuguese Only',
    desc: 'Not Brazilian. Not generic. Lisbon accent, European spelling, Portugal-specific phrases — the real thing from the start.',
  },
  {
    icon: '🏰',
    title: 'Culture Built In',
    desc: 'Fado, pastel de nata, football, azulejos. Language without culture is just vocabulary. We give you both.',
  },
  {
    icon: '📐',
    title: 'Structured Path',
    desc: 'From your first "Olá" to full conversations. Every lesson unlocks the next. No overwhelm, no guessing where to start.',
  },
];

const steps = [
  { n: '01', title: 'Create your account', desc: 'Sign up in 30 seconds. We\'ll personalise your experience — including the right grammatical gender for you.' },
  { n: '02', title: 'Start your first lesson', desc: 'Five new words, ten exercises, instant feedback. Each lesson takes about 5 minutes.' },
  { n: '03', title: 'Review & advance', desc: 'Your personal review queue keeps vocab fresh. Complete lessons to unlock new ones. Progress at your pace.' },
];

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect logged-in users straight to the dashboard
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.replace('/home');
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#ff0000' }}>

      {/* ── Topnav ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(250,247,242,.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E2D9CE',
        padding: '0 24px',
        height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>🇵🇹</span>
          <span style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: '18px', color: '#0F1C3F', letterSpacing: '.3px' }}>
            Português EU
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/auth/login" style={{ color: '#8896A8', fontSize: '14px', fontWeight: 500, textDecoration: 'none', padding: '8px 14px', borderRadius: '10px', transition: 'color .2s' }}>
            Sign in
          </Link>
          <Link href="/auth/signup" style={{
            background: 'linear-gradient(135deg,#1A3B9E,#2E52C4)',
            color: '#fff', fontSize: '14px', fontWeight: 600,
            textDecoration: 'none', padding: '9px 18px',
            borderRadius: '10px', boxShadow: '0 3px 12px rgba(26,59,158,.25)',
          }}>
            Get started →
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ textAlign: 'center', padding: '80px 24px 72px', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle radial glow */}
        <div style={{
          position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(26,59,158,.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="animate-float" style={{ fontSize: '64px', marginBottom: '24px', display: 'inline-block' }}>
          🇵🇹
        </div>

        <h1 style={{
          fontFamily: '"Fraunces", Georgia, serif',
          fontSize: 'clamp(36px, 6vw, 64px)',
          color: '#0F1C3F', lineHeight: 1.1,
          margin: '0 0 20px', letterSpacing: '-.5px',
        }}>
          Learn Portuguese<br />
          <span style={{ color: '#2E52C4' }}>the European way.</span>
        </h1>

        <p style={{
          fontSize: '18px', color: '#8896A8', maxWidth: '480px',
          margin: '0 auto 36px', lineHeight: 1.65, fontWeight: 400,
        }}>
          Bite-sized lessons, spaced repetition, and real Portugal culture —
          built for people who want to actually speak Portuguese in Lisbon.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <Link href="/auth/signup" style={{
            background: 'linear-gradient(135deg,#1A3B9E,#2E52C4)',
            color: '#fff', fontWeight: 700, fontSize: '16px',
            textDecoration: 'none', padding: '14px 28px',
            borderRadius: '14px', boxShadow: '0 6px 24px rgba(26,59,158,.3)',
            display: 'inline-block',
          }}>
            Start for free →
          </Link>
          <Link href="/home" style={{
            background: '#fff', color: '#0F1C3F', fontWeight: 600, fontSize: '15px',
            textDecoration: 'none', padding: '14px 24px',
            borderRadius: '14px', border: '1.5px solid #E2D9CE',
            display: 'inline-block',
          }}>
            Explore as guest
          </Link>
        </div>

        {/* Trust strip */}
        <div style={{ marginTop: '52px', display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
          {['260M Portuguese speakers worldwide', 'European dialect only', 'Free to start'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#8896A8', fontSize: '13px' }}>
              <span style={{ color: '#3A7D5C', fontSize: '15px' }}>✓</span>
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* ── Decorative tile divider ── */}
      <div style={{
        height: '3px',
        background: 'repeating-linear-gradient(90deg, #1A3B9E 0, #1A3B9E 18px, #BF4F2A 18px, #BF4F2A 20px, #FAF7F2 20px, #FAF7F2 24px)',
        margin: '0 24px',
        borderRadius: '2px',
        opacity: .25,
      }} />

      {/* ── Features ── */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', color: '#BF4F2A', textTransform: 'uppercase', marginBottom: '12px' }}>
            Why Português EU
          </div>
          <h2 style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: 'clamp(26px, 4vw, 38px)', color: '#0F1C3F', margin: 0 }}>
            Not another generic language app
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {features.map((f) => (
            <div key={f.title} style={{
              background: '#fff', borderRadius: '18px',
              border: '1.5px solid #E2D9CE',
              padding: '28px 22px',
              boxShadow: '0 4px 20px rgba(15,28,63,.06)',
              transition: 'transform .2s, box-shadow .2s',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 36px rgba(15,28,63,.13)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(15,28,63,.06)';
              }}
            >
              <div style={{ fontSize: '30px', marginBottom: '14px' }}>{f.icon}</div>
              <div style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: '18px', color: '#0F1C3F', marginBottom: '8px' }}>{f.title}</div>
              <div style={{ fontSize: '14px', color: '#8896A8', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{
        background: 'linear-gradient(135deg,#1A3B9E 0%,#1A3B9E 100%)',
        padding: '72px 24px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Tile overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(45deg,rgba(255,255,255,.035) 0,rgba(255,255,255,.035) 1px,transparent 1px,transparent 18px),repeating-linear-gradient(-45deg,rgba(255,255,255,.035) 0,rgba(255,255,255,.035) 1px,transparent 1px,transparent 18px)',
        }} />

        <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', marginBottom: '12px' }}>
              How it works
            </div>
            <h2 style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: 'clamp(26px, 4vw, 38px)', color: '#fff', margin: 0 }}>
              Three steps to fluency
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {steps.map((s, i) => (
              <div key={s.n} style={{ display: 'flex', gap: '22px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                  background: 'rgba(255,255,255,.12)', border: '1.5px solid rgba(255,255,255,.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: '"Fraunces", Georgia, serif', fontSize: '20px', color: '#fff',
                }}>
                  {s.n}
                </div>
                <div style={{ paddingTop: '4px' }}>
                  <div style={{ fontWeight: 600, fontSize: '16px', color: '#fff', marginBottom: '5px' }}>{s.title}</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,.6)', lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Levels teaser ── */}
      <section style={{ maxWidth: '680px', margin: '0 auto', padding: '72px 24px', textAlign: 'center' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', color: '#C49A2E', textTransform: 'uppercase', marginBottom: '12px' }}>
            Coming soon
          </div>
          <h2 style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: 'clamp(24px, 4vw, 34px)', color: '#0F1C3F', margin: '0 0 14px' }}>
            Choose your starting level
          </h2>
          <p style={{ fontSize: '15px', color: '#8896A8', lineHeight: 1.65, margin: 0 }}>
            Whether you're an absolute beginner or already know some basics,
            you'll be able to jump in at the right point — no wasted time.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Fluent'].map((level, i) => (
            <div key={level} style={{
              padding: '8px 18px', borderRadius: '999px', fontSize: '13px', fontWeight: 600,
              border: '1.5px solid',
              ...(i === 0
                ? { background: '#1A3B9E', color: '#fff', borderColor: '#1A3B9E' }
                : { background: '#fff', color: '#8896A8', borderColor: '#E2D9CE', opacity: .65 }),
            }}>
              {level}
              {i === 0 && ' ← you are here'}
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ padding: '0 24px 80px', textAlign: 'center' }}>
        <div style={{
          maxWidth: '560px', margin: '0 auto',
          background: 'linear-gradient(135deg,#fff8f0 0%, #fff3d4 100%)',
          border: '1.5px solid #E2D9CE',
          borderRadius: '24px', padding: '48px 32px',
          boxShadow: '0 8px 40px rgba(15,28,63,.08)',
        }}>
          <div style={{ fontSize: '40px', marginBottom: '18px' }}>🌊</div>
          <h2 style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: '28px', color: '#0F1C3F', margin: '0 0 12px' }}>
            Começar é fácil.
          </h2>
          <p style={{ fontSize: '14px', color: '#8896A8', margin: '0 0 28px', lineHeight: 1.65 }}>
            Starting is easy. Your first lesson is waiting — no credit card, no commitment.
          </p>
          <Link href="/auth/signup" style={{
            background: 'linear-gradient(135deg,#1A3B9E,#2E52C4)',
            color: '#fff', fontWeight: 700, fontSize: '15px',
            textDecoration: 'none', padding: '13px 28px',
            borderRadius: '13px', boxShadow: '0 5px 20px rgba(26,59,158,.28)',
            display: 'inline-block',
          }}>
            Create your free account →
          </Link>
          <div style={{ marginTop: '16px' }}>
            <Link href="/auth/login" style={{ fontSize: '13px', color: '#8896A8', textDecoration: 'none' }}>
              Already have an account? <span style={{ color: '#2E52C4', fontWeight: 600 }}>Sign in</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: '1px solid #E2D9CE',
        padding: '24px',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontSize: '16px' }}>🇵🇹</span>
          <span style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: '15px', color: '#0F1C3F' }}>Português EU</span>
        </div>
        <p style={{ fontSize: '12px', color: '#aaa', margin: 0 }}>European Portuguese · For everyone · Free to start</p>
      </footer>

    </div>
  );
}
