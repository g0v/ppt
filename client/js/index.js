// Trigger CSS compilation & CSS text extraction.
require('../semantic-ui/dist/semantic.css');
require('../styl/index.styl');
require('jquery');
require('../semantic-ui/dist/semantic.js');

var React = require('react'),
    Router = require('react-router'),
    route = require('../../common/views/route.jsx');

// Read hash and asset host from the server and initialize client-side React app
//

Router.run(route, Router.HistoryLocation, function(Handler, state){
  // Handler should be the React class App.

  React.render(React.createElement(Handler, {
    hash: document.querySelector('meta[name="webpack-hash"]').content,
    assetHost: document.querySelector('meta[name="webpack-asset-host"]').content
  }), document);
});
