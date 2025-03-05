/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A8A', // Dark blue
          light: '#3B82F6',
          dark: '#1E40AF',
        },
        secondary: {
          DEFAULT: '#7E22CE', // Purple
          light: '#A855F7',
          dark: '#6B21A8',
        },
        accent: {
          DEFAULT: '#0EA5E9', // Turquoise
          light: '#38BDF8',
          dark: '#0284C7',
        },
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#F3F4F6',
        },
        text: {
          DEFAULT: '#374151',
          light: '#6B7280',
          dark: '#1F2937',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        card: '12px',
      },
    },
  },
  plugins: [],
};
