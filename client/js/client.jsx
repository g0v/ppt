require('babel-core/polyfill');

// Trigger CSS compilation & CSS text extraction.
//
require('../styl/client.styl');

// debug browser support
//
window.myDebug = require('debug');

import React from 'react';
import {Provider} from 'react-redux';
import AppRouter from '../../common/views/AppRouter.jsx';
import {history} from 'react-router/lib/BrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from '../../common/store/configureStore';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
//
injectTapEventPlugin();
const store = configureStore(window.__dehydrated);
const childrenRoutes = require('../../common/routes')(store);

React.render((
  <Provider store={store}>
    {() => <AppRouter history={history} children={childrenRoutes}/>}
  </Provider>
), document.getElementById('react-root'));
