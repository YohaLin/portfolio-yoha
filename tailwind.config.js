/**
 *  @type {import('tailwindcss').Config}
 *
 */


module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        "sans-tc": ['"Noto Sans TC"', "sans-serif"],
        "serif-tc": ['"Noto Serif TC"', "serif"],
        italiana: ["Italiana", "serif"],
      },
    },
  },
  plugins: [],
};
