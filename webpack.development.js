const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: ['babel-polyfill', path.join(__dirname, 'src/index.jsx')],
  },
  devServer: {
    contentBase: path.join(__dirname, 'src/public'),
    historyApiFallback: true,
    disableHostCheck: true,
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8000,
  },
  output: {
    path: path.resolve('build'),
    filename: '[name].[hash:8].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
      filename: 'index.html',
    }),
    new ExtractTextPlugin('[name].[hash:8].css'),
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: [
            'react',
            ['env', { targets: { browsers: ['last 2 versions'] }, modules: false }],
            'stage-2',
          ],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },
    ]
  }
}
