/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ['Poppins', "sans-serif"],
    },
    extend: {
      colors: {
        coral: "#FF8976",
        chiliPeper: '#CB4E47',
        peach: '#FFCBA4',
        peachBlue: '#ABD2FF',
        peachDarkBlue: '#92B9E7',
        peachLightBlue: '#C5EBFF',
        peachYellow: '#E5CC9C',
        peachDark: '#B29B6D',
      },
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px":"400px"
      },
    },
  },
  plugins: [],
};
