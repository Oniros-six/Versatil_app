/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./public/index.html",
    "./src/app/components/**/*.jsx",
    "./src/app/containers/**/*.jsx"
  ],
  theme: {
    extend: {
      colors: {
        'ambar': '#e67700',
      },	
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
      },		            
    },
  },
  plugins: [],
}
