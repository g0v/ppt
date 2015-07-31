// Trigger CSS compilation & CSS text extraction.
//
require('../styl/client.styl');
require('../css/index.css');

// debug browser support
//
window.myDebug = require('debug');

var React = require('react'),
    Transmit = require('react-transmit'),
    injectTapEventPlugin = require('react-tap-event-plugin'),
    fluxibleApp = require('../../common/fluxibleApp'),
    App = require('../../common/views/App.jsx');

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
//
injectTapEventPlugin();

fluxibleApp.rehydrate(window.__dehydrated, (err, context) => {
  if (err) {
    throw err;
  }

  // Note: although fluxibleContext has "createElement()" method that generates
  // <App /> and injects context for us, but Transmit.renderToString requires a
  // React *class*, not a React *element*. Thus fluxibleContext.createElement()
  // can't be used here.
  //
  Transmit.render(App, {
    context: context.getComponentContext()
  }, document.getElementById('react-root'));
});
