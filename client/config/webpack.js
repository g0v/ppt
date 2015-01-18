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
      },
      {
        test: /\.css$/,
        loader: ExtractText.extract("raw")
      },
      {
        test: /\.(?:jpg)|(?:png)|(?:gif)$/, loader: "file-loader"
      },
      {
        test: /\.jsx$/, loader: "jsx-loader"
      }
    ]
  },
  plugins: [
    new ExtractText( isProduction ? "[hash].css" : "index.css" )
  ],
  debug: !isProduction,
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "jQuery"
  }
};

// Other env-based configs
//
if( isProduction ){
  webpackCfg.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false
  }));
}else{
  webpackCfg.devtool = '#source-map';

  // Hot module replacement setup
  // Ref:
  // http://webpack.github.io/docs/webpack-dev-server.html#combining-with-an-existing-server
  // http://gaearon.github.io/react-hot-loader/#enabling-hot-module-replacement
  //
  webpackCfg.entry.index = [
    'webpack-dev-server/client?http://127.0.0.1:9527',
    'webpack/hot/dev-server',
    webpackCfg.entry.index
  ];
  webpackCfg.plugins.push(new webpack.HotModuleReplacementPlugin());
  webpackCfg.output.publicPath = 'http://127.0.0.1:9527/build/'
}

module.exports = webpackCfg;
