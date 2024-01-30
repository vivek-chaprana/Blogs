import { nextui } from "@nextui-org/react";
import typography from "@tailwindcss/typography";
import { before } from "node:test";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/editor/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: "#fff",
        offWhite: "#f9fafb",
        gray: "#f3f4f6",
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
  plugins: [nextui(), typography],
};
export default config;
