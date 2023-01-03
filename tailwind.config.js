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
        }
      },
      keyframes: {
        scale: {
          "0%": { transform: "scale(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 0.8 },
        },
        focusX: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(45deg)" }
        },
        focusOutX: {
          "0%": { transform: "rotate(45deg)" },
          "1000%": { transform: "rotate(0deg)" }
        },
        scaleUp: {
          "0%": { transform: "scale(1, 0)" },
          "100%": { transform: "scale(1, 1)" },
        },
        scaleDown: {
          "0%": { transform: "scale(1, 1)" },
          "100%": { transform: "scale(1, 0)" },
        },
      },
      animation: {
        scale: "scale 0.3s ease-in-out",
        fadeIn: "fadeIn 0.5s ease-in-out forwards",
        focusX: "focusX 0.2s linear forwards",
        focusOutX: "focusOutX 0.2s linear forwards",
        scaleUp: "scaleUp 0.2s linear forwards",
        scaleDown: "scaleDown 0.2s linear forwards",
      },
    },
  },
  plugins: [],
};
