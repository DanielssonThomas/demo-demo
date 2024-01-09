/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        "light-bg": "#F8F8F8",
        "dark-bg": "#1C1C1C",
        "light-text": "#F8F8F8",
        "btn-green": "#8CCA09",
        "light-green": "#6FA105",
        "btn-blue": "#3B81F6",
        "btn-red": "#DC4809",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
