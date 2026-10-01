/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#007AFF",
        secondary: "#F59E0B",
        'background-deep': "#154868",
        'background-mid': "#3B92C5",
        'background-light': "#74C0DC",
        'surface-solid': "#FFFFFF",
        'surface-glass': "rgba(255, 255, 255, 0.65)",
        'surface-glass-dark': "rgba(30, 30, 30, 0.70)",
        'surface-acrylic': "rgba(20, 24, 33, 0.85)",
        'text-primary': "#0F172A",
        'text-secondary': "#64748B",
        'text-dark-primary': "#F8FAFC",
        'text-dark-secondary': "#94A3B8",
        'border-glass': "rgba(255, 255, 255, 0.40)",
        'border-glass-dark': "rgba(255, 255, 255, 0.12)",
        'border-hairline': "rgba(255, 255, 255, 0.25)",
        'traffic-close': "#FF5F56",
        'traffic-close-border': "#E0443E",
        'traffic-minimize': "#FFBD2E",
        'traffic-minimize-border': "#DEA123",
        'traffic-maximize': "#27C93F",
        'traffic-maximize-border': "#1AAB29",
        'accent-blue': "#007AFF",
        'accent-purple': "#AF52DE",
        'accent-pink': "#FF2D55",
        'accent-red': "#FF3B30",
        'accent-orange': "#FF9500",
        'accent-yellow': "#FFCC00",
        'accent-green': "#34C759",
        'accent-graphite': "#8E8E93",
        'app-music': "#FA2D48",
        'app-terminal-bg': "rgba(15, 23, 42, 0.90)",
      },
      borderRadius: {
        'window': '16px',
        'widget': '20px',
      },
      height: {
        'menubar': '28px',
        'dock': '58px',
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "SF Pro Text", "SF Pro Display", "Inter", "sans-serif"],
        display: ["-apple-system", "BlinkMacSystemFont", "SF Pro Display", "Inter", "sans-serif"],
        mono: ["SF Mono", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        'window-inactive': '0 12px 24px -6px rgba(0, 0, 0, 0.15)',
        'window-active': '0 24px 48px -12px rgba(15, 34, 58, 0.25)',
        'dock': '0 20px 40px -10px rgba(0, 0, 0, 0.25)',
        'spotlight': '0 32px 64px -16px rgba(0, 0, 0, 0.35)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
