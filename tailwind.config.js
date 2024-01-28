const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white_color: "#ffffff",
        primary_500_brand: "#2078F7",
        primary_100: '#CFE2FD',
        primary_50: '#F3F8FF',
        primary_10: "#FFFBFF",
        neutral_800: "#2D3748",
        neutral_900: "#1A202C",
        neutral_700: "#4A5568",
        neutral_600: "#718096",
        neutral_500: "#A0AEC0",
        neutral_400: "#CBD5E0",
        neutral_300: "#E2E8F0",
        neutral_200: "#EDF2F7",
        neutral_100: "#F7FAFC",
        purple: "#A45CFF",
        pink: "#F45975",
        border_avatar: "#010101",
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      }
    },
    borderWidth: {
      DEFAULT: '1px',
      '1/2': '0.5px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  variants: {
    extend: {
      textColor: ['hover'],
    },
 },
});
