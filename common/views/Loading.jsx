import React from 'react';
import { CircularProgress } from 'material-ui';
import pptSpacing from '../styles/spacing';
import pptColors from '../styles/color';

export default class Loading extends React.Component {

  getStyles() {
    return {
      root: {
        paddingTop: pptSpacing.appBarHeight + 26,
        height: '100%',
        width: '100%'
      }
    };
  }

  render () {
    const styles = this.getStyles();
    return (
      <div style={styles.root}>
        <div style={{width: '50%', margin: 'auto', textAlign: 'center'}}>
          <div style={{fontSize: 20, color: pptColors.lightBlack}}>Loading...</div>
          <CircularProgress  size={2} mode="indeterminate" color={pptColors.primaryBlue}/>
        </div>
      </div>
    );
  }
}
