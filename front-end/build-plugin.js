exports.default = {
  pre: function () {
  },
  config: function (cfg) {
    // Override Angular's internal configuration of Terser to preserve class names.
    // This won't work if you build multiple (differential) client bundles, so make sure you only target es5 builds in tsconfig.json.
    // See https://github.com/just-jeb/angular-builders/issues/144#issuecomment-576424615
    cfg.optimization.minimizer.forEach(function (it) {
      if (it.constructor.name === 'TerserPlugin') {
        it.options.terserOptions["keep_fnames"] = true;
        it.options.terserOptions["keep_classnames"] = true;
    } else if (it.constructor.name === 'JavaScriptOptimizerPlugin') {
        it.options.keepNames = true;
    }
    });
    return cfg;
  },
  post: function () {
  }
};
