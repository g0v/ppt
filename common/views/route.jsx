var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute,

    App = require('./app.jsx'),
    About = require('./about.jsx'),
    Governer = require('./governer.jsx'),
    PromiseDetail = require('./promise.jsx'),
    Home = require('./home.jsx');

module.exports = (
  <Route name="app" handler={App} path="/">
    <Route name="about" handler={About} />
    <Route name="governer" path="/governer/:name" handler={Governer} />
    <Route name="promise" path="/promise/:id" handler={PromiseDetail} />
    <DefaultRoute handler={Home} />
  </Route>
);
