/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'var(--color-bg, #B9C4CC)',
          accent: 'var(--color-accent, #D05A3F)',
          surface: 'var(--color-surface, #F4F6F8)',
          text: 'var(--color-text, #18222C)',
          muted: 'var(--color-muted, #4A5B69)',
          border: 'var(--color-border, rgba(24, 34, 44, 0.12))',
          tide: 'var(--color-tide, #46B7FF)',
          foam: 'var(--color-foam, #8BF3E6)'
        }
      },
      fontFamily: {
        heading: 'var(--font-heading, "Playfair Display", serif)',
        body: 'var(--font-body, "Plus Jakarta Sans", sans-serif)',
        mono: ['"Space Mono"', 'monospace'],
        serif: ['"Playfair Display"', 'Fraunces', 'Cinzel', 'Merriweather', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'marquee': 'marquee 25s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        'glow-pulse': 'glow 4s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glow: {
          '0%': { opacity: '0.3', filter: 'blur(20px)' },
          '100%': { opacity: '0.7', filter: 'blur(35px)' },
        }
      }
    },
  },
  plugins: [],
}
