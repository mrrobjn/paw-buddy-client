import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    extend: {
      backgroundColor: {
        primary: "#247CFF",
        secondary: "#fff",
        third: "#2A3240",
        card: "#606873",
        "lg-blue": "#ECEFF2",
        hoverdark: "#242424",
        success: "#D8F7EA",
        warning: "#FFEEC6",
        danger: "#FEDEDE",
        "subtle-danger": "#FC5A5A",
        "subtle-success": "#82C43C",
        "subtle-warning": "#FFC542",
        disable: "#CCC",
      },
      borderColor: {
        primary: "#247CFF",
        success: "#82C43C",
        warning: "#FFC542",
        danger: "#FC5A5A",
        dark: "#242424",
        disable: "#CCC",
      },
      textColor: {
        "10": "#FFFFFF",
        "20": "#F5F5F5",
        "30": "#EDEDED",
        "40": "#E0E0E0",
        "50": "#C2C2C2",
        "60": "#9E9E9E",
        body: "#757575",
        "80": "#616161",
        "90": "#404040",
        "100": "#242424",
        blue: "#247CFF",
        success: "#82C43C",
        warning: "#FFC542",
        danger: "#FC5A5A",
      },
    },
  },
  plugins: [],
};
export default config;
