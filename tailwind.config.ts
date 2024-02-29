import { nextui } from "@nextui-org/react";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

const config: Config = {
  content: [
    "./src/pages/**/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/editor/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        brand: ["var(--font-brand), serif"],
      },
      gridTemplateColumns: {
        "20": "repeat(20, minmax(0, 1fr))",
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      screens: {
        xs: "420px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: "#fff",
        offWhite: "#f9fafb",
        gr: "#f3f4f6",
        gt: "#d6d6d6",
        dark: {
          100: "#101010",
          200: "#111827",
          400: "#2b2b2b",
          1000: "#00000",
        },
      },
      typography: ({ theme }: any) => ({
        DEFAULT: {
          css: {
            "--tw-prose-bullets": theme("colors.pink.500"),
            li: {
              p: {
                margin: "0",
              },
            },
            pre: {
              backgroundColor: "rgba(0,0,0,0.1)",
              fontFamily: "JetBrains Mono, Fira Code, monospace",
              color: "#1f2937",
            },
            p: {
              code: {
                fontFamily: "JetBrains Mono, Fira Code, monospace",
                backgroundColor: "rgba(0,0,0,0.1)",
                color: "#1f2937",
                borderRadius: "0.25rem",
                padding: "0.25rem",
                "&::before": {
                  content: "none",
                },
                "&::after": {
                  content: "none",
                },
              },
            },
          },
        },
      }),
    },
  },
  darkMode: "class",
  plugins: [nextui(), typography, addVariablesForColors],
};
export default config;
