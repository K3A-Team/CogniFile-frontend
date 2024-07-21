import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
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
      },
    },
  },
  plugins: [],
};
export default config;
