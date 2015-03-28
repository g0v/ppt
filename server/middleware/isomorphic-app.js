var React = require('react'),
    Router = require('react-router'),
    debug = require('debug')('ppt:IsomorphicApp'),

    fluxibleApp = require('../../common/fluxibleApp'),
    routeAction = require('../../common/actions/routeAction'),
    Route = require('../../common/views/Route.jsx'),

    isProduction = process.env.NODE_ENV === 'production';

module.exports = function(options) {
  var hash;

  if(!isProduction) {
    hash = 'index';
  } else {
    hash = require('../../tmp/webpack-stats.json').hash;
  }

  return function IsomorphicApp(req, res, next) {
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
          context: fluxibleContext.getComponentContext()
        }), dehydrated, html;

        try {
          html = React.renderToString(app);
          res.expose(fluxibleApp.dehydrate(fluxibleContext), 'App');
          res.send(`<!doctype html><script>${res.locals.state}</script>${html}`);
        } catch (e) {
          console.error(e);
          throw e;
        }


      });
    });
  };
}
