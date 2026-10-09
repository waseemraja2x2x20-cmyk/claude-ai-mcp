/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0e6b45', light: '#3fb37f', dark: '#09482f' },
        accent: { DEFAULT: '#e2a32b', soft: '#fbefd4' },
        ink: { DEFAULT: '#0b1410', 2: '#122019', 3: '#1b2c23' },
        paper: { DEFAULT: '#f3f5f1', 2: '#e8eee6' },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        urdu: ['"Noto Nastaliq Urdu"', 'serif'],
      },
      borderRadius: { '4xl': '2rem' },
    },
  },
  plugins: [],
};
