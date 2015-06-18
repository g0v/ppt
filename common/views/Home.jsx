var React = require('react'),
    Transmit = require('react-transmit'),
    mui = require('material-ui');

const Spacing = mui.Styles.Spacing;

var Home = React.createClass({
  getStyles() {
    return {
      root: {paddingTop: Spacing.desktopKeylineIncrement},
      noMarginTop: {marginTop: 0},
      small: {color: 'rgba(255,255,255,0.6)', marginTop: 0},
      noBothMargin: {marginTop: 0, marginBottom: 0},
      button: {margin: '10px auto'}
    };
  },

  render: function(){
    const styles = this.getStyles();

    return (
      <div className="full height main container" style={styles.root}>
        <div className="ui green inverted segment">
          <h1 style={styles.noMarginTop}>一起來監督施政吧</h1>
          <h4 style={styles.noMarginTop}>查詢政府首長施政進度</h4>
          <h5 style={styles.small}>從左側選單挑選要看的縣市長</h5>
          <h4 style={styles.noMarginTop}>貼上新聞連結，更新施政進度</h4>
          <h5 style={styles.small}>進度開放編輯，只要附上訊息出處，就能更新施政進度</h5>
          <div className="ui clearing divider white"></div>
          <h3 style={styles.noBothMargin}>我知道了</h3>
        </div>

        <div className="ui green segment">
          <h1 className="ui header green" style={styles.noMarginTop}>近期更新</h1>
          <div className="ui clearing divider white"></div>
          <div className="ui list">
            <div className="item">
              <img className="ui top aligned avatar image" src="http://semantic-ui.com/images/avatar/small/daniel.jpg"/>
              <div className="content">
                <div className="header">台中市政府社會局</div>
                申請生育津貼，單胞胎一萬元，雙胞胎新台幣...
              </div>
            </div>
            <div className="ui clearing divider white"></div>
            <div className="item">
              <img className="ui top aligned avatar image" src="http://semantic-ui.com/images/avatar/small/steve.jpg"/>
              <div className="content">
                <div className="header">台中市政府社會局</div>
                申請生育津貼，單胞胎一萬元，雙胞胎新台幣...
              </div>
            </div>
          </div>
        </div>

        <div className="ui green segment">
          <h1 className="ui header green" style={styles.noMarginTop}>進度大家評</h1>
          <div className="ui clearing divider white"></div>
          <div className="ui list">
            <div className="item">
              台中市政府辦理年滿六十五歲以上老人及身心障礙者乘車補助
              <h5>你認為胡自強的政見達成率？</h5>
              <div className="ui buttons" style={styles.button}>
                <div className="ui red button">沒有做</div>
                <div className="ui blue button">還在做</div>
                <div className="ui green button">已完成</div>
              </div>
            </div>
            <div className="ui clearing divider white"></div>
            <div className="item">
              胡志強稍微胖了：捷運跳票後派 BRT 上火線，可是模型回不去了
              <h5>你認為胡自強的政見達成率？</h5>
              <div className="ui buttons" style={styles.button}>
                <div className="ui red button">沒有做</div>
                <div className="ui blue button">還在做</div>
                <div className="ui green button">已完成</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Transmit.createContainer(Home, {});
