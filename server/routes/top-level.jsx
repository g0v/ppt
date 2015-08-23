import express from 'express';
const router = express.Router();

import serialize from 'serialize-javascript';
import React from 'react';
import {Provider} from 'react-redux';
import Router from 'react-router';
import Location from 'react-router/lib/Location';
import thenify from 'thenify';
import configureStore from '../../common/redux/configureStore';

const runRouter = thenify(Router.run);
const debug = require('debug')('ppt:topLevel');

let HASH;
if (process.env.NODE_ENV !== 'production') {
  HASH = 'client';
} else {
  HASH = require('../../tmp/webpack-stats.json').hash;
}

router.get('*', (req, res, next) => {
  // const initialState = {
    // title: '政治承諾追蹤網',
  // };
  const store = configureStore();
  const routes = require('../../common/routes')(store);
  const location = new Location(req.path, req.query);
  const meta = { pageTitle: '政治承諾追蹤網' };

  debug('Middleware catched route', req.url);

  try {
    runRouter(routes, location).then(([routerState, transition]) => {
      if (transition.isCancelled) {
        if (transition.redirectInfo) {
          const pathname = transition.redirectInfo.pathname;
          res.redirect(pathname);
        } else {
          throw new Error(transition.abortReason);
        }
      }
      const markup = React.renderToString(
        <Provider store={store}>
          {() => <Router {...routerState}/>}
        </Provider>
      );

      const dehydratedState = serialize(store.getState());
      const html = `<div id="react-root">${markup}</div>`;
      res.render('index', {
        meta, html, dehydratedState, hash: HASH,
      });
    });
  } catch (err) {
    if (err.statusCode && err.statusCode === 404) {
      next();
    } else {
      next(err);
    }
    return;
  }
});

module.exports = router;
