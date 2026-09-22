import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ground: {
          950: "#050507",
          900: "#09090d",
          850: "#0e0e14",
          800: "#13131c",
          750: "#181824",
          700: "#222233",
          600: "#323249",
          500: "#4e4e6b",
          400: "#7c7c9e",
          300: "#a9a9c2",
          200: "#d4d4e3",
          100: "#f0f0f7",
        },
        violet: {
          glow: "#8b5cf6",
          dark: "#5b21b6",
        },
        accent: {
          blue: "#3b82f6",
          violet: "#8b5cf6",
          emerald: "#10b981",
          amber: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "subtle-card": "0 0 0 1px rgba(255, 255, 255, 0.06), 0 8px 24px -4px rgba(0, 0, 0, 0.5)",
        "glow-violet": "0 0 35px -5px rgba(139, 92, 246, 0.25)",
        "glow-subtle": "0 0 25px -5px rgba(255, 255, 255, 0.08)",
      },
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
