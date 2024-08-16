const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      width: {
        15: "3.75rem", //60px
        485: "485px", //485px
      },
      height: {
        15: "3.75rem", //60px
        456: "456px",
        300: "300px",
      },
      backgroundImage: {
        "background-auth": "url('../src/assets/images/Background.jpg')",
      },
      padding: {
        3.5: "14px",
      },
      colors: {
        "mirza-green": "#17494D",
        "mirza-red": "#EA5A69",
        "mirza-black": "#191919",
        "mirza-gold": "#C19008",
        "mirza-orange": "#F7901E",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
