import type { Config } from "tailwindcss";

/**
 * Stitch In Time brand system — from the approved brandbook.
 * Ivory #FFFEFA · Cream #F5F1E9 · Espresso #433633 · Burgundy #561B26 ·
 * Sky Blue #9DB4CE · Ink #1E1E1E. (Channels live in globals.css.)
 */
const rgb = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2.5rem" },
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        ivory: rgb("ivory"),
        cream: rgb("cream"),
        espresso: rgb("espresso"),
        burgundy: rgb("burgundy"),
        sky: rgb("sky"),
        ink: rgb("ink"),
        // semantic aliases used by the UI primitives
        background: rgb("ivory"),
        foreground: rgb("ink"),
        border: "rgb(var(--burgundy) / 0.16)",
        ring: rgb("burgundy"),
        primary: { DEFAULT: rgb("burgundy"), foreground: rgb("ivory") },
        muted: { DEFAULT: rgb("cream"), foreground: "rgb(var(--espresso) / 0.78)" },
      },
      fontFamily: {
        // Headers — Cormorant Garamond Regular (400) + Italic.
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        // Body — Avenir Roman.
        sans: ["var(--font-body)", "Avenir", "Helvetica Neue", "system-ui", "sans-serif"],
        // Subheaders / eyebrows / buttons — Avenir Heavy, ALL CAPS.
        subheader: ["var(--font-subheader)", "Avenir", "Helvetica Neue", "sans-serif"],
      },
      letterSpacing: { luxe: "0.22em", wide2: "0.14em" },
      borderRadius: { lg: "0.5rem", md: "0.375rem", sm: "0.25rem" },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
        curtain: "cubic-bezier(0.76, 0, 0.24, 1)",
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
        marquee: {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s cubic-bezier(0.22,1,0.36,1)",
        "accordion-up": "accordion-up 0.25s cubic-bezier(0.22,1,0.36,1)",
        marquee: "marquee 38s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
