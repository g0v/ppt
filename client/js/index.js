// Trigger CSS compilation & CSS text extraction.
require('../semantic-ui/dist/semantic.css');
require('../styl/index.styl');
require('jquery');
require('../semantic-ui/dist/semantic.js');

var React = require('react'),
    Router = require('react-router'),
    route = require('../../common/views/Route.jsx'),
    fluxibleApp = require('../../common/fluxibleApp'),
    routeAction = require('../../common/actions/routeAction'),

    isInitialRender = true;

// Read hash and asset host from the server and initialize client-side React app
//

// `App` is setted by isomorphic-app middleware
fluxibleApp.rehydrate(window.App, (err, fluxibleContext) => {
  Router.run(route, Router.HistoryLocation, function(Handler, state){
    // Handler should be the React class App.

    if(isInitialRender){
      // All stores should be populated by rehydration.
      // Just set route (not serialized) and render.
      //
      fluxibleContext.executeAction( routeAction.setRouteStore, state, render );
      isInitialRender = false;

    }else{
      // Triggers changeTo action and then calls render.
      fluxibleContext.executeAction( routeAction.changeTo, state, render );
    }

    function render(){
      React.render(React.createElement(Handler, {
        hash: document.querySelector('meta[name="webpack-hash"]').content,
        assetHost: document.querySelector('meta[name="webpack-asset-host"]').content,
        context: fluxibleContext.getComponentContext()
      }), document);
    }
  });
});
