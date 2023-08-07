/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    colors: {
      red: '#EB5353',
      hoverRed: '#EA8282',
      clickRed: '#B83535',
      yellow: '#F9D923',
      hoverYellow: '#FBE464',
      clockYellow: '#B83535',
      green: '#36AE7C',
      hoverGreen: '#68CFA4',
      clickGreen: '#409370',
      blue: '#187498',
      hoverBlue: '#4A9EBE',
      clickBlue: '#1D5F79',
      skyblue: '#3AB4F2',
      clickSkyblue: '#4F9EC6',
      hoverSkyblue: '#82CDF4',
      gray: '#9E9D9D',
      clickGray: '#777777'
    },
    extend: {}
  },
  plugins: []
};
