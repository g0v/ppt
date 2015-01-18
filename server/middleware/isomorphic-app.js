require('node-jsx').install({extension: '.jsx'});

var React = require('react'),
    App = require('../../common/views/app.jsx'),
    isProduction = process.env.NODE_ENV === 'production';

module.exports = function(options) {
  var hash, assetHost;
  if(!isProduction) {
    hash = 'index';
    assetHost = 'http://127.0.0.1:9527/';
  } else {
    hash = require('../../tmp/webpack-stats.json').hash;
    assetHost = '/';
  }

  return function IsomorphicApp(req, res, next) {
    var app = React.createElement(App, {
      hash: hash,
      assetHost: assetHost
    });

    // Accept hot update json files from assetHost.
    // Ref: http://gaearon.github.io/react-hot-loader/#porting-your-project-to-webpack
    //
    if(!isProduction){
      res.header('Access-Control-Allow-Origin', assetHost);
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    }

    res.send('<!DOCTYPE html>' + React.renderToString(app));
  };
}
