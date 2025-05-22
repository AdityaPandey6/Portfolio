/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {        myyellow: '#fcbc37',
        mygray: '#DCDCDC'
      },
      fontFamily: {
        title: ["Montserrat", "sans-serif"],
      },
      cursor:{
        none: 'none',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.text-stroke': {
            '-webkit-text-stroke': '1px #fcbc37', // Stroke width and color
          },
        },
        ['responsive', 'hover']
      )
    },
  ],
}

