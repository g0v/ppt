var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute,

    App = require('./app.jsx'),
    About = require('./about.jsx'),
    MainContainer = require('./main-container.jsx');

module.exports = (
  <Route handler={App} path="/">
    <Route name="about" handler={About} />
    <DefaultRoute handler={MainContainer} />
  </Route>
);
