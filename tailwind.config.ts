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
          bg: "#6288A6",       // Primary steel blue background
          dark: "#0B1C2D",     // Primary dark / Logo outline
          text: "#071521",     // Primary text
          cream: "#F3EBDD",    // Cream / Sun
          light: "#9DB9D0",    // Light blue landscape
          mid: "#668BAA",      // Mid blue landscape
          deep: "#315574",     // Dark blue landscape
          navy: "#19334B",     // Deep blue valley
          surface: "rgba(11, 28, 45, 0.18)",
          card: "rgba(255, 255, 255, 0.12)",
          cardDark: "rgba(11, 28, 45, 0.45)",
          border: "rgba(11, 28, 45, 0.15)",
          borderLight: "rgba(243, 235, 221, 0.22)",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        brand: "0.28em",
      },
      boxShadow: {
        "ground-card": "0 4px 20px -2px rgba(11, 28, 45, 0.15), 0 0 0 1px rgba(11, 28, 45, 0.1)",
        "ground-card-dark": "0 8px 30px -4px rgba(7, 21, 33, 0.35), 0 0 0 1px rgba(243, 235, 221, 0.1)",
        "ground-hover": "0 8px 25px -4px rgba(11, 28, 45, 0.25), 0 0 0 1px rgba(243, 235, 221, 0.3)",
        "ground-sun": "0 0 20px rgba(243, 235, 221, 0.4)",
      },
    },
  },
  plugins: [],
} satisfies Config;
