/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
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
        'pantone': {
          DEFAULT: '#e63946', 100: '#33060a', 200: '#660d14', 300: '#99131e', 400: '#cb1928', 500: '#e63946', 600: '#eb5f6b', 700: '#f08790', 800: '#f5afb5', 900: '#fad7da' 
        }, 
        'honeydew': { 
          DEFAULT: '#f1faee', 100: '#234c16', 200: '#47982c', 300: '#75ce57', 400: '#b4e4a3', 500: '#f1faee', 600: '#f5fbf2', 700: '#f7fcf6', 800: '#fafdf9', 900: '#fcfefc' 
        }, 
        'non_photo_blue': {
          DEFAULT: '#a8dadc', 100: '#163637', 200: '#2c6d6f', 300: '#42a3a6', 400: '#70c3c6', 500: '#a8dadc', 600: '#b9e2e3', 700: '#cae9ea', 800: '#dcf0f1', 900: '#edf8f8' 
        }, 
        'cerulean': { 
          DEFAULT: '#457b9d', 100: '#0e181f', 200: '#1b313e', 300: '#29495e', 400: '#37627d', 500: '#457b9d', 600: '#6097b9', 700: '#88b1cb', 800: '#b0cbdc', 900: '#d7e5ee' 
        }, 
        'berkeley_blue': { 
          DEFAULT: '#1d3557', 100: '#060b12', 200: '#0c1623', 300: '#122035', 400: '#172b46', 500: '#1d3557', 600: '#315a93', 700: '#4e7fc4', 800: '#89aad8', 900: '#c4d4eb' 
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
    },
  },
}