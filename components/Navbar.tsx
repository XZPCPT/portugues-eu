'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavbarProps {
  xp?: number;
  hearts?: number;
  streak?: number;
}

export default function Navbar({ xp = 0, hearts = 5, streak = 0 }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 tile-pattern grad-bar relative overflow-hidden"
      style={{
        background: 'linear-gradient(105deg,#0b3d82 0%,#1055a8 50%,#0e4a94 100%)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        boxShadow: '0 3px 20px rgba(10,30,80,.35)',
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 no-underline group">
        <span className="text-2xl group-hover:animate-float">🇵🇹</span>
        <div>
          <div className="font-serif text-white text-lg leading-tight">Português EU</div>
          <div className="text-xs text-white/50 tracking-widest uppercase">A1 · European Portuguese</div>
        </div>
      </Link>

      {/* Stats pills */}
      <div className="flex items-center gap-2">
        {streak > 0 && (
          <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-white text-sm font-semibold">
            <span>🔥</span>
            <span>{streak}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-white text-sm font-semibold">
          <span>❤️</span>
          <span>{hearts}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-white text-sm font-semibold">
          <span>⚡</span>
          <span>{xp} XP</span>
        </div>
      </div>
    </header>
  );
}
