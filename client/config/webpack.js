var webpack = require('webpack'),
    ExtractText = require('extract-text-webpack-plugin');

var isProduction = process.env.NODE_ENV === 'production';

// Base config
//
var webpackCfg = {
  entry: {
    'index': './client/js/index.js',
  },
  output: {
    // __dirname is the path of webpack.js
    path: __dirname + '/../build',
    filename: ( isProduction ? '[hash].js' : 'index.js')
  },
  module: {
    loaders: [
      {
        test: /\.styl$/,
        loader: ExtractText.extract("css?sourceMap!stylus")
      },{
        test: /\.(?:jpg)|(?:png)$/, loader: "file-loader"
      }
    ],
  },
  plugins: [
    new ExtractText( isProduction ? "[hash].css" : "index.css" )
  ],
  debug: !isProduction
};

// Other env-based configs
//
if( isProduction ){
  webpackCfg.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false
  }));
}else{
  webpackCfg.devtool = '#source-map'
}

module.exports = webpackCfg;
