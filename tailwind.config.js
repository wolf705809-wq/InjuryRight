/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        gray: {
          50:  '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        primary: {
          DEFAULT: '#059669',
          light:   '#d1fae5',
          dark:    '#065f46',
        },
        ink:       '#111827',
        ink2:      '#374151',
        ink3:      '#6b7280',
        ink4:      '#9ca3af',
        em:        '#059669',
        'em-light':'#ecfdf5',
        'em-mid':  '#10b981',
        'em-dark': '#065f46',
        warm:      '#fafaf9',
        dark:      '#0f1623',
        'dark-2':  '#1a2235',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
