var React = require('react'),
    mui = require('material-ui'),
    Transmit = require('react-transmit');

const Spacing = mui.Styles.Spacing;

var About = React.createClass({
  getStyles() {
    return {
      root: {
        paddingTop: Spacing.desktopKeylineIncrement
      }
    };
  },

  render: function(){
    const styles = this.getStyles();

    return (
      <div className="full height main container" style={styles.root}>
        <h1>關於政治承諾追蹤網</h1>
        <p>Hello world!</p>
      </div>
    );
  }
});

module.exports = Transmit.createContainer(About, {});
