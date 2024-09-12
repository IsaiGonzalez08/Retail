/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        zodiakThin: ['Zodiak-Thin', 'sans-serif'],
        zodiakLight: ['Zodiak-Light', 'sans-serif'],
        zodiakRegular: ['Zodiak-Regular', 'sans-serif'],
        zodiakBold: ['Zodiak-Bold', 'sans-serif'],
        zodiakExtrabold: ['Zodiak-Extrabold', 'sans-serif'],
        zodiakBlack: ['Zodiak-Black', 'sans-serif'],
      },
      screens: {
        'galaxy-z': '340px', 
        'custom': '350px', 
        'custom2': '390px',
      },
    }
  },
  plugins: []
};