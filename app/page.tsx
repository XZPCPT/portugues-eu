'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase';

const features = [
  {
    icon: '◎',
    title: 'Spaced Repetition',
    desc: 'Words resurface exactly when you\'re about to forget them — powered by the SM-2 algorithm.',
  },
  {
    icon: '◈',
    title: 'European Portuguese Only',
    desc: 'Lisbon accent, European spelling, Portugal-specific phrases. Not Brazilian. The real thing.',
  },
  {
    icon: '◇',
    title: 'Culture Built In',
    desc: 'Fado, azulejos, pastel de nata, football. Language without culture is just vocabulary.',
  },
  {
    icon: '◉',
    title: 'Structured Path',
    desc: 'From your first "Olá" to full conversations. Every lesson unlocks the next.',
  },
];

const steps = [
  { n: '01', title: 'Create your account', desc: 'Sign up in 30 seconds. We\'ll personalise greetings and exercises to your grammatical gender.' },
  { n: '02', title: 'Start your first lesson', desc: 'Five new words, ten exercises, instant feedback. Each lesson takes about 5 minutes.' },
  { n: '03', title: 'Review & advance', desc: 'Your personal review queue keeps vocab fresh. Progress at your own pace.' },
];

// Azulejo tile SVG pattern (inline, no external file needed)
const TilePattern = ({ opacity = 0.06, color = '#fff' }: { opacity?: number; color?: string }) => (
  <svg
    aria-hidden="true"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="azulejo" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        {/* Outer border */}
        <rect x="1" y="1" width="38" height="38" fill="none" stroke={color} strokeWidth=".6" strokeOpacity={opacity * 1.5}/>
        {/* Cross dividers */}
        <line x1="20" y1="1" x2="20" y2="39" stroke={color} strokeWidth=".4" strokeOpacity={opacity}/>
        <line x1="1" y1="20" x2="39" y2="20" stroke={color} strokeWidth=".4" strokeOpacity={opacity}/>
        {/* Quadrant motifs */}
        <circle cx="10" cy="10" r="4" fill="none" stroke={color} strokeWidth=".5" strokeOpacity={opacity}/>
        <circle cx="30" cy="10" r="4" fill="none" stroke={color} strokeWidth=".5" strokeOpacity={opacity}/>
        <circle cx="10" cy="30" r="4" fill="none" stroke={color} strokeWidth=".5" strokeOpacity={opacity}/>
        <circle cx="30" cy="30" r="4" fill="none" stroke={color} strokeWidth=".5" strokeOpacity={opacity}/>
        {/* Centre diamond */}
        <polygon points="20,16 24,20 20,24 16,20" fill="none" stroke={color} strokeWidth=".5" strokeOpacity={opacity}/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#azulejo)"/>
  </svg>
);

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.replace('/home');
    });
  }, []);

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>

      {/* ── Top nav ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(250,247,242,.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid #E2D9CE',
      }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image src="/brand/wordmark-light.png" alt="Português EU" width={140} height={40} style={{ height: '28px', width: 'auto', objectFit: 'contain' }} priority />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link href="/auth/login" style={{ color: '#8896A8', fontSize: '14px', fontWeight: 500, textDecoration: 'none', padding: '8px 14px' }}>
              Sign in
            </Link>
            <Link href="/auth/signup" style={{
              background: '#1A3B9E', color: '#fff', fontSize: '13px', fontWeight: 600,
              textDecoration: 'none', padding: '8px 18px', borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(26,59,158,.3)',
            }}>
              Get started →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#0F1C3F', padding: '96px 24px 88px' }}>
        <TilePattern opacity={0.07} color="#fff" />

        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '500px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(26,59,158,.55) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          {/* Logo icon above heading */}
          <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' }}>
            <Image
              src="/brand/icon.png"
              alt=""
              width={72}
              height={72}
              style={{ width: '72px', height: '72px', objectFit: 'contain', opacity: .92 }}
            />
          </div>

          <div style={{ marginBottom: '20px', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', borderRadius: '999px', padding: '5px 14px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3A7D5C', display: 'inline-block' }}/>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,.55)', fontWeight: 500, letterSpacing: '.06em' }}>A1 · European Portuguese · Free to start</span>
          </div>

          <h1 style={{
            fontFamily: '"Fraunces", Georgia, serif',
            fontSize: 'clamp(40px, 7vw, 72px)',
            color: '#fff', lineHeight: 1.05,
            margin: '0 0 22px', fontWeight: 400, letterSpacing: '-.5px',
          }}>
            Learn Portuguese<br />
            <em style={{ fontStyle: 'italic', color: '#6B84D8' }}>the European way.</em>
          </h1>

          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.55)', maxWidth: '460px', margin: '0 auto 36px', lineHeight: 1.7, fontWeight: 400 }}>
            Bite-sized lessons, spaced repetition, and real Portugal culture —
            built for people who want to actually speak Portuguese in Lisbon.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <Link href="/auth/signup" style={{
              background: '#fff', color: '#0F1C3F', fontWeight: 700, fontSize: '15px',
              textDecoration: 'none', padding: '13px 28px',
              borderRadius: '10px', boxShadow: '0 2px 20px rgba(0,0,0,.3)',
              display: 'inline-block',
            }}>
              Start for free →
            </Link>
            <Link href="/home" style={{
              background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.8)', fontWeight: 500, fontSize: '14px',
              textDecoration: 'none', padding: '13px 24px',
              borderRadius: '10px', border: '1px solid rgba(255,255,255,.12)',
              display: 'inline-block',
            }}>
              Explore as guest
            </Link>
          </div>
        </div>
      </section>

      {/* ── Tile strip divider ── */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #1A3B9E, #BF4F2A, #C49A2E, #3A7D5C, #1A3B9E)', backgroundSize: '300% 100%' }} />

      {/* ── Features ── */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '88px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.2em', color: '#BF4F2A', textTransform: 'uppercase', marginBottom: '12px' }}>
            Why Português EU
          </p>
          <h2 style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: 'clamp(28px, 4vw, 42px)', color: '#0F1C3F', margin: 0, fontWeight: 400 }}>
            Not another generic language app
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {features.map((f, i) => (
            <div key={f.title} style={{
              background: '#fff',
              border: '1px solid #E2D9CE',
              borderRadius: '16px',
              padding: '32px 26px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform .2s, box-shadow .2s',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(15,28,63,.1)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Top accent bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: ['#1A3B9E','#BF4F2A','#C49A2E','#3A7D5C'][i] }} />
              <div style={{ fontSize: '22px', color: ['#1A3B9E','#BF4F2A','#C49A2E','#3A7D5C'][i], marginBottom: '16px', fontWeight: 300 }}>{f.icon}</div>
              <div style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: '19px', color: '#0F1C3F', marginBottom: '8px', fontWeight: 400 }}>{f.title}</div>
              <div style={{ fontSize: '13px', color: '#8896A8', lineHeight: 1.65 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ position: 'relative', background: '#0F1C3F', padding: '88px 24px', overflow: 'hidden' }}>
        <TilePattern opacity={0.06} color="#fff" />

        <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.2em', color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', marginBottom: '12px' }}>
              How it works
            </p>
            <h2 style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: 'clamp(28px, 4vw, 42px)', color: '#fff', margin: 0, fontWeight: 400 }}>
              Three steps to fluency
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {steps.map((s) => (
              <div key={s.n} style={{
                display: 'flex', gap: '20px', alignItems: 'flex-start',
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.07)',
                borderRadius: '14px', padding: '24px',
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0,
                  background: 'rgba(107,132,216,.15)', border: '1px solid rgba(107,132,216,.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: '"Fraunces", Georgia, serif', fontSize: '17px', color: '#6B84D8',
                }}>
                  {s.n}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '15px', color: '#fff', marginBottom: '4px' }}>{s.title}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.5)', lineHeight: 1.65 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tile strip divider ── */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #3A7D5C, #1A3B9E, #BF4F2A, #C49A2E, #3A7D5C)', backgroundSize: '300% 100%' }} />

      {/* ── Levels ── */}
      <section style={{ maxWidth: '680px', margin: '0 auto', padding: '88px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.2em', color: '#C49A2E', textTransform: 'uppercase', marginBottom: '12px' }}>
          Coming soon
        </p>
        <h2 style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: 'clamp(26px, 4vw, 38px)', color: '#0F1C3F', margin: '0 0 12px', fontWeight: 400 }}>
          Choose your starting level
        </h2>
        <p style={{ fontSize: '14px', color: '#8896A8', lineHeight: 1.7, margin: '0 0 36px' }}>
          From your first "Olá" to advanced conversation — jump in at the right point.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {['A1 Beginner', 'A2 Basic', 'B1 Intermediate', 'B2 Advanced', 'C1 Fluent'].map((level, i) => (
            <div key={level} style={{
              padding: '7px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 500,
              ...(i === 0
                ? { background: '#1A3B9E', color: '#fff', border: '1px solid #1A3B9E' }
                : { background: '#fff', color: '#8896A8', border: '1px solid #E2D9CE', opacity: .65 }),
            }}>
              {level}
              {i === 0 && ' ←'}
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ padding: '0 24px 96px', textAlign: 'center' }}>
        <div style={{
          maxWidth: '540px', margin: '0 auto',
          position: 'relative', overflow: 'hidden',
          background: '#0F1C3F',
          borderRadius: '20px', padding: '56px 40px',
          boxShadow: '0 20px 60px rgba(15,28,63,.2)',
        }}>
          <TilePattern opacity={0.08} color="#fff" />
          <div style={{ position: 'relative' }}>
            <Image src="/brand/icon.png" alt="" width={56} height={56} style={{ width: '56px', height: '56px', objectFit: 'contain', marginBottom: '20px', opacity: .9 }} />
            <h2 style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: '32px', color: '#fff', margin: '0 0 10px', fontWeight: 400 }}>
              Começar é fácil.
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.45)', margin: '0 0 28px', lineHeight: 1.65 }}>
              Starting is easy. Your first lesson is waiting — no credit card, no commitment.
            </p>
            <Link href="/auth/signup" style={{
              background: '#fff', color: '#0F1C3F', fontWeight: 700, fontSize: '15px',
              textDecoration: 'none', padding: '13px 30px',
              borderRadius: '10px', display: 'inline-block',
              boxShadow: '0 4px 20px rgba(0,0,0,.2)',
            }}>
              Create your free account →
            </Link>
            <div style={{ marginTop: '16px' }}>
              <Link href="/auth/login" style={{ fontSize: '13px', color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>
                Already have an account? <span style={{ color: '#6B84D8', fontWeight: 600 }}>Sign in</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid #E2D9CE', padding: '28px 24px', textAlign: 'center' }}>
        <Image src="/brand/wordmark-light.png" alt="Português EU" width={120} height={32} style={{ height: '22px', width: 'auto', objectFit: 'contain', marginBottom: '8px', opacity: .7 }} />
        <p style={{ fontSize: '12px', color: '#8896A8', margin: 0 }}>European Portuguese · Free to start · Built with love</p>
      </footer>
    </div>
  );
}
