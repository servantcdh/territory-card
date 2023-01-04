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
      },
      keyframes: {
        error: {
          "0%": { transform: "translate(1px, 1px) rotate(0deg)" },
          "10%": { transform: " translate(-1px, -2px) rotate(-1deg)" },
          "20%": { transform: " translate(-3px, 0px) rotate(1deg)" },
          "30%": { transform: " translate(3px, 2px) rotate(0deg)" },
          "40%": { transform: " translate(1px, -1px) rotate(1deg)" },
          "50%": { transform: " translate(-1px, 2px) rotate(-1deg)" },
          "60%": { transform: " translate(-3px, 1px) rotate(0deg)" },
          "70%": { transform: " translate(3px, 1px) rotate(-1deg)" },
          "80%": { transform: " translate(-1px, -1px) rotate(1deg)" },
          "90%": { transform: " translate(1px, 2px) rotate(0deg)" },
        },
        scale: {
          "0%": { transform: "scale(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 0.8 },
        },
        rotate45: {
          "0%": { transform: "rotate(0)" },
          "100%": { transform: "rotate(45deg)" },
        },
        showUp: {
          "0%": { transform: "translateY(550%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        hideDown: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(200%)"},
        },
        hideLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-200%)" },
        },
        naviToProfile: {
          from: { "background-color": "rgb(254 252 232)" },
          to: { "background-color": "rgb(253 224 71)" },
        },
        naviToSetting: {
          from: { "background-color": "rgb(254 252 232)" },
          to: { "background-color": "rgb(253 186 116)" },
        },
        naviToCard: {
          from: { "background-color": "rgb(254 252 232)" },
          to: { "background-color": "rgb(129 140 248)" },
        },
        naviToS13: {
          from: { "background-color": "rgb(254 252 232)" },
          to: { "background-color": "rgb(244 63 94)" },
        },
        naviToView: {
          from: { "background-color": "rgb(254 252 232)" },
          to: { "background-color": "rgb(52 211 153)" },
        },
        naviToNotFound: {
          from: { "background-color": "rgb(254 252 232)" },
          to: { "background-color": "rgb(148 163 184)" },
        },
      },
      animation: {
        error: "error 0.5s ease-in-out forwards",
        scale: "scale 0.3s ease-in-out",
        fadeIn: "fadeIn 0.5s ease-in-out forwards",
        rotate45: "rotate45 0.5s ease-in-out forwards",
        showUp: "showUp 0.3s ease-in-out forwards",
        hideDown: "hideDown 0.5s ease-in-out forwards",
        hideLeft: "hideLeft 1s ease-in-out forwards",
        naviToProfile: "naviToProfile 0.5s ease-in-out forwards",
        naviToSetting: "naviToSetting 0.5s ease-in-out forwards",
        naviToCard: "naviToCard 0.5s ease-in-out forwards",
        naviToS13: "naviToS13 0.5s ease-in-out forwards",
        naviToView: "naviToView 0.5s ease-in-out forwards",
        naviToNotFound: "naviToNotFound 0.5s ease-in-out forwards",
      },
      translate: {
        550: "550%",
      },
    },
  },
  plugins: [],
};
