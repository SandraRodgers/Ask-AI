/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vueGreen: 'rgb(66,185,131)',
        vueGreenHover: 'rgb(50,161,111)',
        vueBlue: 'rgb(98,136,241)'
      }
    }
  },
  plugins: []
}
