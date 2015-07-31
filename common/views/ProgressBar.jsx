import React from 'react';
import pptColors from '../styles/color';
import { getBarWidthPercent } from '../utils/';
import mui from 'material-ui';

const { AutoPrefix } = mui.Styles;

export default class ProgressBar extends React.Component {

  static propTypes = {
    stats: React.PropTypes.object,
  }

  getStyles() {
    return {
      root: {
        display: '-webkit-box; display: -webkit-flex; display: flex; display: -ms-flexbox;',
        height: 10
      },
      individual: {
        height: '100%'
      }
    }
  }

  render() {
    const { stats } = this.props;
    const styles = this.getStyles();
    const { notyet, doing, done } = getBarWidthPercent(stats);

    return (
      <div style={ AutoPrefix.all({...styles.root, ...this.props.style}) }>
        <div style={ AutoPrefix.all({ backgroundColor: pptColors.primaryRed, boxFlex: notyet,
          flex: notyet, ...styles.individual}) } />
        <div style={ AutoPrefix.all({ backgroundColor: pptColors.primaryYellow, boxFlex: doing,
          flex: doing, ...styles.individual}) } />
        <div style={ AutoPrefix.all({ backgroundColor: pptColors.primaryBlue, boxFlex: done,
          flex: done, ...styles.individual}) } />
      </div>
    )
  }
}
