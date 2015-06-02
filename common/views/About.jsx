var React = require('react'),
    Transmit = require('react-transmit'),
    styles = require('./styles.js');

var About = React.createClass({
  render: function(){
    return (
      <div className="full height main container" style={styles.mainContainer}>
        <h1>關於政治承諾追蹤網</h1>
        <p>Hello world!</p>
      </div>
    );
  }
});

module.exports = Transmit.createContainer(About, {});
