import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import createEnterTransitionHook from '../decorators/createEnterTransitionHook';
import {fetchDataCreator} from '../actions/';
import { ListDivider } from 'material-ui';
import ForwardIcon from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import AutoLinkText from 'react-autolink-text';
import pptColors from '../styles/color';
import pptSpacing from '../styles/spacing';
import Loading from './Loading.jsx';
import ProgressReport from './ProgressReport.jsx';
import flatten from 'lodash/array/flatten';

const debug = require('debug')('ppt:commiment');

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.params;
  const { commitments } = state.entities;
  const reports = commitments[id].ProgressReports;
  return {
    commitment: commitments[id],
    latestReportID: reports && reports[0],
    oldReportsID: reports && reports.length > 1 && reports.slice(1),
  };
}

@createEnterTransitionHook(store => (state/* , transition */) => {
  const { entities } = store.getState();
  const { params: { id } } = state;
  const dataAction = fetchDataCreator('Commitment', {
    where: {
      id: id,
    },
    include: [
      {
        association: 'ProgressReports',
        include: [
          {
            association: 'ProgressReportHistories',
            include: [
              {association: 'User'},
            ],
          },
          {
            association: 'ProgressRatings',
            include: [
              {association: 'User'},
            ],
          },
        ],
      },
    ],
  });

  const {commitments, progressReports, progressRatings, users} = entities;
  const commitment = commitments[id];
  if (!commitment) {
    debug('dispatch Commitment dataAction because commiment not in state');
    return Promise.resolve(store.dispatch(dataAction()));
  }

  const allRatings = commitment.ProgressReports.map(reportID =>
    progressReports[reportID].ProgressRatings);

  const allRatingUsers = flatten(allRatings).map(ratingID =>
    progressRatings[ratingID].User);

  const allRatingUsersExist = allRatingUsers.every(userID => users[userID]);
  if (!allRatingUsersExist) {
    // need to fetch user data if relevant user(s) data doesn't exist
    debug('dispatch Commitment dataAction because no relevant users int state');
    return Promise.resolve(store.dispatch(dataAction()));
  }
})

@connect(mapStateToProps)
export default class Commitment extends React.Component {

  static propTypes = {
    commitment: PropTypes.object,
    latestReportID: PropTypes.number,
    oldReportsID: PropTypes.arrayOf(PropTypes.number),
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
  }

  getStyles() {
    return {
      root: {
        paddingTop: pptSpacing.appBarHeight + 26,
      },
      h4: {
        color: pptColors.primaryBlue,
        margin: 10,
      },
      brief: {
        fontSize: 24,
        color: pptColors.primaryBlue,
        margin: 10,
      },
      content: {
        fontSize: 14,
        color: pptColors.lightBlack,
        margin: 20,
      },
      source: {
        display: 'inline-block',
        color: pptColors.darkBlack,
        marginLeft: 20,
      },
      forwardIcon: {
        fill: pptColors.darkBlack,
        marginRight: '5%',
      },
    };
  }

  render() {
    const styles = this.getStyles();
    const { commitment, latestReportID, oldReportsID, isLoading, errorMessage } = this.props;

    if (isLoading || errorMessage || !commitment) {
      return (
        <div style={styles.root}>
          { isLoading ? <Loading /> :
            errorMessage ? errorMessage :
            '沒有這個承諾喔！'}
        </div>
      );
    }

    const oldProgressReportElems = oldReportsID && oldReportsID.map((reportID)=> {
      return (
        <ProgressReport key={reportID} reportID={reportID} isExpanded={false}/>
      );
    });
    const progressReportElems = [];

    if (latestReportID) {
      progressReportElems.push(
        <section key="latest">
          <h4 style={styles.h4}>最新進展</h4>
          <ProgressReport reportID={latestReportID} isExpanded={true}/>
        </section>
      );
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
}
