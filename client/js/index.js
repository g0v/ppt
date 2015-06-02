// Trigger CSS compilation & CSS text extraction.
require('../semantic-ui/dist/semantic.css');
require('../styl/index.styl');
require('jquery');
require('../semantic-ui/dist/semantic.js');

window.myDebug = require('debug'); // debug browser support

var React = require('react'),
    injectTapEventPlugin = require("react-tap-event-plugin"),
    fluxibleApp = require('../../common/fluxibleApp');

const bootstrapDebug = myDebug('ppt:clientBootstrap');
const dehydratedState = window.App;

//Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

// Read hash and asset host from the server and initialize client-side React app
//

// `App` is setted by isomorphic-app middleware
fluxibleApp.rehydrate(dehydratedState, (err, context) => {
  if (err) {
        throw err;
    }
  window.context = context;
  const mountNode = document.getElementById('app');

  bootstrapDebug('React Rendering');
  React.render(context.createElement(), mountNode, () => {
      bootstrapDebug('React Rendered');
  });
});
