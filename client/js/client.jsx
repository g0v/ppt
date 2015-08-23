require('babel-core/polyfill');

// Trigger CSS compilation & CSS text extraction.
//
require('../styl/client.styl');

// debug browser support
//
window.myDebug = require('debug');

import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import {history} from 'react-router/lib/BrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from '../../common/redux/configureStore';

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
    {() => <Router history={history} children={childrenRoutes}/>}
  </Provider>
), document.getElementById('root'));
