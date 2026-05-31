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
          500: '#0a0a1a',
          600: '#080816',
          700: '#060610',
          800: '#04040c',
          900: '#020208',
        },
        royal: {
           50: '#f2eefb',
           100: '#d9cff3',
           200: '#b399e8',
           300: '#8d63dd',
           400: '#6e3ed4',
           500: '#1a0a2e',
           600: '#150826',
           700: '#10061e',
           800: '#0b0416',
           900: '#06020e',
         },
         warm: {
           50: '#FEFCF8',
           100: '#FBF7F0',
           200: '#F5EFE6',
           300: '#EDE4D5',
           400: '#E0D4C0',
           500: '#D4C4A8',
         },
         navy: {
           50: '#e8e8ed',
           100: '#c5c5d1',
           200: '#9e9eb3',
           300: '#777795',
           400: '#5a5a7e',
           500: '#0D0D1A',
           600: '#0a0a15',
           700: '#070710',
           800: '#04040a',
           900: '#020205',
         },
        },
      maxWidth: {
        '8xl': '90rem',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s linear infinite',
        'gold-pulse': 'goldPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'reveal': 'reveal 1.2s ease-out forwards',
        'corner-glow': 'cornerGlow 3s ease-in-out infinite',
        'border-flow': 'borderFlow 4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
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
          '0%': { boxShadow: '0 0 5px rgba(201, 169, 110, 0.2), 0 0 10px rgba(201, 169, 110, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(201, 169, 110, 0.4), 0 0 40px rgba(201, 169, 110, 0.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        goldPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        cornerGlow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
        },
        borderFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
    },
  },
  plugins: [],
}
