const path = require('path');
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
      index: './src/index.tsx',
    },
    mode: "production",
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
            // options: {
            //     transpileOnly: true
            // }
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
            {
              loader: 'url-loader'
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.mjs', '.json', '.js' ]
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'build'),
      library: 'markdownEditor',
      libraryTarget: 'umd'
    },
    plugins: [
      new PeerDepsExternalsPlugin(),
      // new ForkTsCheckerWebpackPlugin()
      // new BundleAnalyzerPlugin()
    ]
};