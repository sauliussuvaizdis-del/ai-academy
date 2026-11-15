import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}', './content/**/*.mdx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f2f5fb', 100: '#e3e9f5', 200: '#c4d0e8', 300: '#94a9d1', 400: '#5f7bb3',
          500: '#3d5a96', 600: '#2c457a', 700: '#223663', 800: '#1a2a4d', 900: '#14213d', 950: '#0b1326',
        },
        amber: {
          50: '#fff8e6', 100: '#ffefc2', 200: '#ffdf85', 300: '#ffcc47', 400: '#f9b915',
          500: '#f2a900', 600: '#cc8a00', 700: '#a16b00', 800: '#7a5100', 900: '#523600',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: '72ch',
            a: { color: theme('colors.navy.600'), textDecorationThickness: '1px' },
            'h2': { marginTop: '2em' },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
          },
        },
        invert: { css: { a: { color: theme('colors.amber.300') } } },
      }),
    },
  },
  plugins: [typography],
}
