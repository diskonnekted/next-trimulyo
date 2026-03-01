import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Trimulyo New Color Scheme
        "molten-lava": {
          DEFAULT: "#780000",
          100: "#180000",
          200: "#310000",
          300: "#490000",
          400: "#620000",
          500: "#780000",
          600: "#c80000",
          700: "#ff1616",
          800: "#ff6464",
          900: "#ffb1b1",
        },
        "brick-red": {
          DEFAULT: "#c1121f",
          100: "#260406",
          200: "#4d070c",
          300: "#730b12",
          400: "#990e17",
          500: "#c1121f",
          600: "#eb2330",
          700: "#f05a64",
          800: "#f59198",
          900: "#fac8cb",
        },
        "papaya-whip": {
          DEFAULT: "#fdf0d5",
          100: "#593c04",
          200: "#b17908",
          300: "#f5ae22",
          400: "#f9cf7b",
          500: "#fdf0d5",
          600: "#fdf2dc",
          700: "#fef5e5",
          800: "#fef9ed",
          900: "#fffcf6",
        },
        "deep-space-blue": {
          DEFAULT: "#003049",
          100: "#00090e",
          200: "#00131d",
          300: "#001c2b",
          400: "#002539",
          500: "#003049",
          600: "#00679f",
          700: "#00a0f7",
          800: "#50c2ff",
          900: "#a7e0ff",
        },
        "steel-blue": {
          DEFAULT: "#669bbc",
          100: "#122028",
          200: "#233f51",
          300: "#355f79",
          400: "#477fa2",
          500: "#669bbc",
          600: "#85afc9",
          700: "#a4c3d7",
          800: "#c2d7e4",
          900: "#e1ebf2",
        },

        // Mapped Semantic Colors
        primary: {
          DEFAULT: "#003049", // Deep Space Blue
          50: "#a7e0ff", // using 900 from palette
          100: "#50c2ff", // using 800
          200: "#00a0f7", // using 700
          300: "#00679f", // using 600
          400: "#003049", // using 500
          500: "#003049", // using 500
          600: "#002539", // using 400
          700: "#001c2b", // using 300
          800: "#00131d", // using 200
          900: "#00090e", // using 100
          950: "#00090e",
        },
        secondary: {
          DEFAULT: "#c1121f", // Brick Red
          50: "#fac8cb",
          100: "#f59198",
          200: "#f05a64",
          300: "#eb2330",
          400: "#c1121f",
          500: "#c1121f",
          600: "#990e17",
          700: "#730b12",
          800: "#4d070c",
          900: "#260406",
          950: "#260406",
        },
        accent: {
          DEFAULT: "#669bbc", // Steel Blue
          50: "#e1ebf2",
          100: "#c2d7e4",
          200: "#a4c3d7",
          300: "#85afc9",
          400: "#669bbc",
          500: "#669bbc",
          600: "#477fa2",
          700: "#355f79",
          800: "#233f51",
          900: "#122028",
          950: "#122028",
        },
        background: "#f8f9fc", // Dasar halaman bersih - Wordpress background
        surface: "#e6eaf3", // Latar kartu/komponen - Wordpress surface
        "text-dark": "#000000", // Teks utama
        "text-light": "#ffffff", // Teks di atas latar gelap
        "text-light-hover": "#ddf0ff", // Teks hover di atas latar gelap
        success: "#22c55e", // Status sukses
        warning: "#fbbf24", // Peringatan
        danger: "#f87171", // Kesalahan
        info: "#60a5fa", // Informasi
        // Additional village theme colors
        "village-green": {
          DEFAULT: "#39a2cf",
          dark: "#3eafdf",
          darker: "#0a4661",
        },
        "village-blue": "#3eafdf", // Untuk dekorasi (Hero blue)
        // Override default colors for consistency
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
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
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "bounce-gentle": "bounceGentle 1s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
