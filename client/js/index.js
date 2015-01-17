// Trigger CSS compilation & CSS text extraction.
require('../styl/index.styl');

var React = require('react'),
    App = require('../../common/views/app.jsx');

console.log('Yooo!');

if(typeof window !== 'undefined'){
  // Read hash from the server and initialize client-side React app

  React.render(React.createElement(App, {
    hash: document.querySelector('meta[name="webpack-hash"]').content
  }), document);
}
