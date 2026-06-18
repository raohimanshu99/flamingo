/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fef3ee",
          100: "#fde4d7",
          200: "#fac7ae",
          300: "#f6a07a",
          400: "#f0794a",
          500: "#e85d2a",
          600: "#c2410c",
          700: "#9a3412",
          800: "#7c2d12",
          900: "#642910",
        },
        gold: {
          400: "#e9b872",
          500: "#d99a4e",
          600: "#b87a35",
        },
        surface: {
          950: '#09090b',
          900: '#0f0f12',
          800: '#18181c',
          700: '#232329',
          600: '#2e2e36',
          500: '#52525b',
          400: '#9a9aa2',
          300: '#c4c4cb',
          200: '#e0e0e4',
          100: '#f4f4f5',
        },
      },
      fontFamily: {
        sans: ['"Inter Tight"', "Inter", "system-ui", "sans-serif"],
        display: ["Fraunces", "serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.3s ease forwards",
        shimmer: "shimmer 1.8s infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(24px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        shimmer: {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #9a3412 0%, #c2410c 50%, #f0794a 100%)",
        "gradient-dark": "linear-gradient(135deg, #09090b 0%, #18181c 100%)",
        "gradient-card":
          "linear-gradient(180deg, transparent 40%, rgba(9,9,11,0.95) 100%)",
        "shimmer-dark":
          "linear-gradient(90deg, #18181c 0%, #232329 50%, #18181c 100%)",
      },
      boxShadow: {
        "brand-sm": "0 4px 14px rgba(194,65,12,0.3)",
        "brand-md": "0 8px 30px rgba(194,65,12,0.35)",
        "brand-lg": "0 16px 50px rgba(194,65,12,0.4)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 12px 40px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
