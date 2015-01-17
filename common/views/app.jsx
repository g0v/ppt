var React = require('react');

var App = React.createClass({
  render: function(){
    var cssName = '/static/' + this.props.hash + '.css',
        jsName = '/static/' + this.props.hash + '.js';

    return (
      <html lang="zh-TW">
        <head>
          <meta charSet="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>PPT</title>
          <link href={cssName} rel="stylesheet"/>
        </head>
        <h1>Hello world!</h1>
        <script src={jsName}/>
      </html>
    )
  }
});

module.exports = App;
