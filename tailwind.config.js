/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
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
        skyBlue: '#3AB4F2',
        clickSkyBlue: '#4F9EC6',
        hoverSkyBlue: '#82CDF4',
        gray1: '#F0F0F0',
        gray2: '#D9D9D9',
        gray3: '#9E9D9D',
        gray4: '#777777'
      },
      keyframes: {
        progress: {
          from: { width: '100%' },
          to: { width: '0%' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        }
      },
      animation: {
        progress3: 'progress 3s ease-in forwards',
        progress5: 'progress 5s ease-in forwards',
        progress7: 'progress 7s ease-in forwards',
        fadeIn: 'fadeIn 0.5s forwards',
        fadeOut: 'fadeOut 0.5s forwards'
      },
      translate: {
        center: '50%'
      }
    },
    plugins: []
  }
};
