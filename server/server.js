require('babel/register');

var loopback = require('loopback'),
    boot = require('loopback-boot'),
    expressState = require('express-state'),
    app = module.exports = loopback();

// Passport configurators..
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

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


// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts./
//
// Middlewares should go to middleware.json.
// Docs: https://gist.github.com/bajtos/e7eaba736ff096916b71
//
boot(app, __dirname);
expressState.extend(app);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
