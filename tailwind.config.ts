import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter ", "sans-serif"],
        inter_medium: ["Inter Medium", "sans-serif"]
      },
      colors: {
        background: {
          DEFAULT: "#F5F5F5"
        },
        black: {
          DEFAULT: "#000000"
        },
        while: {
          DEFAULT: "#ffffff"
        },
        grey: {
          DEFAULT: "#E6E6E6"
        }
      }
    },
  },
  plugins: [],
};
export default config;
