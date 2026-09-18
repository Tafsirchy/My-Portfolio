/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Space Mono', 'monospace'],
      },
      colors: {
        canvas: '#fafafa',
        surface: '#ffffff',
        subtle: '#f4f4f5',
        'border-subtle': '#e4e4e7',
        'ink-primary': '#09090b',
        'ink-secondary': '#71717a',
        'ink-muted': '#a1a1aa',
        accent: {
          DEFAULT: '#09090b',
          blue: '#2563eb',
          emerald: '#10b981',
        },
        neon: {
          navy: '#1e3a8a',
          olive: '#4d7c0f',
        }
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'elevated': '0 4px 20px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                         linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)`,
        'dot-pattern': `radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '32px 32px',
        'dot': '20px 20px',
      }
    },
  },
  plugins: [],
}
