import type { Config } from 'tailwindcss'

export const finuiPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        'fin-blue': {
          50: '#eef4ff',
          500: '#1a56db',
          700: '#1e3a8a',
          900: '#172554',
        },
        'fin-green': {
          100: '#d1fae5',
          600: '#059669',
          700: '#047857',
        },
        'fin-red': {
          100: '#fee2e2',
          600: '#dc2626',
          700: '#b91c1c',
        },
        'fin-slate': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          700: '#334155',
          900: '#0f172a',
        },
        positive: '#059669',
        negative: '#dc2626',
        neutral: '#64748b',
      },
      spacing: {
        '4xs': '2px',
        '3xs': '4px',
        '2xs': '6px',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
    },
  },
}
