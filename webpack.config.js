const webpackCopy = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: ["./src/index.js"],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    globalObject: 'this'
  },
  resolve: {
      extensions: ['.js', '.vue'],
      modules: [path.join(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }, {
        test: /\.vue?$/,
        loader: 'vue-loader'
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|eot|wav|mp3)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpackCopy([
      {from: 'stubs/index.html'},
      {from: 'src/__data__/images/avatar.png', to: 'images/avatar.png'},
      {from: 'node_modules/vue/dist/vue.min.js', to: 'extLib/vue.min.js'},
    ])
  ],
  externals: {
    vue: 'Vue'
  }
};
