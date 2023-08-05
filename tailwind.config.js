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
      boxShadow: {
        DEFAULT: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
    colors: {
      white: "#ffffff",
      black: "#000000",
      main: {
        100: "#EB7A7A",
        200: "#DA5D5D",
        300: "#C63C3C",
      },
      red: {
        100: "#FFD9D9",
        200: "#FFB2B2",
        300: "#FF8C8C",
        400: "#FF6666",
        500: "#FF4040",
      },
      gray: {
        100: "#F5F6F8",
        200: "#E9EBF0",
        300: "#8C8C8C",
        400: "#666666",
        500: "#404040",
        600: "#333333",
        700: "#2B2B2B",
        800: "#1C1C1C",
      },
    },
  },
  plugins: [],
};
