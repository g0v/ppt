require('node-jsx').install({extension: '.jsx'});

var React = require('react'),
    App = require('../../common/views/app.jsx'),
    isProduction = process.env.NODE_ENV === 'production';

module.exports = function(options) {
  var hash;
  if(!isProduction) {
    hash = 'index';
  } else {
    hash = require('../../tmp/webpack-stats.json').hash;
  }

  return function IsomorphicApp(req, res, next) {
    var app = React.createElement(App, {
      hash: hash
    });
    res.send('<!DOCTYPE html>' + React.renderToString(app));
  };
}
