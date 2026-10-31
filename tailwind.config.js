/** @type {import('tailwindcss').Config} */
module.exports = { darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#1b8c1d',
          darkblue: '#14456c',
          blue: '#1b63cd',
          black: '#000000',
        }
      }
    },
  },
  plugins: [],
};
