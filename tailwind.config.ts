import type { Config } from "tailwindcss";

/**
 * Stitch In Time brand system — quiet-luxury tailoring atelier.
 * Palette and typography per approved brand guidelines.
 */
const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        // Brand palette (CSS variables defined in globals.css)
        cream: "hsl(var(--cream))", // #e8e2d8 — base canvas
        taupe: "hsl(var(--taupe))", // #cbbeae — muted panels
        espresso: "hsl(var(--espresso))", // #4a3428 — dark sections
        burgundy: "hsl(var(--burgundy))", // #6b1f2a — signature accent
        sky: "hsl(var(--sky))", // #97b3c8 — cool accent (sparing)
        ink: "hsl(var(--ink))", // #2b2b2b — body text

        // Semantic tokens (shadcn-style)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      fontFamily: {
        // Headings — Cormorant Garamond Light (300), italic for accent words.
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        // Body / UI — Avenir Book.
        sans: ["var(--font-body)", "Avenir", "Helvetica Neue", "system-ui", "sans-serif"],
        // Eyebrow / subheader labels — Avenir Black (used ALL CAPS).
        subheader: ["var(--font-subheader)", "Avenir", "Helvetica Neue", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      letterSpacing: {
        luxe: "0.22em",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.25s ease-out",
        "accordion-up": "accordion-up 0.25s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
