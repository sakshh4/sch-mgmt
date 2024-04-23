/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#f2c347",
        secondary: "#f7f7f7",
      },
      borderColor: {
        primary: "#dcdcdc",
      },
      colors: {
        primary: "#000000",
      },
    },
  },
  plugins: [],
};
