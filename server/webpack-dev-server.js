// Webpack development server with hot module replacement enabled
// Ref: http://webpack.github.io/docs/webpack-dev-server.html#combining-with-an-existing-server
//
if(process.env.NODE_ENV !== 'production') {
  var WebpackDevServer = require("webpack-dev-server"),
      webpackCfg = require("../client/config/webpack"),
      webpack = require("webpack");
  (new WebpackDevServer(webpack(webpackCfg), {
    publicPath: "/build/",
    contentBase: __dirname + '/../client/',
    hot: true,
    watchDelay: 2000, // Wait for nodemon to restart server
    headers: {
      // http://gaearon.github.io/react-hot-loader/#porting-your-project-to-webpack
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  })).listen(9527, '0.0.0.0', function(){
    console.log('Webpack-dev-server listening at http://0.0.0.0:9527');
  });
}
