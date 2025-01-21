/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        slide: "slide 3s ease-in-out infinite alternate",
        "slide-reverse": "slide 3s ease-in-out infinite alternate-reverse",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translate(-20%, -20%) rotate(-10deg)" },
          "100%": { transform: "translate(20%, 20%) rotate(10deg)" },
        },
      },
      backgroundImage: {
        'gradient-radial': "radial-gradient(circle, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};