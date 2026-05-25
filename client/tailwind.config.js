/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf8e8',
          100: '#f9ecc5',
          200: '#f3d98e',
          300: '#ecc44d',
          400: '#e5b22e',
          500: '#C9A96E',
          600: '#b8953e',
          700: '#9a7a32',
          800: '#80622b',
          900: '#6a5026',
        },
        midnight: {
          50: '#e8e8ed',
          100: '#c5c5d1',
          200: '#9e9eb3',
          300: '#777795',
          400: '#5a5a7e',
          500: '#1a1a2e',
          600: '#161629',
          700: '#111124',
          800: '#0d0d1f',
          900: '#08081a',
        },
        royal: {
          50: '#f2eefb',
          100: '#d9cff3',
          200: '#b399e8',
          300: '#8d63dd',
          400: '#6e3ed4',
          500: '#16213e',
          600: '#121b35',
          700: '#0e152c',
          800: '#0a1023',
          900: '#060b1a',
        }
      },
      maxWidth: {
        '8xl': '90rem',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920')",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(201, 169, 110, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(201, 169, 110, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
