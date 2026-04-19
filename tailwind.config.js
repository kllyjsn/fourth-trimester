/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#f6f8f5",
          100: "#e8efe5",
          200: "#cfdcc8",
          300: "#abc09f",
          400: "#85a076",
          500: "#678458",
          600: "#516a45",
          700: "#415539",
          800: "#364530",
          900: "#2e3a2a",
        },
        cream: {
          50: "#fbf8f1",
          100: "#f6f0e0",
          200: "#ece0bf",
          300: "#dfca95",
          400: "#d2b26a",
          500: "#c29b4a",
          600: "#a9803d",
          700: "#896434",
          800: "#6f502f",
          900: "#5c432a",
        },
        ink: {
          50: "#f6f6f5",
          100: "#e7e7e4",
          200: "#cfcfc9",
          300: "#aeaea5",
          400: "#8a8a80",
          500: "#6e6e64",
          600: "#55554d",
          700: "#45453f",
          800: "#393934",
          900: "#24241f",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "Fraunces",
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(24,28,22,0.04), 0 8px 24px rgba(24,28,22,0.06)",
      },
    },
  },
  plugins: [],
};
