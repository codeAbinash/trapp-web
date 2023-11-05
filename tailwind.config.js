/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#ff002e',
        bg: '#070707',
      },
      padding: {
        4.5: '1.125rem',
      },
      width: {
        4.5: '1.125rem',
      },
      screens: {
        xxs: '350px',
      },
    },
  },
  plugins: [],
}
