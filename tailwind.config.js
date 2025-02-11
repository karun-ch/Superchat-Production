/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif','roboto'],
      },
      colors: {
        'custom-purple': '#4A0044',
      },
      screens: {
        sm: "640px",
        // other breakpoints...
      },
    },
  },
  plugins: [],
}