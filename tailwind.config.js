/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        surface: {
          950: '#09090b',
          900: '#0f0f12',
          800: '#18181c',
          700: '#232329',
          600: '#2e2e36',
          500: '#3f3f4a',
          400: '#71717a',
          300: '#a1a1aa',
          200: '#d4d4d8',
          100: '#f4f4f5',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.5s ease forwards',
        'fade-in':    'fadeIn 0.3s ease forwards',
        'shimmer':    'shimmer 1.8s infinite',
        'float':      'float 6s ease-in-out infinite',
        'marquee':    'marquee 28s linear infinite',
      },
      keyframes: {
        fadeUp:   { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: 0 }, to: { opacity: 1 } },
        shimmer:  { '0%': { backgroundPosition: '-700px 0' }, '100%': { backgroundPosition: '700px 0' } },
        float:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        marquee:  { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #be185d 0%, #ec4899 50%, #f9a8d4 100%)',
        'gradient-dark':  'linear-gradient(135deg, #09090b 0%, #18181c 100%)',
        'gradient-card':  'linear-gradient(180deg, transparent 40%, rgba(9,9,11,0.95) 100%)',
        'shimmer-dark':   'linear-gradient(90deg, #18181c 0%, #232329 50%, #18181c 100%)',
      },
      boxShadow: {
        'brand-sm':   '0 4px 14px rgba(190,24,93,0.3)',
        'brand-md':   '0 8px 30px rgba(190,24,93,0.35)',
        'brand-lg':   '0 16px 50px rgba(190,24,93,0.4)',
        'card':       '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}