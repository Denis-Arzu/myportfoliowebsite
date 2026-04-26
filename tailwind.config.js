
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0A0A0B',
          secondary: '#111113', 
          elevated: '#18181B',
          card: '#1C1C1F',
          hover: '#222225'
        },
        text: {
          primary: '#FAFAFA',
          secondary: '#A1A1AA',
          muted: '#71717A',
          accent: '#FFFFFF'
        },
        accent: {
          primary: '#3B82F6', 
          hover: '#2563EB',
          subtle_bg: 'rgba(59, 130, 246, 0.1)',
          gradient_start: '#3B82F6',
          gradient_end: '#8B5CF6'
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.06)',
          default: 'rgba(255, 255, 255, 0.10)',
          strong: 'rgba(255, 255, 255, 0.20)',
          accent: 'rgba(59, 130, 246, 0.30)'
        },
        semantic: {
          success: '#10B981',
          warning: '#F59E0B', 
          error: '#EF4444',
          info: '#06B6D4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'Noto Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace']
      },
      fontSize: {
        hero: ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', fontWeight: '600' }],
        display: ['clamp(2.25rem, 4vw, 3.75rem)', { lineHeight: '1.15', fontWeight: '600' }],
        'heading-lg': ['clamp(1.875rem, 3vw, 2.5rem)', { lineHeight: '1.2', fontWeight: '600' }],
        'heading': ['1.5rem', { lineHeight: '1.33', fontWeight: '600' }],
        'subheading': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '500' }]
      },
      borderRadius: {
        card: '12px',
        button: '8px',
        input: '8px'
      },
      boxShadow: {
        glow: '0 0 20px rgba(59, 130, 246, 0.25)',
        'glow-strong': '0 0 40px rgba(59, 130, 246, 0.35)',
        card: '0 4px 6px -1px rgba(0,0,0,0.3), 0 2px 4px -2px rgba(0,0,0,0.2)',
        'card-hover': '0 20px 25px -5px rgba(0,0,0,0.5), 0 8px 10px -6px rgba(0,0,0,0.3)'
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(circle at 20% 0%, rgba(59,130,246,0.15), transparent 40%)'
      },
      animation: {
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.4,0,0.2,1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.4,0,0.2,1)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.4,0,0.2,1)',
        'shimmer': 'shimmer 2s linear infinite'
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } }
      }
    }
  },
  plugins: [],
};
