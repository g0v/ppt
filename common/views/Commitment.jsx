var React = require('react'),
    debug = require('debug')('ppt:commiment'),
    Loading = require('./Loading.jsx'),
    Transmit = require('react-transmit');

import {handleRoute} from 'fluxible-router';
import { findAll } from '../utils/';
import { ListDivider } from 'material-ui';
import ForwardIcon from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import AutoLinkText from 'react-autolink-text';
import pptColors from '../styles/color';
import pptSpacing from '../styles/spacing';
import ProgressReport from './ProgressReport.jsx'

var Commitment = React.createClass({

  getStyles() {
    return {
      root: {
        paddingTop: pptSpacing.appBarHeight + 26
      },
      h4: {
        color: pptColors.primaryBlue,
        margin: 10
      },
      brief: {
        fontSize: 24,
        color: pptColors.primaryBlue,
        margin: 10
      },
      content: {
        fontSize: 14,
        color: pptColors.darkGray,
        margin: 20
      },
      source: {
        display: 'inline-block',
        color: pptColors.lightBlack,
        marginLeft: 20,
      },
      forwardIcon: {
        fill: pptColors.lightBlack,
        marginRight: '5%'
      }
    };
  },

  render: function() {
    var styles = this.getStyles(),
        oldProgressReports = [],
        progressReports,
        latestProgressReport,
        commitment = this.props.commitments && this.props.commitments[0];

    if (!commitment) {
      return (
        <div style={styles.root}>
          沒有這個承諾喔！
        </div>
      )
    }

    progressReports = commitment.ProgressReports;

    if (progressReports && progressReports.length > 0) {
      latestProgressReport = progressReports[0];

      oldProgressReports = progressReports.slice(1);
    }

    var oldProgressReportElems = oldProgressReports.map(function(report, idx) {
      return (
        <ProgressReport key={idx}
                        history={report.ProgressReportHistories}
                        ratings={report.ProgressRatings}
                        isExpanded={false}/>
      );
    }),
        progressReportElems = [];

    if (latestProgressReport) {
      progressReportElems.push(
        <section key="latest">
          <h4 style={styles.h4}>最新進展</h4>
          <ProgressReport history={latestProgressReport.ProgressReportHistories}
                          ratings={latestProgressReport.ProgressRatings}
                          isExpanded={true}/>
        </section>
      )
    }

    if (oldProgressReportElems && oldProgressReportElems.length) {
      progressReportElems.push(
        <section>
          <h4 style={styles.h4}>進度歷程</h4>
          {oldProgressReportElems}
        </section>
      );
    }

    return (
      <div style={styles.root}>
        <header>
          <blockquote style={styles.brief}> {commitment.brief} </blockquote>
          <div>
            <ForwardIcon style={{...styles.source, ...styles.forwardIcon}}/>
            <p style={styles.source}>
              承諾出處：
              <AutoLinkText text={commitment.reference}/>
            </p>
          </div>
          <div style={styles.content}>
            {commitment.content}
          </div>
        </header>
        <ListDivider inset={true} />
        {progressReportElems}
      </div>
    );
  }
});

Commitment = Transmit.createContainer(Commitment, {
  queries: {
    commitments(queryParams) {
      return findAll('Commitment', {
        where: {
          id: queryParams.id
        },
        include: [
          {
            association: 'ProgressReports',
            include: [
              {
                association: 'ProgressReportHistories',
                include: [
                  {association: 'User'}
                ]
              },
              {
                association: 'ProgressRatings',
                include: [
                  {association: 'User'}
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
var CommitmentQuerySetter = React.createClass({
  _makeQueryParams () {
    return {
      id: this.props.currentRoute.get('params').get('id')
    }
  },

  render () {
    return (
      <Commitment queryParams={this._makeQueryParams()}
        emptyView={<Loading />} ref="Commitment"
        {...this.props}
      />
    );
  },

  componentDidUpdate(prevProps) {
    if (prevProps.currentRoute !== this.props.currentRoute) {
      this.refs.Commitment.setQueryParams(this._makeQueryParams());
    }
  }
});

module.exports = handleRoute(CommitmentQuerySetter);
