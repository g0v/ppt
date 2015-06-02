// Fluxible app instance

import Fluxible from 'fluxible';
import App from './views/App.jsx';
import MetaStore from './stores/MetaStore';
import RouteStore from './stores/RouteStore';
import Resolver from './utils/resolver';

class Flux extends Fluxible {
  constructor() {
    super({
      component: App,
      stores: [
          RouteStore,
          MetaStore
      ]
    });
  }

  // Arguments the context instance with Resolver's methods.
  // Ref: https://github.com/iam4x/isomorphic-flux-boilerplate/blob/master/app/utils/flux.js
  //
  createContext() {
    var context = super.createContext(),
        resolver = new Resolver;
    context.resolve = promise => resolver.resolve(promise);
    context.renderToString = (...args) => resolver.renderToString(...args);

    return context;
  }
}

module.exports = new Flux();
