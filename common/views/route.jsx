var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute,

    App = require('./app.jsx'),
    About = require('./about.jsx'),
    Home = require('./home.jsx');

module.exports = (
  <Route name="app" handler={App} path="/">
    <Route name="about" handler={About} />
    <DefaultRoute handler={Home} />
  </Route>
);
