/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#f9f6f0",
        "primary-btn": "#000000",
        primary: "#10b981", // Emerald 500
        gold: "#fbbf24", // Amber 400
      },
    },
  },
  plugins: [],
};
