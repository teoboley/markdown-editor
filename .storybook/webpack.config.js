const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (baseConfig, env, config) => {
  addTypescriptSupport(config);
  config.plugins.push( new webpack.ProvidePlugin({"React": "react"}));
  
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

// function replaceLoaders(config, newLoaders) {
//   config.module.rules = config.module.rules.reduce((acc, curr) => {
//     const replacement = newLoaders.find(loader => curr.test.toString() === loader.test.toString());
//
//     if (replacement) {
//       return [...acc, replacement];
//     }
//
//     return [...acc, curr];
//   }, [])
// }