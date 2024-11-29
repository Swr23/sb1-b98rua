/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          primary: '#0A1128',
          secondary: '#1B2D5D',
          accent: '#2E4B99',
          highlight: '#4C6EF5',
          neon: '#00F5FF'
        },
        dark: {
          primary: '#0F172A',
          secondary: '#1E293B',
          accent: '#334155',
          text: '#F1F5F9',
          muted: '#94A3B8',
          border: '#334155',
          highlight: '#3B82F6'
        }
      },
      backgroundImage: {
        'gradient-space': 'linear-gradient(135deg, #0A1128 0%, #1B2D5D 50%, #2E4B99 100%)',
        'gradient-glow': 'linear-gradient(135deg, rgba(76,110,245,0.5) 0%, rgba(0,245,255,0.5) 100%)'
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0,245,255,0.5)',
        'space': '0 8px 32px rgba(0,0,0,0.3)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(76,110,245,0.1)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
        'dark-sm': '0 2px 4px 0 rgba(0, 0, 0, 0.3)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,245,255,0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(0,245,255,0.6)' }
        }
      },
      transitionDuration: {
        '250': '250ms'
      }
    }
  },
  plugins: [],
};