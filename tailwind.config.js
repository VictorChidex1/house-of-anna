/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: "#FDFBF7",
          navy: "#1E2A3A",
          dark: "#1A1A1A",
          gray: "#5A5A5A",
          gold: "#C9A87C",
          charcoal: "#2C2C2C",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
