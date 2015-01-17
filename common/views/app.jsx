var React = require('react');

var App = React.createClass({
  render: function(){
    var cssName = '/build/' + this.props.hash + '.css',
        jsName = '/build/' + this.props.hash + '.js';

    return (
      <html lang="zh-TW">
        <head>
          <meta charSet="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <meta name="webpack-hash" content={this.props.hash}/>
          <title>PPT</title>
          <link href={cssName} rel="stylesheet"/>
        </head>
        <h1>Hello world!</h1>
        <img src="/images/s.png"/>
        <script src={jsName}/>
      </html>
    )
  }
});

module.exports = App;
