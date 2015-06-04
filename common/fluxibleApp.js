// Fluxible app instance

import Fluxible from 'fluxible';

module.exports = new Fluxible({
  component: require('./views/App.jsx'),
  stores: [
    require('./stores/RouteStore'),
    require('./stores/MetaStore')
  ]
});
