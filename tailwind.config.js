/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F493A9',
        secondary: '#29AFE3',
        accent: '#29AFE3',
        success: '#98D8C8',
        warning: '#F7DC6F',
        background: '#F9F0D9',
        surface: '#FFFFFF',
        text: '#2D2D2D',
        'text-light': '#8A8A8A',
        border: '#E8E8E8',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Custom font sizes (optional - you can add your own)
        // 'custom-sm': '0.75rem',
        // 'custom-lg': '1.25rem',
        // etc.
      },
    },
  },
  plugins: [],
}
