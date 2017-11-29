var path = require('path')

// var precss = 
// var lost = ;
// var cssnext = ;

module.exports = {
  cache: true,
  entry: [
    './src/main.tsx',
    'webpack-hot-middleware/client?reload=true'
  ],
  output: {
    path: path.resolve('./dist'),
    publicPath: '',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      { test: /\.css$/,  use: [
        'style-loader',
        { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
        { loader: 'postcss-loader',
          options: { 
            parser: require('postcss-scss'), 
            plugins: [
              require('precss')(),
              require('lost')(),
              require('postcss-cssnext')()
            ]
          }
        }
      ]},
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader', exclude: /node_modules/ },
      { enforce: "pre", test: /\.js$/, loader: 'source-map-loader' },
      // Images, fonts, etc.
      { test: /\.(png|jpe?g|gif|svg)$/,  
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      },
      { test: /\.(ttf|eot|svg|woff|otf)(\?.+)?$/, loader: 'file-loader' }
    ]
  }
}