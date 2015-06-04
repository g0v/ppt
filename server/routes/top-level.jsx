var express = require('express'),
    debug = require('debug')('ppt:topLevel'),
    router = express.Router(),
    serialize = require('serialize-javascript'),
    React = require('react'),
    Transmit = require('react-transmit'),
    fluxibleApp = require('../../common/fluxibleApp'),
    App = require('../../common/views/App.jsx');

import {navigateAction} from 'fluxible-router';

var HASH;
if(process.env.NODE_ENV !== 'production') {
  HASH = 'index';
} else {
  HASH = require('../../tmp/webpack-stats.json').hash;
}

router.get('*', async function(req, res, next) {
  var context = fluxibleApp.createContext(),
      componentContext = context.getComponentContext(),
      app, meta;

  debug('Middleware catched route', req.url);

  // Populate fluxible-router stores
  // Ref: https://github.com/yahoo/fluxible-router/blob/master/docs/quick-start.md#call-the-navigate-action
  //
  try {
    await context.executeAction(navigateAction, {
      url: req.url
    });
  } catch (err) {
    if(err.statusCode && err.statusCode === 404){
      next();
    } else {
      next(err);
    }
    return;
  }

  meta = componentContext.getStore('MetaStore').getState();
  debug('Meta store', meta);

  // Note: although fluxibleContext has "createElement()" method that generates
  // <App /> and injects context for us, but Transmit.renderToString requires a
  // React *class*, not a React *element*. Thus fluxibleContext.createElement()
  // can't be used here.
  //
  var {reactString, reactData} = await Transmit.renderToString(App, {context: componentContext}),

      // Transmit.injectIntoMarkup: serializes reactData and add <script> tag.
      //
      html = Transmit.injectIntoMarkup(`<div id="react-root">${reactString}</div>`, reactData),

      // serialize-javascript is the serialization technique used in
      // express-state. Instead of polluting express app with express-state, we
      // use serialize-javascript directly, which is much more concise and
      // trackable.
      //
      fluxibleDataStr = serialize(context.dehydrate());

  // renders index.jade
  //
  res.render('index', {
    meta, html, fluxibleDataStr, hash: HASH
  });
});

module.exports = router;
