var React = require('react'),
    mui = require('material-ui'),
    {Tabs, Tab} = mui,
    debug = require('debug')('ppt:governor'),
    styles = require('./styles.js'),
    Transmit = require('react-transmit'),
    findAll = require('../utils/findAll'),
    ProgressIcon = require('./ProgressIcon.jsx'),
    Loading = require('./Loading.jsx');

import PolicySection from './PolicySection.jsx';
import {handleRoute, NavLink} from 'fluxible-router';
var Spacing = mui.Styles.Spacing;

var Governor = React.createClass({
  getStyles() {
    return {
      root: {
        paddingTop: Spacing.desktopKeylineIncrement
      }
    };
  },

  render () {
    var governorStats = {
      notyet: 0,
      doing: 0,
      done: 0
    };

    var governor = this.props.governors[0],
        policyElems = governor.Policies.map(policy => (
          <PolicySection name={policy.name}
                         commitments={policy.Commitments}
                         key={policy.id} />
        ));

    return (
      <div style={styles.root}>
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
        <Tabs>
          <Tab label={"目前進展"}>
            {policyElems}
          </Tab>
          <Tab label={"任期間更新"} />
        </Tabs>

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
