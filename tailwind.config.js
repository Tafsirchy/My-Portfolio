/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FAF9F6',
          muted: '#F4F2EC',
          dark: '#0F1117',
        },
        surface: {
          DEFAULT: '#F1EFEA',
          hover: '#E8E5DD',
          border: 'rgba(24, 26, 32, 0.07)',
          dark: '#181B24',
          'dark-hover': '#222632',
        },
        obsidian: {
          DEFAULT: '#181A20',
          pure: '#101216',
        },
        graphite: {
          DEFAULT: '#5A606E',
          muted: '#8A909E',
        },
        indigo: {
          accent: '#4F46E5',
          hover: '#4338CA',
          subtle: 'rgba(79, 70, 229, 0.08)',
        },
        terracotta: {
          DEFAULT: '#E06D53',
          hover: '#C8563D',
          subtle: 'rgba(224, 109, 83, 0.10)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
