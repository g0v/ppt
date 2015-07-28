import React from 'react';
import pptColors from '../styles/color';
import { getBarWidthPercent } from '../utils/';

export default class ProgressBar extends React.Component {

  static propTypes = {
    stats: React.PropTypes.object,
  }

  getStyles() {
    return {
      root: {
        margin: 'auto',
        width: 90%,
        height: 10
      },
      individual: {
        display: 'inline-block'
      }
    }
  }

  render() {
    const { stats } = this.props;
    const styles = this.getStyles();
    const { notyet, doing, done } = getBarWidthPercent(stats);

    return (
      <div style={styles.root}>
        <div style={{ color: pptColors.primaryRed, width: notyet,
            ...styles.individual}} />
        <div style={{ color: pptColors.primaryYellow, width: doing,
            ...styles.individual}} />
        <div style={{ color: pptColors.primaryBlue, width: done,
          ...styles.individual}} />
      </div>
    )
  }
}
