module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        //primary/secondary
        water: "#CBF1FA",
        "light-cyan": "#E2FCFF",
        white: "#FAFEFF",
        "blizzard-blue": "#AEDBF0",
        iceberg: "#6BA7CC",
        "steel-blue": "#3F7EB3",
      },
      backgroundImage: {
        watermark: "url('/src/assets/images/watermark.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    // styled: true,
    // themes: true,
    // base: true,
    // utils: true,
    // logs: true,
    // rtl: false,
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  },
};
