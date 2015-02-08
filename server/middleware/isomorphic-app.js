require('node-jsx').install({extension: '.jsx'});

var React = require('react'),
    Router = require('react-router'),
    route = require('../../common/views/route.jsx'),
    isProduction = process.env.NODE_ENV === 'production';

module.exports = function(options) {
  var hash, assetHost;
  if(!isProduction) {
    hash = 'index';
    assetHost = 'http://127.0.0.1:9527/'; // served by webpack-dev-server
  } else {
    hash = require('../../tmp/webpack-stats.json').hash;
    assetHost = '/';
  }

  return function IsomorphicApp(req, res, next) {
    // Accept hot update json files from assetHost.
    // Ref: http://gaearon.github.io/react-hot-loader/#porting-your-project-to-webpack
    //
    if(!isProduction){
      res.header('Access-Control-Allow-Origin', assetHost);
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    }

    Router.run(route, req.path, function(Handler, state){

      // Handler should be the React class App.
      var app = React.createElement(Handler, {
        hash: hash, // cache-busting cache
        assetHost: assetHost
      });
      res.send('<!DOCTYPE html>' + React.renderToString(app));
    });
  };
}
