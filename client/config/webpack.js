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
    path: (isProduction ? '../client/' : __dirname + '/../') + 'build',
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

// Extra plugin definitions

// Watch files that is not required with webpack
// https://github.com/webpack/webpack-dev-server/issues/34
//
function WatchExternalFilesPlugin() {}
WatchExternalFilesPlugin.prototype.apply = function(compiler) {
  compiler.plugin("after-compile", function(compilation, callback) {
    compilation.fileDependencies.push("./client/build/index.html");
    callback();
  });
};


// Other env-based configs
//
if( isProduction ){
  webpackCfg.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false
  }));
}else{
  webpackCfg.plugins.push(new WatchExternalFilesPlugin());
  webpackCfg.devtool = '#source-map'
}

module.exports = webpackCfg;
