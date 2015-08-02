import React from 'react';
import { RaisedButton } from 'material-ui';
import pptColors from '../styles/color';

const debug = require('debug')('ppt:ProgressButton');

class ProgressButton extends React.Component {

  static propTypes = {
    backgroundColor: React.PropTypes.string,
    label: React.PropTypes.string,
    progressIndex: React.PropTypes.number,
    selectedIndex: React.PropTypes.number,
    handleTouchTap: React.PropTypes.func
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      isActive: false
    };
  }


  render () {
    const { props: { backgroundColor, label, progressIndex, selectedIndex, handleTouchTap,
      ...others } } = this
    return (
      <RaisedButton {...others} labelColor={pptColors.white}
        backgroundColor={ selectedIndex === progressIndex ? backgroundColor : 'rgba(153, 153, 153, 0.2)'}
        label={label} onTouchTap={handleTouchTap(progressIndex)}/>
    )
  }
}

export default ProgressButton;
