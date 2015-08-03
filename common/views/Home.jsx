import React from 'react';
import Transmit from 'react-transmit';
import mui, { Avatar, Card, CardTitle, CardActions, ListItem, ListDivider,
  RaisedButton } from 'material-ui';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import ForwardIcon from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import WelcomeSection from './WelcomeSection.jsx';
import RateSection from './RateSection.jsx';
import pptColors from '../styles/color';
import pptSpacing from '../styles/spacing';

const { AutoPrefix } = mui.Styles;

class Home extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      wasVisited: true
    };
  }

  componentDidMount() {
    if (!(window.localStorage.getItem('wasVisited'))) {
      window.localStorage.setItem('wasVisited', false)
      this.setState({
        wasVisited: false
      });
    }
  }

  onKnownTouchTap() {
    window.localStorage.setItem('wasVisited', true)
    React.findDOMNode(this.refs.welcomeSection).style.height = 0;
  }

  getStyles() {
    return {
      root: {
        height: '100%',
        width: '100%',
        paddingTop: pptSpacing.appBarHeight,
        paddingLeft: 8,
        paddingRight: 8,
        boxSizing: 'border-box'
      },
      recentUpdateRoot: {
        width: '100%',
        maxWidth: 960,
        margin: '8px auto 0'
      },
      title: {
        fontSize: 24,
        color: pptColors.primaryBlue
      },
      divider: {
        backgroundColor: pptColors.faintBlack
      },
      content: {
        fontSize: 15,
        color: pptColors.primaryBlue
      },
      shortReport: {
        fontSize: 12,
        color: pptColors.lightBlack,
        marginTop: 4
      },
      moreVert: {
        top: 6,
        left: 8
      },
      rateRoot: {
        padding: 16
      }
    };
  }

  render() {
    const styles = this.getStyles();

    return (
      <div style={AutoPrefix.all(styles.root)}>
        {this.state.wasVisited ? null : <WelcomeSection ref="welcomeSection"
          onKnownTouchTap={::this.onKnownTouchTap}/>}
        <Card style={styles.recentUpdateRoot}>
          <CardTitle title="近期更新"
            titleStyle={styles.title} />
          <ListDivider style={styles.divider} />
          <ListItem leftAvatar={<Avatar src="http://semantic-ui.com/images/avatar/small/daniel.jpg" />}
            secondaryTextLines={2}
            secondaryText={
              <p>
                <span style={styles.content}>
                  航空城捷運線建設綜合規劃報告書已於103年11月25日獲國家發展委員會審議通過，行政院預計 104 年 6 月底前
                  核定，其未來 4 年施政重點與期程規劃詳如下表 1。 年度 施政重點與期程 104 1、 6月：專案管理技術服務決標。
                  2、 10月：統包工程招標。 105 1、 4月：統包工程決標及開工。 2、 7月：監造</span>
                <p style={styles.shortReport}>桃園市政府
                  <span style={{color: pptColors.primaryYellow}}>正在做</span> 承諾+1</p>
              </p>}
            />
          <ListDivider style={styles.divider} />
          <ListItem leftIcon={<MoreVertIcon style={styles.moreVert}/>}
            secondaryText={<p style={{color: pptColors.primaryBlue}}>更多更新歷程</p>}
          />
        </Card>
        <Card style={styles.recentUpdateRoot}>
          <CardTitle title="進度大家評"
            titleStyle={styles.title} />
          <ListDivider style={styles.divider} />
          <div style={styles.rateRoot}>
            <RateSection home={true} />
          </div>
        </Card>
      </div>
    );
  }
}

module.exports = Transmit.createContainer(Home, {});
