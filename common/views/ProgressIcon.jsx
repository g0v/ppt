var React = require('react');

var ProgressIcon = React.createClass({
  propTypes: {
    progress: React.PropTypes.oneOf(['notyet', 'doing', 'done']).isRequired
  },
  render: function(){
    var urlString = "/images/" + this.props.progress + "-icon.svg";

    return (
      <img src={urlString} {...this.props} />
    )
  }
});

module.exports = ProgressIcon;
