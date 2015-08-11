import React from 'react';
import mui, { Card, ListItem, ListDivider} from 'material-ui';
import DoneIcon from 'material-ui/lib/svg-icons/action/done';
import pptColors from '../styles/color';

const { Transitions } = mui.Styles;

export default class WelcomeSection extends React.Component {

  static propTypes = {
    onKnownTouchTap: React.PropTypes.func,
  }

  getStyles() {
    return {
      root: {
        backgroundColor: pptColors.primaryBlue,
        height: 232,
        width: '100%',
        maxWidth: 960,
        margin: '8px auto 0',
        transition: Transitions.easeOut('300ms', 'height'),
      },
      h1: {
        marginTop: 22,
        marginLeft: 17,
        fontSize: 24,
        color: pptColors.darkWhite,
      },
      h3: {
        fontSize: 15,
        color: pptColors.darkWhite,
      },
      h4: {
        marginTop: 7,
        marginLeft: 17,
        fontSize: 15,
        color: pptColors.darkWhite,
      },
      h5: {
        marginLeft: 17,
        fontSize: 12,
        color: pptColors.lightWhite,
      },
      divider: {
        marginTop: 11,
        height: 2,
        backgroundColor: pptColors.faintWhite,
      },
      doneIcon: {
        width: 24,
        height: 24,
        fill: pptColors.white,
      },
    };
  }
  render() {
    const styles = this.getStyles();
    return (
      <Card style={styles.root}>
        <h1 style={styles.h1}>一起來監督施政吧</h1>
        <h4 style={styles.h4}>查詢政府首長施政進度</h4>
        <h5 style={styles.h5}>從左側選單挑選要看的縣市長</h5>
        <h4 style={styles.h4}>貼上新聞連結，更新施政進度</h4>
        <h5 style={styles.h5}>進度開放編輯，只要附上訊息出處，就能更新施政進度</h5>
        <ListDivider style={styles.divider}/>
        <ListItem primaryText={<h3 style={styles.h3}>我知道了</h3>}
          leftIcon={<DoneIcon style={styles.doneIcon}/>} onTouchTap={this.props.onKnownTouchTap}/>
      </Card>
    );
  }
}
