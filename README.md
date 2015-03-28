政治承諾追蹤網 Political Promise Tracker
=========================

[Hackpad](https://g0v.hackpad.com/-Political-Promise-Tracker-4a31UkdBItq)

## 專案簡介

一個列出特定當選人 or 團隊之公開承諾的網頁。
在任期間由公民朋友自發提供新聞連結、更新承諾進度，
作為公民評估此執政者 / 團隊之執行力的工具。


Solution Stack
--------------
For frontend dependencies please refer to `bower.json`
As for back-end please refer to `package.json`.

* Frontend
  - React JS
  - Semantic UI ([Example on integrating ReactJS with jQuery plugins](https://github.com/facebook/react/blob/master/examples/jquery-bootstrap/js/app.js). )
  - Stylus
  - Webpack

* Backend
  - [Loopback](http://docs.strongloop.com/display/public/LB/LoopBack)

Development
-----------

### Install StrongLoop controller and the [Heroku toolbelt](https://toolbelt.heroku.com/) (optional)

```
$ npm install -g strongloop
```

### Start Server

After cloning the repo,

```
$ cd promisetw
$ npm start
```

It does two things:

1. Starts loopback server running on `http://127.0.0.1:9527`, which uses nodemon to watch both `js` and `jsx` files and reload server upon update.
2. Starts another asset hosting server in `http://127.0.0.1:5000`, which triggers browser reload after webpack compilation. It proxies all other requests (like `/api` connections) to `http://127.0.0.1:9527`.

After `npm start`, open `http://127.0.0.1:5000` to see the website running.


### Starting Points

* `common/views/app.jsx`: Isomorphic React component that creates the entire DOM tree.
* `server/middleware/isomorphic-app.js`: An middleware that loads `common/view/app.jsx` and serve the rendered result. It reacts to all URLs, as specified in `server/middleware.json`.
* `client/js/index.js`: Front-end javascript starting point, also loads `common/view/app.jsx` and initializes React front-end app.
* `client/styl/index.styl`: Starting point of all styles of the app.


### Naming Convention

* Class files (stores, components, etc.) are CamelCase.
* Object instance files (actions, fluxibleApp) are camelCase.

### Styling with Semantic UI

PPT uses custom Semantic UI themes.
Currently Semantic UI project is located in `client/semantic-ui`.
Its content is extracted from the zip file from the official semantic-ui website.
This is probably the best we can do [before Semantic UI come up with a better tool](https://github.com/Semantic-Org/Semantic-UI/issues/1385).

To develop with custom Semantic UI themes, follow the [instructions in Semantic UI documentation](http://learnsemantic.com/guide/expert.html#project-dependencies):

```
$ cd client/semantic-ui
$ npm i   # installs semantic-ui deps
$ gulp    # watches source files
```

Modification to Semantic UI conforms to Semantic-UI [customization guide](http://learnsemantic.com/developing/customizing.html#setting-global-variables). Relevant files are inside `client/semantic-ui/src/site` directory.
Make sure to specifically run `gulp build` in directory `client/semantic-ui` after modifying`.variables` files, since `gulp` watching somehow does not get the variables through.

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
