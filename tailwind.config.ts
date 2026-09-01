import type { Config } from 'tailwindcss';

/**
 * Design tokens are derived from the Nekor wordmark:
 * near-black ground, thin geometric letterforms, one copper stem.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14181C',
        slate: '#1E242B',
        graphite: '#2B333C',
        bone: '#F5F2EC',
        paper: '#FFFFFF',
        mist: '#8B949E',
        copper: {
          DEFAULT: '#B9825A',
          soft: '#D9B291',
          deep: '#8E5F3C'
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace']
      },
      fontSize: {
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
        display: ['clamp(2.75rem, 7vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.01em' }],
        headline: ['clamp(1.875rem, 3.5vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }]
      },
      maxWidth: {
        shell: '78rem',
        prose: '38rem'
      },
      borderRadius: {
        none: '0',
        sm: '2px'
      },
      transitionTimingFunction: {
        stem: 'cubic-bezier(0.2, 0.7, 0.2, 1)'
      },
      keyframes: {
        stem: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' }
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(0.75rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        stem: 'stem 900ms cubic-bezier(0.2, 0.7, 0.2, 1) both',
        rise: 'rise 700ms cubic-bezier(0.2, 0.7, 0.2, 1) both'
      }
    }
  },
  plugins: []
};

export default config;
