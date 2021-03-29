module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#3D74FF",
      secondary: "#B6CAFC",
      tertiary: "#E9EFFF",
      gray: "#C1C9E0",
      text: "#5A6786",
      error: "#FF0000",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
