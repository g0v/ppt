var React = require('react');

var App = React.createClass({
  render: function(){
    var assetHost = this.props.assetHost || '/',
        cssName = assetHost + 'build/' + this.props.hash + '.css',
        jsName = assetHost + 'build/' + this.props.hash + '.js';

    return (
      <html lang="zh-TW">
        <head>
          <meta charSet="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <meta name="webpack-hash" content={this.props.hash}/>
          <meta name="webpack-asset-host" content={assetHost}/>
          <title>PPT</title>
          <link href={cssName} rel="stylesheet"/>
        </head>
        <h1>Hello world~10</h1>
        <img src="/images/s.png"/>
        <script src="/vendor/bower_components/jquery/dist/jquery.min.js"/>
        <script src={jsName}/>
      </html>
    )
  }
});

module.exports = App;
