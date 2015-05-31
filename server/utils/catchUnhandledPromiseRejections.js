// Catch all unhandled promise rejections and print error.
// Ref: https://iojs.org/api/process.html#process_event_unhandledrejection
//
var debug = require('debug')('ppt:unhandledRejection');

process.on('unhandledRejection', function(reason, promise) {
  if (reason.stack) {
    // Error object, has stack info
    debug(reason.stack);
  } else {
    debug('Reason:', reason);
  }
  debug('Promise:', promise);
});
