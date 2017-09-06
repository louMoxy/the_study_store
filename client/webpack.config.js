const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
        {
            test: /\.ejs$/,
            loader: 'ejs-loader'
        },
        {
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        },
        
        {
            test: /\.(png|jpg|gif|svg)$/,
            use: ['file-loader?limit=8192&name=[name].[ext]']
            // limit=8192 > inline images upt to 8k, otherwise just link
        }
    ]
},
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src',
     proxy: {
        '/api/v1/tree': {
            target: 'http://localhost:3000',
            secure: false,
            pathRewrite: {
                '^/api/v1/tree': '/'
            }
        },
        '/api/v1': {
            target: 'http://localhost:3000',
            secure: false,
            pathRewrite: {
                '^/store': '/api'
            }
        }
    }
  }
};