var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link,
    styles = require('./styles.js'),
    Transmit = require('react-transmit'),
    fetch = require('../utils/fetch'),
    ProgressIcon = require('./ProgressIcon.jsx'),
    RouteStore = require('../stores/RouteStore');

var Governer = React.createClass({
  mixins: [
    require('fluxible').FluxibleMixin
  ],

  statics: {
    storeListeners: {onRouteChange: [RouteStore]}
  },

  onRouteChange () {
    this.props.setQueryParams({
      name: this.getStore(RouteStore).getCurrentRoute().get('params').get('name')
    });
  },

  componentWillMount () {
    this.onRouteChange();
  },

  render: function(){
    if(this.props.governor.isLoading){
      return (
        <div className="full height main container" style={styles.mainContainer}>
          <p>Loading...</p>
        </div>
      );
    }

    var governorStats = {
      notyet: 0,
      doing: 0,
      done: 0
    };

    var governer = this.props.governor,
        policyElems = governer.policies.map(function(policy){
          var promiseElems = policy.promises.map(function(promise){
            var latestProgressReport = promise.progressReports[promise.progressReports.length - 1],
                totalRateCount = latestProgressReport ? latestProgressReport.progressRatings.length : 0,
                rating = 'notyet';

            // Find the most-popular progress rating
            //
            if(latestProgressReport && latestProgressReport.progressRatings.length > 0){
              let rateCounts = {
                notyet: 0,
                doing: 0,
                done: 0
              }, mostCount = 0;

              latestProgressReport.progressRatings.forEach((rating) => {
                rateCounts[rating.progress] += 1;

                if(mostCount < rateCounts[rating.progress]){
                  mostCount = rateCounts[rating.progress];
                  rating = rating.progress;
                }
              });
            }

            governorStats[rating] += 1;

            return (
              <Link to="promise" params={{id: promise.id}} className="ui item" key={promise.id}>
                <ProgressIcon progress={rating} className="ui top aligned avatar image"/>
                <div className="content">
                  <div className="header">{promise.brief}</div>
                  <div className="description">{promise.content}</div>
                  <p>{totalRateCount} 人評進度</p>
                </div>
              </Link>
            )
          });

          return (
            <div className="ui green segment" key={policy.id}>
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
        <section>
          <img src={governer.avatar} />
          <div className="ui three column grid">
            <div className="column">
              <div>{governorStats.notyet}</div>
              <div>還沒做</div>
            </div>
            <div className="column">
              <div>{governorStats.doing}</div>
              <div>正在做</div>
            </div>
            <div className="column">
              <div>{governorStats.done}</div>
              <div>已完成</div>
            </div>
          </div>
        </section>

        {policyElems}
      </div>
    );
  }
});

module.exports = Transmit.createContainer(Governer, {
  queries: {
    governor(queryParams) {

      if(!queryParams.name){
        return Promise.resolve({isLoading: true});
      }

      return fetch('/api/Governors/findOne', {
        filter: {
          where: {
            name: queryParams.name
          },
          include: [
            {
              policies: {
                promises: {
                  progressReports: ['progressReportHistories', 'progressRatings']
                }
              }
            },
            'terms'
          ]
        }
      }).then(function(res){
        return res.json()
      });
    }
  }
});
