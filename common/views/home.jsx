var React = require('react'),
    styles = require('./styles.js');

var Home = React.createClass({
  render: function(){
    var noMarginTopStyle = {marginTop: 0},
        smallStyle = {color: 'rgba(255,255,255,0.6)', marginTop: 0},
        noBothMarginStyle = {marginTop: 0, marginBottom: 0},
        buttonStyle = {margin: '10px auto'};


    return (
      <div className="full height main container" style={styles.mainContainer}>
        <div className="ui green inverted segment">
          <h1 style={noMarginTopStyle}>一起來監督施政吧</h1>
          <h4 style={noMarginTopStyle}>查詢政府首長施政進度</h4>
          <h5 style={smallStyle}>從左側選單挑選要看的縣市長</h5>
          <h3 style={noMarginTopStyle}>貼上新聞連結，更新施政進度</h3>
          <h5 style={smallStyle}>進度開放編輯，只要附上訊息出處，就能更新施政進度</h5>
          <div className="ui clearing divider white"></div>
          <h3 style={noBothMarginStyle}>我知道了</h3>
        </div>

        <div className="ui green segment">
          <h1 className="ui header green" style={noMarginTopStyle}>近期更新</h1>
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
          <h1 className="ui header green" style={noMarginTopStyle}>進度大家評</h1>
          <div className="ui clearing divider white"></div>
          <div className="ui list">
            <div className="item">
              台中市政府辦理年滿六十五歲以上老人及身心障礙者乘車補助
              <h5>你認為胡自強的政見達成率？</h5>
              <div className="ui buttons" style={buttonStyle}>
                <div className="ui red button">沒有做</div>
                <div className="ui blue button">還在做</div>
                <div className="ui green button">已完成</div>
              </div>
            </div>
            <div className="ui clearing divider white"></div>
            <div className="item">
              胡志強稍微胖了：捷運跳票後派 BRT 上火線，可是模型回不去了
              <h5>你認為胡自強的政見達成率？</h5>
              <div className="ui buttons" style={buttonStyle}>
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

module.exports = Home;
