/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          Montserrat: ['Montserrat', 'sans-serif'],
        },
        colors: {
          blue: {
            light: '#E6EAF1',
            'light-hover': '#DAE0EA',
            'light-active': '#B2BED5',
            normal: '#062D76',
            'normal-hover': '#05296A',
            'normal-active': '#05245E',
            dark: '#052259',
            'dark-hover': '#041B47',
            'dark-active': '#031435',
            darker: '#021029',
          },
        },
      },
    },
    plugins: [
      require('tailwindcss-animate'),
    ],
  }