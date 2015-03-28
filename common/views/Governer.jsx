var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link,
    styles = require('./styles.js'),
    ProgressIcon = require('./ProgressIcon.jsx');

var Governer = React.createClass({
  mixins: [require('fluxible').FluxibleMixin],

  getInitialState: function(){
    return this.getStore(require('../stores/GovernerStore')).data
  },

  render: function(){
    var headerStyle = {
    };

    var governer = this.state,
        policyElems = governer.policies.map(function(policy, policyIdx){
          var promiseElems = policy.promises.map(function(promise, promiseIdx){
            return (
              <Link to="promise" params={{id: promise.id}} className="ui item" key={promiseIdx}>
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
            <div className="ui green segment" key={policyIdx}>
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
