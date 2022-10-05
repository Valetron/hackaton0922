/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-once': 'pulse .5s cubic-bezier(0.4, 0, 0.6, 1)'
      },
    },
  },
  plugins: [],
}
