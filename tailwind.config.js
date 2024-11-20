/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,jsx}", "./src/components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#09141A",
        primary: "#0E191F",
        secondary: "#FFFFFF14",
        accent: "#FFFFFF54",
        gold: "#D6C59A",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
