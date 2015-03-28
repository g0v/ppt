module.exports = {
  set: function(actionContext, meta, done){
    actionContext.dispatch('META_SET', {meta});
    done();
  },
  reset: function(actionContext, done){
    actionContext.dispatch('META_RESET');
    done();
  }
};
