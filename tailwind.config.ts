import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1C1C1E",
        textPrimary: "#FFFFFF",
        textSecondary: "#8E8E93",
        accent: "#FF9F0A",
        chartBar: "rgba(48, 209, 88, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
