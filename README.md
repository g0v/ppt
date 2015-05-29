政治承諾追蹤網 Political Promise Tracker
=========================

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

Create a PostgreSQL database table called `promisetw` with user `ppt` and empty password. Then run:

```
$ npm run migrate
$ npm run seed
```

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

Currently we use pg (both on heroku and localhost).
The database structure is managed by migration scripts in `server/migration`, which is invoked by `sequalize-cli`.
All data is re-populated by `data/seed-mock-data.js` at server startup.

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

If you would like to inspect the compiled website without pushing to Heroku, you may:

```
$ npm run build # Generates hashed assets inside client/build
$ NODE_ENV=production foreman start  # Start server in production mode
```
