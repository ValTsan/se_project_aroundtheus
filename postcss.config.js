const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  plugins: [
    require("postcss-import"),
    autoprefixer({
      overrideBrowserslist: ["last 2 versions", "not dead", "> 0.2%"],
    }),
    cssnano({ preset: "default" }),
  ],
};
