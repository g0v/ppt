var assign = require('object-assign'),
    debug = require('debug')('ppt:routeAction'),
    metaAction = require('./metaAction');

var routeAction = module.exports = {
  setRouteStore: function(actionContext, toState, done){
    // Dispatch route change immediately
    actionContext.dispatch('ROUTE_CHANGE', {
      to: toState
    });
    done();
  },
  changeTo: function(actionContext, toState, done){
    // Executes all active route handlers' `load` static method.
    //
    // refs: https://github.com/ryanflorence/reactconf-2015-HYPE/blob/master/demos/06-itunes-style-interface/app.js
    //
    var promises = toState.routes.filter( (route) => route.handler.load )
                                 .map((route) => route.handler.load(actionContext, toState));

    debug('load() promises', promises);
    // Collect meta setup for all active routes, and then execute the meta actions.
    //
    promises.push(executeMetaActionAsync());
    promises.push(new Promise((resolve) => actionContext.executeAction(routeAction.setRouteStore, toState, resolve)));

    Promise.all(promises).then(done);

    function executeMetaActionAsync(){
      var meta = {};
      toState.routes.forEach(route => assign(meta, route.handler.metaData));
      return new Promise((resolve) => {
        actionContext.executeAction( metaAction.set, meta, resolve );
      });
    }
  }
};
