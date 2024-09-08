import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: "#FFF0F5",
          100: "#FFE0EB",
          200: "#FFC1D7",
          300: "#FFA2C3",
          400: "#FF83AF",
          500: "#FF649B",
          600: "#FF4587",
          700: "#FF2673",
          800: "#FF075F",
          900: "#E8004B",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#FF649B",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#FFA2C3",
              foreground: "#000000",
            },
            focus: "#FF649B",
          },
        },
      },
    }),
  ],
};
