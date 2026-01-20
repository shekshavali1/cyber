/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}"  // <--- This makes sure it checks all folders inside src
  ],
  theme: {
    extend: {
      colors: {
        'wa-bg': '#e5ddd5',
        'wa-green': '#00a884',
        'wa-chat-my': '#d9fdd3',
        'wa-chat-other': '#ffffff'
      }
    },
  },
  plugins: [],
}