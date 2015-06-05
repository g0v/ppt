var React = require('react'),
    mui = require('material-ui'),
    {Tabs, Tab} = mui,
    Transmit = require('react-transmit'),
    fetch = require('../utils/fetch');

import PolicySection from './PolicySection.jsx';
import {handleRoute} from 'fluxible-router';
import debug from 'debug';
const debugGovernor = debug('ppt:governor');

var Spacing = mui.Styles.Spacing;

var Governor = React.createClass({

  onRouteChange () {
    this.props.setQueryParams({
      name: decodeURIComponent(this.props.currentRoute.get('params').get('name'))
    });
  },

  componentWillMount () {
    this.onRouteChange();
  },

  getStyles() {
    return {
      root: {
        paddingTop: Spacing.desktopKeylineIncrement
      }
    };
  },

  render: function(){

    var styles = this.getStyles();

    if(this.props.governor.isLoading){
      return (
        <div style={styles.root}>
          <p>Loading...</p>
        </div>
      );
    }

    var governorStats = {
      notyet: 0,
      doing: 0,
      done: 0
    };

    var governor = this.props.governor;
    var policyElems = governor.policies.map(function(policy){
      return (
        <PolicySection name={policy.name} promises={policy.promises} key={policy.id} />
      );
    });

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
          <Tab label={"任期間更新"}/>
        </Tabs>
      </div>
    );
  }
});

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
