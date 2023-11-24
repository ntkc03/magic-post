/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "Roboto", "Arial", "sans-serif"],
        serif: ["Merriweather", "serif"],
        mono: [
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      colors: {
        foundItBg: "#f7f2fa",
        footerBg: "#1d1934",
        limeGreen: "#0AD20A",
        buttonPurple: "#302C42",
        background: "#f4f7ff",
        loginText: "#39147B",
        activeButton: "#007aff",
        h6: "#6A7785",
        headline: "#302C42",
        button: "#7339AB",
        buttonbg: "#89BCFF",
      },
    },
    plugins: [require("tailwind-scrollbar"), require("@tailwindcss/forms")],
  },
});
