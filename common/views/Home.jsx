import React from 'react';
import Transmit from 'react-transmit';
import { Card, CardTitle, CardActions, ListItem, ListDivider } from 'material-ui';
import DoneIcon from 'material-ui/lib/svg-icons/action/done';
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
          faintBlack: pptColors.faintBlack
        },
        doneIcon: {
          width: 24,
          height: 24,
          fill: pptColors.white
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

        <div>
          <h1 style={styles.noMarginTop}>近期更新</h1>
          <div></div>
          <div>
            <div>
              <img src="http://semantic-ui.com/images/avatar/small/daniel.jpg"/>
              <div>
                <div>台中市政府社會局</div>
                申請生育津貼，單胞胎一萬元，雙胞胎新台幣...
              </div>
            </div>
            <div></div>
            <div>
              <img src="http://semantic-ui.com/images/avatar/small/steve.jpg"/>
              <div>
                <div>台中市政府社會局</div>
                申請生育津貼，單胞胎一萬元，雙胞胎新台幣...
              </div>
            </div>
          </div>
        </div>

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
