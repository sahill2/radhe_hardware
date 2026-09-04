/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1E8E3E",
          50: "#E8F5E9",
          100: "#C8E6C9",
          200: "#A5D6A7",
          300: "#81C784",
          400: "#66BB6A",
          500: "#1E8E3E",
          600: "#146C2E",
          700: "#0D4A1E",
          800: "#083314",
          900: "#031E0B",
        },
        "shop-violet": "#5433eb",
        "violet-wash": "#c0b5f3",
        "canvas-mist": "#f2f4f5",
        "canvas-warm": "#f9faf8",
        "ink-black": "#000000",
        "charcoal": "#1f2937",
        "muted-gray": "#6b7280",
        "faint-border": "#ebebeb",
      },
      borderRadius: {
        card: "28px",
        inner: "20px",
        pill: "9999px",
      },
      boxShadow: {
        "card-sm": "rgba(0, 0, 0, 0.06) 0px 2px 8px 0px",
        "card-dual": "rgba(0, 0, 0, 0.08) 0px 4px 12px -2px, rgba(0, 0, 0, 0.06) 0px 2px 6px -1px",
        "card-lg": "rgba(0, 0, 0, 0.12) 0px 4px 24px 0px",
        "green-glow": "rgba(30, 142, 62, 0.35) 0px 4px 24px 0px",
        "green-glow-lg": "rgba(30, 142, 62, 0.45) 0px 8px 30px 0px",
        "violet-glow": "rgba(69, 36, 219, 0.34) 0px 4px 24px 0px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-noto-gujarati)", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
