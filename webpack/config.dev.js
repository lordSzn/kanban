const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')
const config = require('./constants')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  mode: 'development',
  output: {
    publicPath: '/',
    filename: config.outputDev.js,
    path: config.build,
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    hot: true,
    port: 8000,
    historyApiFallback: true,
  },
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: process.env.NODE_ENV !== 'production',
            },
          },
        ],
      },
    ],
  },
}
