const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ENTRY_PATH = './app/frontend/assets/js/';


module.exports = {
  mode: 'production',
  context: __dirname,
  entry: {
    main: [`${ENTRY_PATH}/index`],
  },
  output: {
      path: path.resolve('./app/frontend/static/app/assets/bundles/'),
      publicPath: '/static/assets/bundles/',
      filename: "[name].js",
      libraryTarget: "global"
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env']
        }
      }
    ],
  },
  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ]
}
