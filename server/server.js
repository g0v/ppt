// Server entry point
//

// Babel takes care of jsx parsing & requiring.
require('babel/register')({
  optional: ['es7.asyncFunctions']
});

require('../server/utils/catchUnhandledPromiseRejections');

var express = require('express'),
    app = express(),
    passport = require('passport');

//
// View engine setup
//
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

//
// Passport setup
//
require('./config/passport');

//
// Common middlewares
//
app.use(require('serve-favicon')(__dirname + '/../client/favicon.png'));
app.use(require('morgan')('combined'));
app.use(express.static('client'));
app.use(require('body-parser').json()); // Post requests in application/json
app.use(require('cookie-session')({
  secret: process.env.COOKIE_SECRET || 'cookie secret'
}));
app.use(passport.initialize());
app.use(passport.session());

//
// API endpoints
//
app.use('/api', require('./routes/api'));

//
// passport authentication endpoints & callbacks
//
app.use('/auth', require('./routes/auth'));

//
// Top-level endpoints and catch-all route
//
app.use(require('./routes/top-level.jsx'));

//
// Starts listening for requests
//
var server = app.listen(process.env.PORT, function() {
  console.log('Server listening at http://%s:%s',
              server.address().address, server.address().port);
});
