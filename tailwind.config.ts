import { type Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: colors.purple[900],
          secondary: colors.purple[400],
          accent: colors.green[400],
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "emerald",
      "dark",
    ],
  },
} satisfies Config;
