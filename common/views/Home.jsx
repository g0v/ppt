import React from 'react';
import Transmit from 'react-transmit';
import { Avatar, Card, CardTitle, CardText ,CardActions, ListItem, ListDivider,
  RaisedButton } from 'material-ui';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import ForwardIcon from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import WelcomeSection from './WelcomeSection.jsx';
import pptColors from '../styles/color';
import pptSpacing from '../styles/spacing';

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
        width: '100%',
        height: '100%',
        paddingTop: pptSpacing.appBarHeight
      },
      recentUpdate: {
        root: {
          width: '100%',
          maxWidth: 960,
          margin: '0px auto 8px'
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
        }
      },
      rate: {
        quote: {
          fontSize: 20,
          color: pptColors.faintBlack
        },
        content: {
          fontSize: 15,
          color: '#37474f'
        },
        source: {
          display: 'inline-block',
          fontSize: 15,
          color: pptColors.lightBlack,
        },
        forwardIcon: {
          width: 15,
          height: 15,
          fill: pptColors.black,
          opacity: 0.53,
          marginRight: '5%'
        }
      }
    };
  }

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.root}>
        {this.state.wasVisited ? null : <WelcomeSection ref="welcomeSection"
          onKnownTouchTap={::this.onKnownTouchTap}/>}
        <Card style={styles.recentUpdate.root}>
          <CardTitle title="近期更新"
            titleStyle={styles.recentUpdate.title} />
          <ListDivider style={styles.recentUpdate.divider} />
          <ListItem leftAvatar={<Avatar src="http://semantic-ui.com/images/avatar/small/daniel.jpg" />}
            secondaryTextLines={2}
            secondaryText={
              <p>
                <span style={styles.recentUpdate.content}>
                  航空城捷運線建設綜合規劃報告書已於103年11月25日獲國家發展委員會審議通過，行政院預計 104 年 6 月底前
                  核定，其未來 4 年施政重點與期程規劃詳如下表 1。 年度 施政重點與期程 104 1、 6月：專案管理技術服務決標。
                  2、 10月：統包工程招標。 105 1、 4月：統包工程決標及開工。 2、 7月：監造</span>
                <p style={styles.recentUpdate.shortReport}>桃園市政府
                  <span style={{color: pptColors.primaryYellow}}>正在做</span> 承諾+1</p>
              </p>}
            />
          <ListDivider style={styles.recentUpdate.divider} />
          <ListItem leftIcon={<MoreVertIcon />} secondaryText={
              <p style={{color: pptColors.primaryBlue}}>更多更新歷程</p>}
          />
        </Card>
        <Card style={styles.recentUpdate.root}>
          <CardTitle title="進度大家評"
            titleStyle={styles.recentUpdate.title} />
          <ListDivider style={styles.recentUpdate.divider} />
          <CardText>
            <span style={styles.rate.quote}>❝</span>
            <p style={styles.rate.content}>
              104 年度規劃擴大辦理 65 歲以上特約醫生幫老人裝假牙(原住民 55 歲以上) 其綜合所得稅稅率未達
              20%家戶之長者補助健保費，每月每人最高可補助 749 元，預計 12 萬人受惠。
            <span style={{...styles.rate.quote, float: 'right'}}>❞</span>
            </p>
            <div style={{margin: '7px 0'}}>
              <ForwardIcon style={{...styles.rate.source, ...styles.rate.forwardIcon}}/>
              <a style={{...styles.rate.source, cursor: 'pointer'}} href={""}>
                佐證資訊出處
              </a>
            </div>
            <p style={{ fontSize: 15, color: pptColors.primaryBlue }}>看完以上資料，你認為台中市政府的承諾</p>
            <p style={{ fontSize: 14, color: pptColors.darkBlack, marginTop: 8, fontWeight: 'bold' }}>65 歲以上老人健保免費</p>
            <div style={{margin: '7px 0'}}>
            <ForwardIcon style={{...styles.rate.source, ...styles.rate.forwardIcon}}/>
              <a style={{...styles.rate.source, cursor: 'pointer'}} href={""}>
                看2014年的詳細承諾
              </a>
            </div>
            <p style={{ fontSize: 15, color: pptColors.primaryBlue }}>的達成率是？</p>
            <CardActions showExpandableButton={true}>
              <RaisedButton labelColor={pptColors.white} backgroundColor={pptColors.primaryRed} label="沒有做" />
              <RaisedButton labelColor={pptColors.white} backgroundColor={pptColors.primaryYellow} label="還在做" />
              <RaisedButton labelColor={pptColors.white} backgroundColor={pptColors.primaryBlue} label="已完成" />
            </CardActions>
          </CardText>
        </Card>
      </div>
    );
  }
}

module.exports = Transmit.createContainer(Home, {});
