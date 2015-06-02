// Server entry point
//

// Babel takes care of jsx parsing & requiring.
require('babel/register')({
  optional: ['es7.asyncFunctions']
});

require('../server/utils/catchUnhandledPromiseRejections');

var express = require('express'),
    app = express(),
    packageJson = require('../package.json');;

// view engine setup
app.set('view engine', 'jade');
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
app.use('/api', require('./routes/api'));

//
// Top-level endpoints and catch-all route
//
app.use(require('./routes/top-level.jsx'));

var server = app.listen(packageJson.config.apiServerPort, function() {
  console.log('Server listening at http://%s:%s',
              server.address().address, server.address().port);
});
