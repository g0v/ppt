var React = require('react'),
    styles = require('./styles.js'),
    Transmit = require('react-transmit'),
    fetch = require('../utils/fetch'),
    ProgressIcon = require('./ProgressIcon.jsx');

import {handleRoute, NavLink} from 'fluxible-router';
import debug from 'debug';
const debugGovernor = debug('ppt:governor');

var Governor = React.createClass({

  onRouteChange () {
    debugGovernor('props params name', this.props.currentRoute.get('params').get('name'));

    this.props.setQueryParams({
      name: decodeURIComponent(this.props.currentRoute.get('params').get('name'))
    });
  },

  componentWillMount () {
    this.onRouteChange();
  },

  render: function(){
    debugGovernor('governor', this.props.governor);

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

    var governor = this.props.governor,
        policyElems = governor.policies.map(function(policy){
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
              <NavLink routeName='promise' navParams={{id: promise.id}} className="ui item" key={promise.id}>
                <ProgressIcon progress={rating} className="ui top aligned avatar image"/>
                <div className="content">
                  <div className="header">{promise.brief}</div>
                  <div className="description">{promise.content}</div>
                  <p>{totalRateCount} 人評進度</p>
                </div>
              </NavLink>
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
          <img src={governor.avatar} />
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

Governor.contextTypes = {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
};

Governor = handleRoute(Governor);

module.exports = Transmit.createContainer(Governor, {
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
