/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blu:    '#1A3B9E',
        blu2:   '#2E52C4',
        blu3:   '#6B84D8',
        blu4:   '#EBF0FF',
        cream:  '#FAF7F2',
        ivory:  '#FDFCF9',
        gold:   '#C49A2E',
        gold2:  '#FBF3DC',
        terra:  '#BF4F2A',
        terra2: '#FBE9E3',
        coral:  '#e53e2f',
        sage:   '#3A7D5C',
        sage2:  '#E6F4ED',
        txt:    '#0F1C3F',
        txt2:   '#3D4F6B',
        txt3:   '#8896A8',
        brd:    '#E2D9CE',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans:  ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '16px',
      },
      boxShadow: {
        card: '0 8px 36px rgba(15,28,63,.09)',
        hero: '0 12px 48px rgba(26,59,158,.26)',
      },
      animation: {
        'float': 'floatIcon 3.5s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'slide-up': 'slideUp .4s cubic-bezier(.23,1,.32,1)',
        'pop-in': 'popIn .35s cubic-bezier(.23,1,.32,1)',
        'glow': 'glowPulse 2s infinite',
      },
      keyframes: {
        floatIcon: {
          '0%, 100%': { transform: 'translateY(0) rotate(-3deg)' },
          '50%':      { transform: 'translateY(-10px) rotate(3deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-400% 0' },
          '100%': { backgroundPosition: '400% 0' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        popIn: {
          '0%':   { transform: 'scale(.4)', opacity: '0' },
          '65%':  { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 0 3px rgba(26,59,158,.15)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(26,59,158,.06)' },
        },
      },
    },
  },
  plugins: [],
};
