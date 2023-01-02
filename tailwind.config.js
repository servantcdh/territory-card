/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["IBM Plex Mono", "Do Hyeon", "Menlo", "monospace"],
        body: ["IBM Plex Mono", "Do Hyeon", "Menlo", "monospace"],
      },
      colors: {
        primary: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        secondary: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
      },
      keyframes: {
        scale: {
          "0%": { transform: 'scale(0)' },
        },
      },
      animation: {
        scale: "scale 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
