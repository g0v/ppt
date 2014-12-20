Political Promise Tracker
=========================

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
$ foreman start
```

Then the server will be running on `http://localhost:5000`, and the API explorer is in `http://localhost:5000/explorer`.

If the Heroku toolbelt is not installed (so that `forman` command doesn't exist), the server can be started using `slc run` as well.

For more information of Loopback please refer to [Loopback documentation](http://docs.strongloop.com/display/public/LB/LoopBack).
