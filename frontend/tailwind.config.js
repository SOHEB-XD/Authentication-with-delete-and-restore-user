/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-start': '#e83e8c',
        'primary-end': '#a855f7',
        'glass-bg': 'rgba(255, 255, 255, 0.85)',
        'input-bg': 'rgba(243, 244, 246, 0.8)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
      }
    },
  },
  plugins: [],
}
