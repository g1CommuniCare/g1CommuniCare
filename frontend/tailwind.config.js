/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
          fontFamily: {
            'sans': ['Roboto', 'sans-serif'],
            'librefranklin': ['Libre Franklin', 'sans-serif'],
            'robotoserif': ['Roboto Serif', 'serif'],
            'archivo': ['Archivo', 'sans-serif'],
            'marcellus': ['Marcellus', 'serif'],
            'molengo': ['Molengo', 'serif'],
          },
          fontWeight: {
            'thin': 100,
            'extralight': 200,
            'light': 300,
            'normal': 400,
            'medium': 500,
            'semibold': 600,
            'bold': 700,
            'extrabold': 800,
            'black': 900,
          },
        },
      },
      variants: {},
      plugins: [],
};
