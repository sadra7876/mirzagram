/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        15: "3.75rem", //60px
      },
      height: {
        15: "3.75rem", //60px
      },
      backgroundImage: {
        "background-auth": "url('../src/assets/images/Background.jpg')",
      },
      padding: {
        3.5: "14px",
      },
    },
  },
  plugins: [],
};
