'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  xp?: number;
  hearts?: number;
  streak?: number;
  reviewCount?: number;
}

export default function Navbar({ xp = 0, hearts = 5, streak = 0, reviewCount = 0 }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50" style={{
      background: '#0F1C3F',
      borderBottom: '1px solid rgba(255,255,255,.07)',
      boxShadow: '0 4px 32px rgba(0,0,0,.3)',
    }}>
      <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between gap-4">

        {/* Logo wordmark */}
        <Link href="/home" className="flex items-center no-underline shrink-0 group">
          <Image
            src="/brand/wordmark-dark.png"
            alt="Português EU"
            width={160}
            height={44}
            style={{ height: '32px', width: 'auto', objectFit: 'contain', opacity: 1, transition: 'opacity .2s' }}
            priority
          />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2">

          {reviewCount > 0 && (
            <Link href="/review" className="no-underline flex items-center gap-1.5 text-sm font-medium transition-all" style={{
              background: 'rgba(191,79,42,.85)',
              border: '1px solid rgba(255,255,255,.1)',
              borderRadius: '8px', padding: '5px 13px', color: '#fff',
            }}>
              <span style={{ fontSize: '13px' }}>↺</span>
              <span>{reviewCount} due</span>
            </Link>
          )}

          {streak > 0 && (
            <div className="flex items-center gap-1.5 text-sm font-medium" style={{
              background: 'rgba(255,255,255,.06)',
              border: '1px solid rgba(255,255,255,.09)',
              borderRadius: '8px', padding: '5px 13px', color: 'rgba(255,255,255,.75)',
            }}>
              <span>🔥</span><span>{streak}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-sm font-medium" style={{
            background: 'rgba(255,255,255,.06)',
            border: '1px solid rgba(255,255,255,.09)',
            borderRadius: '8px', padding: '5px 13px', color: 'rgba(255,255,255,.75)',
          }}>
            <span style={{ color: '#e57373', fontSize: '12px' }}>♥</span><span>{hearts}</span>
          </div>

          <div className="flex items-center gap-1.5 text-sm font-medium" style={{
            background: 'rgba(196,154,46,.1)',
            border: '1px solid rgba(196,154,46,.25)',
            borderRadius: '8px', padding: '5px 13px', color: '#C49A2E',
          }}>
            <span>⚡</span><span>{xp} XP</span>
          </div>

          <Link href="/profile" className="no-underline flex items-center justify-center text-base transition-all" style={{
            width: '34px', height: '34px', borderRadius: '8px',
            background: pathname === '/profile' ? 'rgba(255,255,255,.15)' : 'rgba(255,255,255,.06)',
            border: '1px solid rgba(255,255,255,.1)',
            color: 'rgba(255,255,255,.65)',
          }} title="Profile">
            ◉
          </Link>
        </div>
      </div>
    </header>
  );
}
