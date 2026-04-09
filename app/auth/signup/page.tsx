'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

type Gender = 'M' | 'F' | '';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gender) {
      setError('Please select how you\'d like to be addressed in Portuguese.');
      return;
    }
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, gender },
        emailRedirectTo: `${window.location.origin}/home`,
      },
    });

    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  };

  const genderLabel = gender === 'F' ? 'Bem-vinda!' : gender === 'M' ? 'Bem-vindo!' : '';

  if (success) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center animate-pop-in">
          <div className="text-6xl mb-4">📬</div>
          <h2 className="font-serif text-2xl text-txt mb-2">Check your email!</h2>
          <p className="text-txt3 mb-6 leading-relaxed">
            We sent a confirmation link to <strong>{email}</strong>.
            Click it to activate your account.
          </p>
          <Link href="/home" className="btn-primary inline-block">
            Continue as guest →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3 animate-float inline-block">🇵🇹</div>
          <h1 className="font-serif text-3xl text-txt">Português EU</h1>
          <p className="text-txt3 text-sm mt-1">Create your free account</p>
        </div>

        <form onSubmit={handleSignup} className="card p-6 space-y-5">

          {error && (
            <div className="bg-coral/10 border border-coral rounded-xl px-4 py-3 text-sm text-coral">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="text-xs font-bold text-txt3 uppercase tracking-widest block mb-1.5">
              Your name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Chi"
              className="w-full rounded-xl border-2 border-brd bg-ivory px-4 py-3 text-txt outline-none focus:border-blu transition-colors"
            />
          </div>

          {/* Gender — affects Portuguese grammar throughout the app */}
          <div>
            <label className="text-xs font-bold text-txt3 uppercase tracking-widest block mb-1.5">
              How should Portuguese address you?
            </label>
            <p className="text-xs text-txt3 mb-3 leading-relaxed">
              Portuguese uses gender in words like <em>Bem-vindo/a</em> and <em>obrigado/a</em>.
              This personalises your whole experience.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('F')}
                className={`rounded-xl border-2 px-4 py-3.5 text-left transition-all ${
                  gender === 'F'
                    ? 'border-blu bg-blu4 text-blu'
                    : 'border-brd bg-ivory text-txt hover:border-blu/40'
                }`}
              >
                <div className="text-xl mb-1">👩</div>
                <div className="font-semibold text-sm">Feminino</div>
                <div className="text-xs text-txt3 mt-0.5">Bem-vinda · obrigada</div>
              </button>
              <button
                type="button"
                onClick={() => setGender('M')}
                className={`rounded-xl border-2 px-4 py-3.5 text-left transition-all ${
                  gender === 'M'
                    ? 'border-blu bg-blu4 text-blu'
                    : 'border-brd bg-ivory text-txt hover:border-blu/40'
                }`}
              >
                <div className="text-xl mb-1">👨</div>
                <div className="font-semibold text-sm">Masculino</div>
                <div className="text-xs text-txt3 mt-0.5">Bem-vindo · obrigado</div>
              </button>
            </div>
            {genderLabel && (
              <p className="text-center text-sm text-sage font-semibold mt-2 animate-slide-up">
                {genderLabel} ✨
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold text-txt3 uppercase tracking-widest block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border-2 border-brd bg-ivory px-4 py-3 text-txt outline-none focus:border-blu transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-bold text-txt3 uppercase tracking-widest block mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="at least 6 characters"
              className="w-full rounded-xl border-2 border-brd bg-ivory px-4 py-3 text-txt outline-none focus:border-blu transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3.5 disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Create Account →'}
          </button>

          <p className="text-center text-sm text-txt3">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blu font-semibold hover:underline">Sign in</Link>
          </p>
        </form>

        <p className="text-center mt-4">
          <Link href="/home" className="text-xs text-txt3 hover:text-txt">
            ← Continue without account
          </Link>
        </p>
      </div>
    </div>
  );
}
