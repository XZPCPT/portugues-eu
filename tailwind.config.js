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
        blu:    '#0b3d82',
        blu2:   '#1a6ec4',
        blu3:   '#85bcee',
        blu4:   '#dff0ff',
        cream:  '#faf4ea',
        ivory:  '#fffdf5',
        gold:   '#c98f00',
        gold2:  '#fff3c8',
        terra:  '#c85830',
        terra2: '#fff1ea',
        coral:  '#e53e2f',
        sage:   '#3d7a58',
        sage2:  '#e2f5ea',
        txt:    '#0a1e3c',
        txt2:   '#253448',
        txt3:   '#6d7d8e',
        brd:    '#dbd3c4',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'serif'],
        sans:  ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '16px',
      },
      boxShadow: {
        card: '0 8px 36px rgba(10,30,70,.11)',
        hero: '0 12px 48px rgba(11,61,130,.28)',
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
          '0%, 100%': { boxShadow: '0 0 0 3px rgba(11,61,130,.15)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(11,61,130,.06)' },
        },
      },
    },
  },
  plugins: [],
};
