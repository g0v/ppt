var React = require('react'),
    Router = require('react-router'),
    debug = require('debug')('ppt:IsomorphicApp'),

    fluxibleApp = require('../../common/fluxibleApp'),
    routeAction = require('../../common/actions/routeAction'),
    Route = require('../../common/views/Route.jsx'),

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
    // if(!isProduction){
    //   res.header('Access-Control-Allow-Origin', assetHost);
    //   res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    // }
    var fluxibleContext = fluxibleApp.createContext();

    Router.run(Route, req.path, (Handler, state) => {
      // Handler should be the React class App.

      debug('Middleware catched route', req.path);

      // Populate stores by executing routeAction
      //
      fluxibleContext.executeAction(routeAction.changeTo, state, () => {

        debug('routeAction done, rendering');

        var app = React.createElement(Handler, {
          hash, // cache-busting cache
          assetHost,
          context: fluxibleContext.getComponentContext()
        }), dehydrated, html;

        html = React.renderToString(app);
        res.expose(fluxibleApp.dehydrate(fluxibleContext), 'App');
        res.send(`<!doctype html><script>${res.locals.state}</script>${html}`);

      });
    });
  };
}
