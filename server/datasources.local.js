// create this file for heroku pg connection until we can set env in datasources.json
// http://apidocs.strongloop.com/loopback-boot/#exports-configloader
// need to configure pg with empty url first
// You cannot add new datasources in environment-specific files,
// you can only modify the configuration of datasources already defined in the main datasources.json file.
// https://github.com/strongloop/loopback/issues/1345

var debug = require('debug')('ppt:datasourcesPg');
var shell = require('shelljs');

// need to export env if in development mode, I choose to
// running the same database locally during development as in production. As below,
// https://devcenter.heroku.com/articles/heroku-postgresql#local-setup
var postgresURI = process.env.DATABASE_URL ||
  shell.exec('heroku config:get DATABASE_URL', {silent: true}).output;

module.exports = {
  pg: {
    name: "pg",
    connector: "postgresql",
    debug: true,
    url: postgresURI
  }
};