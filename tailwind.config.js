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
        screen: "100dvh",
      },
      boxShadow: {
        DEFAULT: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
    colors: {
      white: "#ffffff",
      black: "#000000",
      main: {
        100: "#C63C3C",
        200: "#DA5D5D",
        300: "#C63C3C",
      },
      gray: {
        100: "#F5F6F8",
        200: "#E9EBF0",
        300: "#DADCE2",
        400: "#C5CAD3",
        500: "#A6ADBC",
        600: "#8F95A2",
        700: "#5A6070",
        800: "#1B1F26",
      },
    },
  },
  plugins: [],
};
