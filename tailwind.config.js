/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        sanskrit: ['Tiro Devanagari Sanskrit', 'serif'],
      },
      colors: {
        brand: {
          coral: '#ff6b6b',
          teal: '#4ecdc4',
          sky: '#45b7d1',
          dark: '#1a1a2e',
          darker: '#16213e',
          navy: '#0f3460',
        },
        earth: {
          paper: '#F5F5F4',
          shade: '#E6E6E7',
          leaf: '#7DA66A',
          forest: '#4E6C3F',
          sand: '#C9B9A6',
          wood: '#7A5A3A',
          text: '#222222',
        },
        dark: {
          bg: '#1a1a1a',
          surface: '#2a2a2a',
          elevated: '#3a3a3a',
          border: '#404040',
          text: '#e5e5e5',
          textMuted: '#a0a0a0',
          leaf: '#8fb77a',
          forest: '#5f7d50',
        }
      },
      backgroundImage: {
        'cosmic': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      },
    },
  },
  plugins: [],
}
