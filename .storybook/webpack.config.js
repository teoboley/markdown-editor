const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (baseConfig, env, config) => {
  addTypescriptSupport(config);

  return config;
};

function addTypescriptSupport(config) {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("ts-loader"),
    options: {
      transpileOnly: true
    }
  });
  config.plugins.push(new ForkTsCheckerWebpackPlugin({
      async: false
  }));
  config.resolve.extensions.push(".ts", ".tsx");
}
