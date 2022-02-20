const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./constants')

module.exports = {
  context: config.context,
  entry: config.entryMain,
  resolve: {
    extensions: config.extensions,
    alias: {
      '~': config.src,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: config.indexHTML,
      inject: 'body',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: '@linaria/webpack-loader',
          },
        ],
      },
    ],
  },
}
