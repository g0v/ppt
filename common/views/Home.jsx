import React from 'react';
import Transmit from 'react-transmit';
import { Avatar, Card, CardTitle, CardActions, ListItem, ListDivider } from 'material-ui';
import DoneIcon from 'material-ui/lib/svg-icons/action/done';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import pptColors from '../styles/color';
import pptSpacing from '../styles/spacing';

var Home = React.createClass({
  getStyles() {
    return {
      root: {
        width: '100%',
        height: '100%',
        paddingTop: pptSpacing.appBarHeight
      },
      welcomeSection: {
        root: {
          backgroundColor: pptColors.primaryBlue,
          height: 224,
          width: '100%',
          maxWidth: 960,
          margin: '8px auto'
        },
        h1: {
          marginTop: 22,
          marginLeft: 17,
          fontSize: 24,
          color: pptColors.darkWhite
        },
        h3: {
          fontSize: 15,
          color: pptColors.darkWhite
        },
        h4: {
          marginTop: 7,
          marginLeft: 17,
          fontSize: 15,
          color: pptColors.darkWhite
        },
        h5: {
          marginLeft: 17,
          fontSize: 12,
          color: pptColors.lightWhite
        },
        divider: {
          marginTop: 11,
          height: 2,
          backgroundColor: pptColors.faintWhite
        },
        doneIcon: {
          width: 24,
          height: 24,
          fill: pptColors.white
        }
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
      }
    };
  },

  render: function(){
    const styles = this.getStyles();

    return (
      <div style={styles.root}>
        <Card style={styles.welcomeSection.root}>
          <h1 style={styles.welcomeSection.h1}>一起來監督施政吧</h1>
          <h4 style={styles.welcomeSection.h4}>查詢政府首長施政進度</h4>
          <h5 style={styles.welcomeSection.h5}>從左側選單挑選要看的縣市長</h5>
          <h4 style={styles.welcomeSection.h4}>貼上新聞連結，更新施政進度</h4>
          <h5 style={styles.welcomeSection.h5}>進度開放編輯，只要附上訊息出處，就能更新施政進度</h5>
          <ListDivider style={styles.welcomeSection.divider}/>
          <ListItem primaryText={<h3 style={styles.welcomeSection.h3}>我知道了</h3>}
            leftIcon={<DoneIcon style={styles.welcomeSection.doneIcon}/>} />
        </Card>
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
          <ListItem leftIcon={<MoreVertIcon />} secondaryText={
              <p style={{color: pptColors.primaryBlue}}>更多更新歷程</p>}
          />
        </Card>
        <div>
          <h1 style={styles.noMarginTop}>進度大家評</h1>
          <div></div>
          <div>
            <div>
              台中市政府辦理年滿六十五歲以上老人及身心障礙者乘車補助
              <h5>你認為胡自強的政見達成率？</h5>
              <div style={styles.button}>
                <div>沒有做</div>
                <div>還在做</div>
                <div>已完成</div>
              </div>
            </div>
            <div></div>
            <div>
              胡志強稍微胖了：捷運跳票後派 BRT 上火線，可是模型回不去了
              <h5>你認為胡自強的政見達成率？</h5>
              <div style={styles.button}>
                <div>沒有做</div>
                <div>還在做</div>
                <div>已完成</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Transmit.createContainer(Home, {});
