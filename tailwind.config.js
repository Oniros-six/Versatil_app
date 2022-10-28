/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/app/components/**/*.jsx",
    "./src/app/containers/**/*.jsx"
  ],
  theme: {
    extend: {
      spacing: {
        '36em': '36em',
      },
      colors: {
        'ambar': '#e67700',
      },
    },
  },
  plugins: [],
}
