var path = require('path')

module.exports = {
    cache: true,
    entry: "./src/main.ts",
    output: {
        path: "../dist",
        publicPath: "",
        filename: "[name].js"
    },
    module: {
        loaders: [
            // CSS/SASS
            { test: /\.css$/,     loader: "style!css!autoprefixer" },
            { test: /\.scss$/,    loader: "style!css!autoprefixer!sass" },
            { test: /\.sass$/,    loader: "style!css!autoprefixer!sass?indentedSyntax" },
            
            // Jade Templates
            { test: /\.jade$/, loader: 'jade' },
            
            // TypeScript
            { test: /\.ts$/, loader: 'awesome-typescript' },
            
            // Images, fonts, etc.
            { test: /\.(png|jpe?g|gif|svg)$/,  
              loader: "url",
              query: {
                limit: 10000,
                name: '[name].[ext]?[hash:7]'
              }
            },
            { test: /\.(ttf|eot|svg|woff)(\?.+)?$/, loader: "file" }
        ]
    },
    plugins: []
}