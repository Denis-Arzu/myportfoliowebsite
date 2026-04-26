// Central design tokens for a premium, restrained UI
export const tokens = {
  colors: {
    background: {
      primary: '#0A0A0B',
      secondary: '#111113',
      elevated: '#18181B',
      card: '#1C1C1F',
    },
    text: {
      primary: '#FAFAFA',
      secondary: '#A1A1AA',
      muted: '#71717A',
      accent: '#FFFFFF',
    },
    accent: {
      primary: '#3B82F6',
      hover: '#2563EB',
      subtle: 'rgba(59, 130, 246, 0.1)',
      gradientStart: '#3B82F6',
      gradientEnd: '#8B5CF6',
    },
    border: {
      subtle: 'rgba(255,255,255,0.06)',
      default: 'rgba(255,255,255,0.1)',
      strong: 'rgba(255,255,255,0.2)'
    }
  },
  typography: {
    fontStack: {
      headings: 'Inter, -apple-system, sans-serif',
      body: 'Inter, -apple-system, sans-serif',
      mono: 'JetBrains Mono, Fira Code, monospace',
    },
    scale: {
      heroTitle: 'clamp(2.5rem, 5vw, 4.5rem)',
      sectionTitle: 'clamp(2rem, 3vw, 3rem)',
      cardTitle: '1.25rem',
      bodyLarge: '1.125rem',
      body: '1rem',
      caption: '0.875rem',
      overline: '0.75rem'
    },
    weights: {
      hero: '600',
      headings: '600',
      body: '400',
      labels: '500'
    },
    lineHeights: {
      tight: '1.1',
      normal: '1.5',
      relaxed: '1.75'
    }
  },
  spacing: {
    baseUnit: '4px',
    scale: [4, 8, 12, 16, 24, 32, 48, 64, 96, 128],
  }
};
