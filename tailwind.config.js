/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        upDown: {
          '0%, 100%': { transform: 'translateY(-2%)' },
          '50%': { transform: 'translateY(2%)' },
        },
      },
      animation: {
        'up-down': 'upDown 3s ease-in-out infinite',
      },
      colors:{
        'brand': '#001AFF'
      },
      fontFamily: {
        neueBit: ["PPNeueBit", "sans-serif"],
        eiko: ["PPEiko", "sans-serif"],
      },
    },
    
  },
  plugins: [require("tailwindcss-animate")],
}