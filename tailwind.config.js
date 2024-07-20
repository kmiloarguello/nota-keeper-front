/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    './src/**/*.js',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        'nota_keeper-red-100': '#FFCDD2',
        'nota_keeper-red-200': '#F44336',
        'nota_keeper-red-300': '#B71C1C',

        'nota_keeper-blue-100': '#A1F9FF',
        'nota_keeper-blue-200': '#3E83E1',
        'nota_keeper-blue-300': '#1EA9DB',
        'nota_keeper-blue-400': '#01CAD7',
        'nota_keeper-blue-500': '#16295b',

        
        'nota_keeper-grey-100': '#FFFFFF',
        'nota_keeper-grey-200': '#9494A9',
        'nota_keeper-grey-300': '#303045',
        'nota_keeper-grey-400': '#0C123A',
        'nota_keeper-grey-500' : '#5f5766',

        'nota_keeper-purple-100': '#B79EF6',
        'nota_keeper-purple-200': '#A70DF2',
        'nota_keeper-purple-300': '#7545EA',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
  important: true, // it will add !important to all tailwind classes
}

