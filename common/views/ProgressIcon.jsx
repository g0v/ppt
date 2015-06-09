var React = require('react'),
    Isvg = require('react-inlinesvg');

var ProgressIcon = React.createClass({
  propTypes: {
    progress: React.PropTypes.oneOf(['notyet', 'doing', 'done'])
  },

  getDefaultProps(){
    return {
      progress: 'notyet'
    }
  },

  render: function(){
    // Cannot use Webpack dynamic require here because it's also used
    // by server-side.
    var urlString = `/images/${this.props.progress}-icon.svg`;

    return (
      <Isvg src={urlString} {...this.props} />
    )
  }
});

module.exports = ProgressIcon;
