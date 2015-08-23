var webpack = require('webpack'),
    ExtractText = require('extract-text-webpack-plugin'),
    packageJson = require('../../package.json');

var isProduction = process.env.NODE_ENV === 'production';

// Base config
//
var webpackCfg = {
  entry: {
    'client': './client/js/client.jsx',
  },
  output: {
    // __dirname is the path of webpack.js
    path: __dirname + '/../build',
    filename: ( isProduction ? '[hash].js' : 'client.js')
  },
  module: {
    loaders: [
      {
        test: /\.styl$/,
        loader: ExtractText.extract("css?sourceMap!stylus")
      },
      {
        test: /\.(?:jpg|png|gif|eot|svg|ttf|woff|otf)$/,
        loader: "url-loader?limit=10000"
      },
      {
        test: /\.jsx$/, loader: "babel-loader"
      },
      {
        test: /common\/.+\.js$/, loader: 'babel-loader'
      },
      {
        test: /client\/js\/.+\.js$/, loader: 'babel-loader', exclude: /node_modules/
      }
    ]
  },
  stylus: {
    use: [(require('nib'))()]
  },
  plugins: [
    new ExtractText( isProduction ? "[hash].css" : "client.css" ),
    new webpack.DefinePlugin({
      'process.env': {
        IS_BROWSER: JSON.stringify(true),
        __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production')
      }
    })
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
  webpackCfg.entry.client = [
    // Instruct socket.io in weboack-dev-server to connect to hostname-agnostic '/'
    'webpack-dev-server/client?/',
    'webpack/hot/dev-server',
    webpackCfg.entry.client
  ];

  webpackCfg.devServer = {
    host: '0.0.0.0',
    port: packageJson.config.webpackDevServerPort,
    proxy: {
      "*": "http://127.0.0.1:" + packageJson.config.apiServerPort
    },
    hot: true,
    watchDelay: 2000 // Wait until nodemon restarts
  };

  webpackCfg.plugins.push(new webpack.HotModuleReplacementPlugin());
  webpackCfg.output.publicPath = '/build/'
}

module.exports = webpackCfg;
