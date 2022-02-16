const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html', inject: 'body' }),
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
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
