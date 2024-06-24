// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import * as animate from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./src/**/*.tsx"],
  presets: [
    {
      darkMode: ["class"],
      theme: {
        container: {
          center: true,
          padding: "2rem",
          screens: {
            "2xl": "1400px",
          },
        },
        extend: {
          colors: {
            black: "#010006",
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
              DEFAULT: "hsl(var(--primary))",
              foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
              DEFAULT: "hsl(var(--secondary))",
              foreground: "hsl(var(--secondary-foreground))",
            },
            destructive: {
              DEFAULT: "hsl(var(--destructive))",
              foreground: "hsl(var(--destructive-foreground))",
            },
            muted: {
              DEFAULT: "hsl(var(--muted))",
              foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
              DEFAULT: "hsl(var(--accent))",
              foreground: "hsl(var(--accent-foreground))",
            },
            popover: {
              DEFAULT: "hsl(var(--popover))",
              foreground: "hsl(var(--popover-foreground))",
            },
            card: {
              DEFAULT: "hsl(var(--card))",
              foreground: "hsl(var(--card-foreground))",
            },
          },
          borderRadius: {
            lg: `var(--radius)`,
            md: `calc(var(--radius) - 2px)`,
            sm: "calc(var(--radius) - 4px)",
          },
          fontFamily: {
            sans: ["var(--font-sans)", ...fontFamily.sans],
            koulen: ["var(--font-koulen)", ...fontFamily.sans],
            inter: ["var(--font-inter)", ...fontFamily.sans],
            mono: ["var(--font-mona-sans)", ...fontFamily.mono],
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
            flip: {
              "0%, 100%": { transform: "rotate(0deg)" },
              "50%": { transform: "rotate(180deg)" },
            },
            spinhorizon: {
              // '0%': { transform: 'rotateY(0deg)' },
              "100%": { transform: "rotateY(360deg)" },
            },
          },
          animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
            "test-flip": "flip 0.5s ease-in-out infinite",
            spinhorizon: "spinhorizon 1s linear  infinite",
          },
        },
      },
      plugins: [animate],
    },
  ],
};

export default config;
