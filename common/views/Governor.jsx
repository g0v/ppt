var React = require('react'),
    debug = require('debug')('ppt:governor'),
    styles = require('./styles.js'),
    Transmit = require('react-transmit'),
    findAll = require('../utils/findAll'),
    ProgressIcon = require('./ProgressIcon.jsx'),
    Loading = require('./Loading.jsx');

import {handleRoute, NavLink} from 'fluxible-router';

var Governor = React.createClass({
  render () {
    var governorStats = {
      notyet: 0,
      doing: 0,
      done: 0
    };

    var governor = this.props.governors[0],
        policyElems = governor.Policies.map(function(policy){

          if(policy.Commitments){
            var commitmentElems = policy.Commitments.map(function(commitment){
              //make sure progressReports exists
              if (commitment.ProgressReports) {
                var latestProgressReport = commitment.ProgressReports[commitment.ProgressReports.length - 1],
                    totalRateCount = latestProgressReport ? latestProgressReport.ProgressRatings.length : 0,
                    rating = 'notyet';
              }

              // Find the most-popular progress rating
              //
              if(latestProgressReport && latestProgressReport.ProgressRatings.length > 0){
                let rateCounts = {
                  notyet: 0,
                  doing: 0,
                  done: 0
                }, mostCount = 0;

                latestProgressReport.ProgressRatings.forEach((rating) => {
                  rateCounts[rating.progress] += 1;

                  if(mostCount < rateCounts[rating.progress]){
                    mostCount = rateCounts[rating.progress];
                    rating = rating.progress;
                  }
                });
              }

              governorStats[rating] += 1;

              return (
                <NavLink routeName='commitment' navParams={{id: commitment.id}} className="ui item" key={commitment.id}>
                  <ProgressIcon progress={rating} className="ui top aligned avatar image"/>
                  <div className="content">
                    <div className="header">{commitment.brief}</div>
                    <div className="description">{commitment.content}</div>
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
                {commitmentElems}
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

Governor = Transmit.createContainer(Governor, {
  queries: {
    governors(queryParams) {
      debug("queryParams", queryParams);
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
                association: 'Commitments',
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

// Setup React-transmit via props
//
var GovernorQuerySetter = React.createClass({
  _makeQueryParams () {
    return {
      name: this.props.currentRoute.get('params').get('name')
    }
  },

  render() {
    return (
      <Governor queryParams={this._makeQueryParams()} emptyView={<Loading />}
        {...this.props}
        ref="governor"
      />
    );
  },

  componentDidUpdate(prevProps) {
    if(prevProps.currentRoute !== this.props.currentRoute){
      this.refs.governor.setQueryParams(this._makeQueryParams());
    }
  }
})

module.exports = handleRoute(GovernorQuerySetter);
