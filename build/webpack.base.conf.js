const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  cache: true,
  mode: 'none',
  entry: {
    main: './src/main.tsx',
  },
  output: {
    path: path.resolve('./dist'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },
  devServer: {
    compress: true,
    lazy: false,
  },
  module: {
    rules: [
      { test: /\.css$/,  use: [ 'style-loader', 'css-loader' ]},
      { test: /\.scss$/,  use: [
        'style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        { loader: 'postcss-loader' },
      ]},
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ },
      // Images, fonts, etc.
      { test: /\.(png|jpe?g|gif|svg)$/,  
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      },
      { test: /\.(ttf|eot|svg|woff|otf)(\?.+)?$/, loader: 'file-loader' },
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(['../dist']), TODO -- doesn't work. Move webpack config to base directory?
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    // new HardSourceWebpackPlugin(),
  ]
}