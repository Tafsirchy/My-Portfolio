/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        background: '#fafafa',
        surface: '#ffffff',
        neon: {
          navy: '#1e3a8a', // Navy
          olive: '#4d7c0f', // Olive
        }
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
                         linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`,
        'grid-pattern-light': `linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px),
                         linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '40px 40px',
        'grid-sm': '20px 20px',
      }
    },
  },
  plugins: [],
}
