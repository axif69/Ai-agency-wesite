module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        syne: ['var(--font-syne)', 'sans-serif'],
        space: ['var(--font-space-grotesk)', 'sans-serif'],
      }
    }
  },
  plugins: []
};
