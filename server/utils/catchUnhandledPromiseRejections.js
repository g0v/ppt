// Catch all unhandled promise rejections and print error.
// Ref: https://iojs.org/api/process.html#process_event_unhandledrejection
//
process.on('unhandledRejection', function(reason, promise) {
  if (reason.stack) {
    // Error object, has stack info
    console.error('[Unhandled Rejection]', reason.stack);
  } else {
    console.error('[Unhandled Rejection] Reason:', reason);
  }
  console.error('[Unhandled Rejection] Promise:', promise);
});