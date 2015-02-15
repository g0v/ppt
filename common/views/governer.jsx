var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link,
    styles = require('./styles.js'),
    ProgressIcon = require('./progress-icon.jsx');

var Governer = React.createClass({
  mixins: [Router.State],
  getInitialState: function(){
    return {
      name: this.getParams().name,
      avatar: "http://semantic-ui.com/images/avatar/small/daniel.jpg",
      coverPhoto: this.props.assetHost + "/images/coverphoto.png",
      policies: [
        {
          name: "社會福利",
          promises: [
            {
              id: 1,
              brief: "台中縣、市婦女生育，每位新生兒補助一萬元",
              content: "台中市政府社會局申請生育津貼，金額為單胞胎新臺幣ㄧ萬元，雙胞胎新臺幣三萬元，三胞胎以⋯⋯",
              createdAt: "",
              progressRating: {
                progress: 'doing',
                count: 2
              }
            },
            {
              id: 2,
              brief: "滿六十五歲以上老人，每月一千元免費搭乘公車",
              content: "臺中市政府辦理年滿 65 歲以上老人及身心障礙者乘車補助，免費乘車額度每月1,000點。",
              createdAt: "",
              progressRating: {
                progress: 'doing',
                count: 1
              }
            }
          ],
          stats: {
            notyet: 0,
            doing: 2,
            done: 0
          }
        },
        {
          name: "交通系統建設",
          promises: [
          ],
          stats: {
            notyet: 0,
            doing: 0,
            done: 0
          }
        }
      ],
      stats: {
        done: 6,
        doing: 18,
        notyet: 19
      }
    }
  },

  render: function(){
    var headerStyle = {

    };

    var governer = this.state,
        policyElems = governer.policies.map(function(policy){
          var promiseElems = policy.promises.map(function(promise){
            return (
              <Link to="promise" params={{id: promise.id}} className="ui item">
                <ProgressIcon progress={promise.progressRating.progress} className="ui top aligned avatar image"/>
                <div className="content">
                  <div className="header">{promise.brief}</div>
                  <div className="description">{promise.content}</div>
                  <p>{promise.progressRating.count} 人評進度</p>
                </div>
              </Link>
            )
          });

          return (
            <div className="ui green segment">
              <h1 className="ui header green">
                {policy.name}
              </h1>
              <div className="ui list">
                {promiseElems}
              </div>
            </div>
          )
        });

    return (
      <div className="full height main container" style={styles.mainContainer}>
        <section style={headerStyle}>
          <img src={governer.avatar} />
          <div className="ui three column grid">
            <div className="column">
              <div>{governer.stats.notyet}</div>
              <div>還沒做</div>
            </div>
            <div className="column">
              <div>{governer.stats.doing}</div>
              <div>正在做</div>
            </div>
            <div className="column">
              <div>{governer.stats.done}</div>
              <div>已完成</div>
            </div>
          </div>
        </section>

        {policyElems}
      </div>
    );
  }
});

module.exports = Governer;
