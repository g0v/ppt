var React = require('react');
var mui = require('material-ui');
var SvgIcon = mui.SvgIcon;

var ExpandMore = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </SvgIcon>
    );
  }

});

module.exports = ExpandMore;
