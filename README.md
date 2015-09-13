政治承諾追蹤網 Political Promise Tracker
=========================

[Our Website](http://promisetw.herokuapp.com/)

[Hackfoldr](http://beta.hackfoldr.org/ppt)(any contribution and disscussion are welcome)

專案簡介
--------------

一個列出特定當選人 or 團隊之公開承諾的網頁。
在任期間由公民朋友自發提供新聞連結、更新承諾進度，
作為公民評估此執政者 / 團隊之執行力的工具。


Solution Stack
--------------
For frontend dependencies please refer to `bower.json`
As for back-end please refer to `package.json`.

* Frontend
  - React JS
  - Material UI
  - Stylus
  - Webpack

* Backend
  - Express
  - Sequelize

Development
-----------

### Setup

After cloning the repo, please run the following to setup:

```
$ cd promisetw
$ npm install
```

Create a PostgreSQL database table called `promisetw` with user `ppt` and empty password. With PostgreSQL Command Line Tools installed, Run:

```
$ createuser ppt
$ createdb -O ppt promisetw
$ npm run seed
```

To run database migration and seed the mock data into database.

Lastly, please create a file `.env` under the project directory in following manner:

```
PROVIDER_FB_ID=xxxxx # Facebook app id
PROVIDER_FB_SECRET=xxxxxxxxx # Facebook app secret
PROVIDER_GOOGLE_ID=xxxxxxxxxx # Google OAuth2 client ID
PROVIDER_GOOGLE_SECRET=xxxxxxxxxx # Google OAuth2 client secret
```

Passport will load these files into `process.env` when running in development mode.

### Start Server

We start the dev server using:

```
$ npm start
```

The command above does two things:

1. Starts express server running on `http://127.0.0.1:9527`, which uses nodemon to watch both `js` and `jsx` files and reload server upon update.
2. Starts `webpack-dev-server` in `http://127.0.0.1:5000`, which triggers browser reload after webpack compilation. It proxies all server requests (like `/api` connections) to `http://127.0.0.1:9527`.

After `npm start`, open `http://127.0.0.1:5000` to see the website running.

### Database

Currently we use PostgreSQL both on heroku and localhost.
The database structure is managed by migration scripts in `server/migration`.

General steps to alter the database structure (i.e. add/remove tables or add/remove columns) are given below:

1. Generate migration scripts using `node_modules/.bin/sequelize migration:create`
2. Edit the generated script under the directory 'server/migration'
3. Run `npm run migrate` (a shortcut for `node_modules/.bin/sequelize db:migrate`)

If you want to create a *new model*, please refer to `node_modules/.bin/sequelize help:model:create` for more information.

### Starting Points

* `server/server.js`: ExpressJS server that acts as an API server, and invokes ReactJS server-side rendering, which loads `common/views/app.jsx`, renders to string and put the rendered string into `server/views/app.jade`.
* `common/views/app.jsx`: Isomorphic React component that creates the entire app.
* `client/js/client.js`: Front-end javascript starting point, also loads `common/view/app.jsx` and initializes React front-end app.
* `client/styl/client.styl`: Starting point of all styles of the app.


### Naming Convention

* Class files (stores, components, etc.) are capitalized CamelCase.
* Object instance files (actions, fluxibleApp) are lower camelCase.

### Debugging Messages

Debug messages are inserted using [visionmedia/debug](https://www.npmjs.com/package/debug). All debug flags starts with `ppt:`, thus you may use `DEBUG=ppt:* npm start` to print all debug messages on node.js.

The `debug` instance is exposed as `window.myDebug` in browsers, thus you may use `myDebug.enable("ppt:*")` in browser console as well.

Deploy
------

Deploying to a production server like heroku involves:

1. Build JS, CSS and HTML files with hash names (`npm run build`)
2. Commit the compiled files into repository.
3. Push to Heroku.

These steps are wired inside `package.json` in commands starting with `deploy`.
To deploy to Heroku, just run:

```
$ npm run deploy
```

If the database structure should be updated, don't forget to run database migration on server as well:

```
$ heroku run npm run migrate
```

If you would like to inspect the compiled website without pushing to Heroku, you may:

```
$ npm run build # Generates hashed assets inside client/build
$ NODE_ENV=production foreman start  # Start server in production mode
```

TODO
----

- [ ] let user login
- [ ] let report rating work (and api/endpoint)
- [ ] let add/edit report work (and api/endpoint)
- [ ] add Redux [authMiddleware](https://github.com/transedward/redux-auth)
- [ ] let AppBar change according to route
- [ ] try to make login and any post request in 1 rtt
- [ ] let homepage de-hardcoded 
