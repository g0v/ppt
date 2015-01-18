var loopback = require('loopback'),
    boot = require('loopback-boot'),
    app = module.exports = loopback();

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts./
//
// Middlewares should go to middleware.json.
// Docs: https://gist.github.com/bajtos/e7eaba736ff096916b71
//
boot(app, __dirname);

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
