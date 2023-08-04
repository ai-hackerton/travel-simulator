/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        screen: "100dvh",
      },
      height: {
        'screen': '100dvh',
      },
      boxShadow: {
        'DEFAULT': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      }
    },
    colors: {
      white: "#ffffff",
      black: "#000000",
      main: {
        100: "#C63C3C",
        200: "#DA5D5D",
        300: "#C63C3C",
      },
    },
  },
  plugins: [],
};
