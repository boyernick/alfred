/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        serif: ["'Harvey Serif'", "serif"],
      },
      colors: {
        background: "hsl(var(--alfred-bg-raw))",
        foreground: "hsl(var(--alfred-text-raw))",
        card: {
          DEFAULT: "hsl(var(--alfred-surface-raw))",
          foreground: "hsl(var(--alfred-text-raw))",
        },
        border: "hsl(var(--alfred-border-raw))",
        ring: "hsl(var(--alfred-accent-raw))",
        primary: {
          DEFAULT: "hsl(var(--alfred-accent-raw))",
          foreground: "hsl(var(--alfred-bg-raw))",
        },
        muted: {
          DEFAULT: "hsl(var(--alfred-surface-raw))",
          foreground: "hsl(var(--alfred-text-dim-raw))",
        },
        input: "hsl(var(--alfred-border-raw))",
        accent: {
          DEFAULT: "hsl(var(--alfred-surface-raw))",
          foreground: "hsl(var(--alfred-text-raw))",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(0 0% 98%)",
        },
        popover: {
          DEFAULT: "hsl(var(--alfred-surface-raw))",
          foreground: "hsl(var(--alfred-text-raw))",
        },
        secondary: {
          DEFAULT: "hsl(var(--alfred-surface-raw))",
          foreground: "hsl(var(--alfred-text-raw))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
