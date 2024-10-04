const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  plugins: [
    autoprefixer, // Add vendor prefixes automatically
    cssnano({ preset: "default" }), // Minify the CSS
  ],
};
