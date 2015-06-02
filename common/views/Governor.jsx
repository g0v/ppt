var React = require('react'),
    debug = require('debug')('ppt:governor'),
    styles = require('./styles.js'),
    Transmit = require('react-transmit'),
    findAll = require('../utils/findAll'),
    ProgressIcon = require('./ProgressIcon.jsx');

import {handleRoute, NavLink} from 'fluxible-router';

var Governor = React.createClass({

  componentWillMount () {
    console.log("componentWillMount", this.props.currentRoute.get('params').get('name'));
    this.props.setQueryParams({
      name: this.props.currentRoute.get('params').get('name')
    });
  },

  render () {
    debug('render', this.props);

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

          if(policy.promises){
            var promiseElems = policy.promises.map(function(promise){
              //make sure progressReports exists
              if (promise.progressReports) {
                var latestProgressReport = promise.progressReports[promise.progressReports.length - 1],
                    totalRateCount = latestProgressReport ? latestProgressReport.progressRatings.length : 0,
                    rating = 'notyet';
              }

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
          }

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

Governor = handleRoute(Governor);

module.exports = Transmit.createContainer(Governor, {
  queries: {
    governor(queryParams) {
      debug("queryParams", queryParams);

      if(!queryParams.name){
        return Promise.resolve({isLoading: true});
      }

      return findAll('Governor', {
        where: {
          name: queryParams.name
        },
        include: [
          { association: 'Terms' },
          {
            association: 'Policies',
            include: [
              {
                association: 'Promises',
                include: [
                  {
                    association: 'ProgressReports',
                    include: [
                      { association: 'ProgressReportHistories' },
                      { association: 'ProgressRatings' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      });
    }
  }
});
