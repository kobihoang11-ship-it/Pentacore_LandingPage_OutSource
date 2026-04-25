/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        iceland: ['Iceland', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        brand: {
          bg:      '#0c0c0c',
          surface: '#121212',
          border:  '#383838',
          muted:   '#2f2f2f',
          red:     '#ff3d3d',
        },
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}
