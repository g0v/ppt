var assign = require('object-assign'),
    debug = require('debug')('ppt:RouteStore'),
    createStore = require('fluxible/addons/createStore');

module.exports = createStore({
  storeName: 'RouteStore',

  initialize() {
    this.lastState = null
    this.currentState = null
  },

  handlers: {
    'ROUTE_CHANGE': function(payload){
      this._setCurrentState(payload.to);
    }
  },

  _setCurrentState(toState) {
    debug('setCurrentState', toState);
    this.lastState = this.currentState;
    this.currentState = toState;

    this.emitChange();
  }
});
