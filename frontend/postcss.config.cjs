// postcss.config.cjs
module.exports = {
  plugins: {
    // use the new PostCSS adapter for Tailwind
    '@tailwindcss/postcss': {},
    // autoprefixer remains
    autoprefixer: {},
  },
};
