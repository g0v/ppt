import React from 'react';

export default class ProgressBar extends React.Component {

  static propTypes = {
    stats: React.PropTypes.object,
  }

  getStyles() {
    return {
      root: {
        display: 'flex',
        flex-flow: 'row'
      }
    }
  }

  render() {
    const { stats } = this.props;
  }

}
