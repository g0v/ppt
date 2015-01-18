// Trigger CSS compilation & CSS text extraction.
require('../semantic-ui/dist/semantic.css');
require('../styl/index.styl');
require('../semantic-ui/dist/semantic.js');

var React = require('react'),
    App = require('../../common/views/app.jsx');

var $ = require('jquery');
console.log('Yooo!', $);

// Read hash and asset host from the server and initialize client-side React app
//
React.render(React.createElement(App, {
  hash: document.querySelector('meta[name="webpack-hash"]').content,
  assetHost: document.querySelector('meta[name="webpack-asset-host"]').content
}), document);
