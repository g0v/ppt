var React = require('react');
var Isvg = require('react-inlinesvg');

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
    var urlString = "/images/" + this.props.progress + "-icon.svg";

    return (
      <Isvg src={urlString} {...this.props} />
    )
  }
});

module.exports = ProgressIcon;
