/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      width: {
        'thirty': '30%',
      },
      colors: {
        'mainText' : '#66BE7A',
        'secondaryText' : '#0098F9',
        'tertiaryText' : '#DE4C50',
        'regularText': '#646464',
        'regularOrange' : '#EA6F53',
        'regularLightOrange' : '#E29C5D',
        'regularIndigo' : '#656C9A',
        'reguarYellow' : '#E0BC31',
        'regularCyan' : '#00A3B2',
        'regularGrey' : '#838383',
        'tableTextColor' : '#424242',
      },
      fontFamily : {
        'interFont' : [ 'Inter', 'sans-serif' ],
        'robotoFont' : [ 'Roboto', 'sans-serif' ],
      },
      fontSize: {
        xx : '0px',
      },
      width: {
        'none': '0px',
      },
      height: {
        'none': '0px',
      },
    },
  },
  plugins: [],
}

