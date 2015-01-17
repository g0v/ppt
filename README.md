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

* Front-end
  - Semantic UI
  - React JS ([integration example](https://github.com/facebook/react/blob/master/examples/jquery-bootstrap/js/app.js))
  - Stylus
  - Webpack


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
$ npm watch
```

to watch all other assets, such as jade files inside `client/jade`.
This command generates `client/build/index.html`, which is the only page that
is served to the browser.

To start a web server in development mode, open up another terminal
and do:

```
$ foreman start
```

Then the server will be running on `http://localhost:5000`, and the API explorer is in `http://localhost:5000/explorer`.

If the Heroku toolbelt is not installed (for the command `forman` command), the server can be started using `slc run` as well. Files in `cilent/styl` and `client/js` are automatically compiled, and the browser window should be automatically refreshed by webpack.


Notice that if the server starts without `client/build/index.html`'s presence,
the development web server will go crazy because it tends to watch a file that
does not exist.

For more information of Loopback please refer to [Loopback documentation](http://docs.strongloop.com/display/public/LB/LoopBack). However, Loopback is currently under heavy development. Expect inconsistencies between the doc and the actual code!


### Deploy

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
$ NODE_ENV=production forman start  # Start server in production mode
```
