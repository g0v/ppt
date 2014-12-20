var loopback = require('loopback'),
    boot = require('loopback-boot'),
    app = module.exports = loopback();

// Webpack development middleware.
// Hot module replacement is NOT enabled. (I think it's not needed)
//
if(process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require("webpack-dev-middleware"),
      webpackCfg = require("../client/config/webpack"),
      webpack = require("webpack");
  webpackCfg.output.path = '/';
  app.use(webpackDevMiddleware(webpack(webpackCfg), {publicPath: "/"}));
}

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts./
//
// Middlewares should go to middleware.json.
// Docs: https://gist.github.com/bajtos/e7eaba736ff096916b71
//
boot(app, __dirname);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
