var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    Sidebar = require('./Sidebar.jsx'),
    TopBar = require('./Topbar.jsx');

var App = React.createClass({
  getInitialState: function(){
    return {
      isMenuOpen: false
    }
  },
  render: function(){
    var assetHost = this.props.assetHost || '/',
        cssName = assetHost + 'build/' + this.props.hash + '.css',
        jsName = assetHost + 'build/' + this.props.hash + '.js';

    return (
      <html lang="zh-TW">
        <head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="webpack-hash" content={this.props.hash}/>
          <meta name="webpack-asset-host" content={assetHost}/>
          <title>PPT</title>
          <link href={cssName} rel="stylesheet"/>
        </head>
        <body>
          <Sidebar />
          <TopBar />
          <div className="pusher">
            <RouteHandler asset-host={assetHost}/>
          </div>
          <script src="/vendor/bower_components/jquery/dist/jquery.min.js"/>
          <script src={jsName}/>
        </body>
      </html>
    )
  }
});

module.exports = App;
