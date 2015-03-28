// Fluxible app instance

var Fluxible = require('fluxible');

var fluxibleApp = new Fluxible();

fluxibleApp.registerStore(require('./stores/MetaStore'));
fluxibleApp.registerStore(require('./stores/RouteStore'));
fluxibleApp.registerStore(require('./stores/PromiseDetailStore'));
fluxibleApp.registerStore(require('./stores/GovernerStore'));

module.exports = fluxibleApp;
