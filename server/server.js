// Server entry point
//

// Babel takes care of jsx parsing & requiring.
require('babel/register');
require('../server/utils/catchUnhandledPromiseRejections');

var express = require('express'),
    app = express(),
    packageJson = require('../package.json');;

// view engine setup
app.set('views', __dirname + '/views');

//
// Common middlewares
//
app.use(require('serve-favicon')(__dirname + '/../client/favicon.png'));
app.use(require('morgan')('combined'));
app.use(express.static('client'));
app.use(require('cookie-parser')(process.env.COOKIE_SECRET || 'cookie secret'));
app.use(require('body-parser').json()); // Post requests in application/json

//
// API endpoints
//
app.use('/api', require('./routes/api.js'));

//
// Catch-all route
//
app.get('*', function(req, res){
  res.json({foo: 'bar'});
});

var server = app.listen(packageJson.config.apiServerPort, function() {
  console.log('Server listening at http://%s:%s',
              server.address().address, server.address().port);
});
