// Fluxible app instance

import Fluxible from 'fluxible';
import App from './views/App.jsx';
import MetaStore from './stores/MetaStore';
import RouteStore from './stores/RouteStore';

let fluxibleApp = new Fluxible({
    component: App,
    stores: [
        RouteStore,
        MetaStore
    ]
});

module.exports = fluxibleApp;
