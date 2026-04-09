'use client';

import Link from 'next/link';
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
    <header
      className="sticky top-0 z-50 tile-pattern relative overflow-hidden"
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
      <Link href="/home" className="flex items-center gap-2.5 no-underline group">
        <span className="text-2xl group-hover:animate-float">🇵🇹</span>
        <div>
          <div className="font-serif text-white text-lg leading-tight">Português EU</div>
          <div className="text-xs text-white/50 tracking-widest uppercase">A1 · European Portuguese</div>
        </div>
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* SRS review badge */}
        {reviewCount > 0 && (
          <Link href="/review" className="flex items-center gap-1.5 bg-terra/80 hover:bg-terra border border-white/20 rounded-full px-3 py-1.5 text-white text-sm font-semibold no-underline transition-colors">
            <span>🔁</span>
            <span>{reviewCount}</span>
          </Link>
        )}

        {/* Streak */}
        {streak > 0 && (
          <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-white text-sm font-semibold">
            <span>🔥</span>
            <span>{streak}</span>
          </div>
        )}

        {/* Hearts */}
        <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-white text-sm font-semibold">
          <span>❤️</span>
          <span>{hearts}</span>
        </div>

        {/* XP */}
        <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-white text-sm font-semibold">
          <span>⚡</span>
          <span>{xp} XP</span>
        </div>

        {/* Profile */}
        <Link
          href="/profile"
          className={`flex items-center justify-center w-8 h-8 rounded-full border-2 no-underline transition-colors ${
            pathname === '/profile'
              ? 'bg-white/30 border-white'
              : 'bg-white/10 border-white/30 hover:bg-white/20'
          }`}
          title="Profile"
        >
          <span className="text-base">👤</span>
        </Link>
      </div>
    </header>
  );
}
