var React = require('react'),
    Router = require('react-router'),
    serialize = require('serialize-javascript'),
    debug = require('debug')('ppt:IsomorphicApp'),

    fluxibleApp = require('../../common/fluxibleApp'),
    navigateAction = require('fluxible-router').navigateAction,
    HtmlComponent = React.createFactory(require('../../common/views/Html.jsx')),

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

      debug('Middleware catched route', req.path);

      debug('Executing navigate action');
      fluxibleContext.executeAction(navigateAction, {url: req.url}, (err) => {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }

        debug('Exposing context state');
        var exposed = 'window.App=' + serialize(fluxibleApp.dehydrate(fluxibleContext)) + ';';

        debug('Rendering Application component into html');
        var Component = fluxibleApp.getComponent();

        var html = React.renderToStaticMarkup(HtmlComponent({
            hash,
            state: exposed,
            markup: React.renderToString(fluxibleContext.createElement()),
            context: fluxibleContext.getComponentContext()
        }));

        debug('Sending markup');
        res.send(html);
      });
  };
}
