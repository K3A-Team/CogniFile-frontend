import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /* For the dimensions make sure to work with 100% of zoom in your pc and in the browser to get the perfect result*/

      /* Calculate dimensions using rem
        1rem =16px

      */
      /* For the text sizes, follow figma:
        lg: between 16px to 20px
        xl: between 20px to 24px
        2xl: between 20px to 24px
        3xl: between 24px to 28px
        4xl: between 28px to 32px
        5xl: between 40px to 48px
        6xl: between 56px to 64px
        7xl: between 72px to 80px
      */

      /* 
        For Line height, if it's 150% in figma use loose or relaxed or Normal
      */

      /* Make sure to treat the hover effect it's showed in the prototype*/

      /* For the radius, calculate it in rem:
        1rem = 16px
        2rem = 32px
        ....
      */

      /* Shadows are not included int he ui, so no shadow*/

      /* Make sure to respect the grid:
        1600px = 84vw (landing page)
        300px in the sidebar and 1484px for the content inside the dashboard
      */

      fontWeight: {
        // Custom font weights just read ot form figma and put
        thin: '100',
        'extra-light': '200',
        light: '300',
        regular: '400',
        medium: '500',
        'semi-bold': '600',
        bold: '700',
        'extra-bold': '800',
        black: '900',
      },
      colors: {
        'dark-bg': '#1F1F1F', //For the background
        'dar-card': '#191919',
        'green-folder': '#52C41A',
        'blue-folder': '#40A9FF',
        'yellow-folder': '#FADB14',
        'Purple-file': '#98429C',
        'green-file': '#819C42',
        'selected-sidebar': '#262626',
        blue: '#0189F9',
        yellow: '#FEB917',
        red: '#E63C18',
        green: '#6EBA57',
        purple: '#8C57BA',
        'cf-gray': '#787878',
        'cf-dark': '#1F1F1F',
        'cf-dark-two': '#252525',
        'cf-blue': '#0189F9',
        'cf-yellow': '#FEB917',
        'cf-red': '#E63C18',
        'cf-green': '#6EBA57',
        'cf-purple': '#8C57BA',
      },
      backgroundImage: {
        datacenter: "url('/datacenter.png')",
        // Custom linear gradient
        'Blue-gradient': 'linear-gradient(to right, #68A7DB, #3376AD)',
        'Gray-gradient': 'linear-gradient(to right, #DEDEDE, #777777)',
        'Orange-gradient': 'linear-gradient(to right, #DBA568, #AD7033)',
        'Red-gradient': 'linear-gradient(to right, #DB6868, #AD3333)',
        'Green-gradient': 'linear-gradient(to right, #87DB68, #53AD33)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
