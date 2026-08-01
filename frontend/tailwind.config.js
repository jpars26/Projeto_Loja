/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bone: "#EFEDE7",
        surface: "#FFFFFF",
        ink: "#231B21",
        accent: "#7A2E3A",
        hairline: "#D8D2C9",
        // Tons por categoria — usar só em detalhes pequenos (tags, pills,
        // sublinhados), nunca como fundo de seção inteira.
        noivas: "#C9AF98",
        ternos: "#2B3446",
        festa: "#B8862E",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Manrope", "sans-serif"],
        label: ["Space Grotesk", "sans-serif"],
      },
      keyframes: {
        "float-up": {
          "0%": { transform: "translate(-50%, 0)", opacity: "1" },
          "50%": { transform: "translate(-50%, -100px)", opacity: "0.8" },
          "100%": { transform: "translate(-50%, -200px)", opacity: "0" },
        },
      },
      animation: {
        "float-up": "float-up 1s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
