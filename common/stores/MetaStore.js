var createStore = require('fluxible/utils/createStore'),
    debug = require('debug')('MetaStore'),
    assign = require('object-assign');

module.exports = createStore({
  storeName: 'MetaStore',

  initialize() {
    this._setAsDefault();
  },

  handlers: {
    'META_SET': function(payload){
      this._set(payload.meta);
      debug(this.dehydrate());
      this.emitChange();
    },
    'META_RESET': function(){
      this._setAsDefault();
      debug(this.dehydrate());
      this.emitChange();
    }
  },

  _setAsDefault() {
    this.title = '政治承諾追蹤網'
    this.description = '政治承諾追蹤網網網網網網'
    this.canonical = '/'
  },

  _set(meta) {
    this._setAsDefault();

    if(meta.title){
      // Postfix the specified title with default title
      //
      this.title = `${meta.title} :: ${this.title}`;
    }

    for (let key of ['description', 'canonical']){
      if( meta.hasOwnProperty(key) ){
        this[key] = meta[key];
      }
    }
  },

  dehydrate() {
    return {
      title: this.title,
      description: this.description,
      canonical: this.canonical
    };
  },

  rehydrate(state) {
    assign(this, state);
  }
});
