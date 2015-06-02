var debug = require('debug')('ppt:metaAction');

module.exports = {
  set: function(actionContext, meta, done){
    debug('META_SET', meta);
    actionContext.dispatch('META_SET', {meta});
    done();
  },
  reset: function(actionContext, done){
    actionContext.dispatch('META_RESET');
    done();
  }
};
