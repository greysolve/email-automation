/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Primary Colors
          'obsidian-black': '#0E0E10',
          'hot-voltage-pink': '#FF007F',
          'chrome-white': '#F8F8F8',
          
          // Secondary Colors
          'velvet-navy': '#1A1F36',
          'cyber-teal': '#00F0D1',
          'muted-gold': '#D4AF37',
          
          // Accent Colors
          'sunset-inferno': '#FF6A00',
          
          // Semantic mappings for UI
          primary: '#FF007F', // Hot Voltage Pink
          secondary: '#00F0D1', // Cyber Teal
          accent: '#D4AF37', // Muted Gold
          dark: '#0E0E10', // Obsidian Black
          light: '#F8F8F8', // Chrome White
          'dark-secondary': '#1A1F36', // Velvet Navy
        },
        status: {
          success: {
            bg: '#00F0D1',
            text: '#0E0E10',
          },
          warning: {
            bg: '#D4AF37',
            text: '#0E0E10',
          },
          error: {
            bg: '#FF007F',
            text: '#F8F8F8',
          },
        },
      },
      fontFamily: {
        'druk': ['Druk Wide Bold', 'sans-serif'],
        'satoshi': ['Satoshi', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

