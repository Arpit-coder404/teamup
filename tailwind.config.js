/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          bg: '#F7F3EA',
          white: '#FFFEFA',
          card: '#FBF9F4',
          border: '#E6E0D5',
          darkBorder: '#D8D0C3',
        },
        ink: {
          primary: '#1D1D1B',
          secondary: '#74716A',
          muted: '#9B9890',
        },
        cobalt: {
          DEFAULT: '#3457D5',
          hover: '#2744B2',
          light: '#E7EBFF',
          dark: '#1D3594',
        },
        scrapbook: {
          yellow: '#F4D65E',
          yellowLight: '#FEF8DB',
          green: '#CDE5D0',
          greenDark: '#4A7C59',
          coral: '#EF806D',
          coralLight: '#FDECE9',
          dark: '#171916',
          tape: 'rgba(235, 228, 210, 0.65)',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        handwritten: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        scrapbook: '0 4px 20px -2px rgba(29, 29, 27, 0.08), 0 2px 6px -1px rgba(29, 29, 27, 0.04)',
        polaroid: '0 8px 30px -4px rgba(29, 29, 27, 0.12), 0 2px 8px -2px rgba(29, 29, 27, 0.06)',
        lifted: '0 12px 35px -6px rgba(29, 29, 27, 0.15), 0 4px 10px -2px rgba(29, 29, 27, 0.05)',
        sticky: '2px 4px 12px rgba(0, 0, 0, 0.08)',
        subtle: '0 2px 8px rgba(0, 0, 0, 0.04)',
      },
      rotate: {
        '0.5': '0.5deg',
        '1': '1deg',
        '1.5': '1.5deg',
        '2': '2deg',
        '-0.5': '-0.5deg',
        '-1': '-1deg',
        '-1.5': '-1.5deg',
        '-2': '-2deg',
      },
    },
  },
  plugins: [],
};

