import React from 'react';
import pptSpacing from '../styles/spacing';

class About extends React.Component {
  getStyles() {
    return {
      root: {
        paddingTop: pptSpacing.appBarHeight,
      },
    };
  }

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.root}>
        <h1>關於政治承諾追蹤網</h1>
        <p>Hello world!</p>
      </div>
    );
  }
}

export default About;
