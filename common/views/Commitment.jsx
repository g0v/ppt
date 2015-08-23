import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {fetchData} from '../actions/';
import { ListDivider } from 'material-ui';
import ForwardIcon from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import AutoLinkText from 'react-autolink-text';
import pptColors from '../styles/color';
import pptSpacing from '../styles/spacing';
import Loading from './Loading.jsx';
import ProgressReport from './ProgressReport.jsx';

// const debug = require('debug')('ppt:commiment');

@createEnterTransitionHook(store => (state/* , transition */) => {
  const { entities } = store.getState();
  const { params: { id } } = state;
  if (!entities.commitments[id]) {
    return store.dispatch(fetchData('Commitment', {
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
    }));
  }
})
class Commitment extends React.Component {

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
    const { commitments, progressReports, progressReportHistories, progressRatings,
      isLoading, errorMessage } = this.props;
    const commitment = commitments && commitments[0];

    const reports = commitment.progressReports && commitment.progressReports.
      map(reportID => progressReports[reportID]);
    let oldProgressReports;
    let latestProgressReport;

    if (isLoading || errorMessage || !commitment) {
      return (
        <div style={styles.root}>
          { isLoading ? <Loading /> :
            errorMessage ? errorMessage :
            '沒有這個承諾喔！'}
        </div>
      );
    }

    if (reports && reports.length > 0) {
      // slice reports into two parts
      latestProgressReport = reports[0];

      oldProgressReports = reports.slice(1);
    }

    const oldProgressReportElems = oldProgressReports.map((report, idx)=> {
      return (
        <ProgressReport key={idx} history={report.progressReportHistories.map(historyID =>
          progressReportHistories[historyID])}
          ratings={report.progressRatings.map(ratingID =>
          progressRatings[ratingID])}
          isExpanded={false}/>
      );
    });
    let progressReportElems = [];

    if (latestProgressReport) {
      progressReportElems.push(
        <section key="latest">
          <h4 style={styles.h4}>最新進展</h4>
          <ProgressReport history={latestProgressReport.progressReportHistories.map(historyID =>
            progressReportHistories[historyID])}
            ratings={latestProgressReport.progressRatings.map(ratingID =>
            progressRatings[ratingID])}
            isExpanded={true}/>
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

Commitment.propTypes = {
  id: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.params;
  return {
    id,
    ...state,
  };
}

export default connect(
  mapStateToProps,
)(Commitment);
