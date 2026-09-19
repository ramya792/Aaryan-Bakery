/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bakery: {
          ivory: '#FAF7F2',
          cream: '#F5EFEB',
          warmWhite: '#FFFDF9',
          espresso: '#2C1810',
          darkBrown: '#1E100B',
          softBrown: '#5C4033',
          terracotta: '#C84B31',
          cherry: '#A93226',
          gold: '#D4AF37',
          softGold: '#C5A059',
          border: '#E8DFD5'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
