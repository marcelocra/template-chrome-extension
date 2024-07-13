import twTypography from "@tailwindcss/typography";
import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.m?{js,ts,jsx,tsx,mdx,html}"],
  plugins: [daisyui, twTypography],
  daisyui: {
    themes: ["dracula", "dark", "light"],
  },
};

export default config;
