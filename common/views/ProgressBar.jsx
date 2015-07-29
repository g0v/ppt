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
        height: 10
      },
      individual: {
        display: 'inline-block',
        height: '100%'
      }
    }
  }

  render() {
    const { stats } = this.props;
    const styles = this.getStyles();
    const { notyet, doing, done } = getBarWidthPercent(stats);

    return (
      <div style={{...styles.root, ...this.props.style}}>
        <div style={{ backgroundColor: pptColors.primaryRed, width: notyet,
            ...styles.individual}} />
          <div style={{ backgroundColor: pptColors.primaryYellow, width: doing,
            ...styles.individual}} />
          <div style={{ backgroundColor: pptColors.primaryBlue, width: done,
          ...styles.individual}} />
      </div>
    )
  }
}
