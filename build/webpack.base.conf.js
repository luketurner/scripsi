var path = require('path')

module.exports = {
  cache: true,
  entry: './src/main.tsx',
  output: {
    path: path.resolve('../dist'),
    publicPath: '',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.json']        
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'awesome-typescript', exclude: /node_modules/ },
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },

      // Images, fonts, etc.
      { test: /\.(png|jpe?g|gif|svg)$/,  
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      },
      { test: /\.(ttf|eot|svg|woff|otf)(\?.+)?$/, loader: 'file' }
    ]
  },
  node: {
    fs: "empty"
  }
}