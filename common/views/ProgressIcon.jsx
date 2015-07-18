import React from 'react';
import {IconButton} from 'material-ui';
import NotyetIcon from 'material-ui/lib/svg-icons/navigation/close';
import DoingIcon from 'material-ui/lib/svg-icons/action/trending-flat';
import DoneIcon from 'material-ui/lib/svg-icons/action/done';

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
    let icon;
    if(this.props.progress === 'done') {
      icon = (
        <DoneIcon {...this.props} style={{fill: 'green'}}></DoneIcon>
      );
    }else if(this.props.progress === 'doing') {
      icon = (
        <DoingIcon {...this.props} style={{fill: 'yellow'}}></DoingIcon>
      );
    }else {
      icon = (
        <NotyetIcon {...this.props} style={{fill: 'red'}}></NotyetIcon>
      );
    }
    return icon;
  }
});

module.exports = ProgressIcon;
