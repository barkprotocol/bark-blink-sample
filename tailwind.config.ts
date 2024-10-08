import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // Enable dark mode with the 'class' strategy
  content: [
    './pages/**/*.{ts,tsx}',  // Paths to your page files
    './components/**/*.{ts,tsx}', // Paths to your component files
    './app/**/*.{ts,tsx}',    // Paths to your app files
    './src/**/*.{ts,tsx}',    // Paths to your src files
  ],
  prefix: "", // Optional: Prefix for all Tailwind utility classes
  theme: {
    container: {
      center: true, // Center the container
      padding: "2rem", // Default padding
      screens: {
        "2xl": "1400px", // Custom screen size for 2xl breakpoint
      },
    },
    extend: {
      colors: {
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
        sand: '#D0BFB4', // Custom sand color
      },
      borderRadius: {
        lg: "var(--radius)", // Large border radius
        md: "calc(var(--radius) - 2px)", // Medium border radius
        sm: "calc(var(--radius) - 4px)", // Small border radius
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Default sans-serif font
        display: ['Syne', 'sans-serif'], // Display font
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // Plugin for animations
    // Add other plugins if needed
  ],
};

export default config;
