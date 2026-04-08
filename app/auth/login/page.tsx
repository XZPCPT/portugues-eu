'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });

    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🇵🇹</div>
          <h1 className="font-serif text-3xl text-txt">Português EU</h1>
          <p className="text-txt3 text-sm mt-1">Welcome back!</p>
        </div>

        <form onSubmit={handleLogin} className="card p-6 space-y-4">
          <h2 className="font-serif text-xl text-txt text-center">Sign In</h2>

          {error && (
            <div className="bg-coral/10 border border-coral rounded-xl px-4 py-3 text-sm text-coral">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-txt3 uppercase tracking-widest block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border-2 border-brd bg-ivory px-4 py-3 text-txt outline-none focus:border-blu focus:bg-blu4/10 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-txt3 uppercase tracking-widest block mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-xl border-2 border-brd bg-ivory px-4 py-3 text-txt outline-none focus:border-blu focus:bg-blu4/10 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3.5 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>

          <p className="text-center text-sm text-txt3">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-blu font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </form>

        <p className="text-center mt-4">
          <Link href="/" className="text-xs text-txt3 hover:text-txt">
            ← Continue without account
          </Link>
        </p>
      </div>
    </div>
  );
}
