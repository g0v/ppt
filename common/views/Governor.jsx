import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {fetchData} from '../actions/';
import {PROGRESS_OPTIONS} from '../config/constants';
import {majority, findLatestProgressReport} from '../utils';
import mui, { Avatar } from 'material-ui';
import Loading from './Loading.jsx';
import ProgressBar from './ProgressBar.jsx';
import PolicySection from './PolicySection.jsx';
import pptColors from '../styles/color';
import pptSpacing from '../styles/spacing';

// const debug = require('debug')('ppt:Governor');
const { AutoPrefix } = mui.Styles;

@createEnterTransitionHook(store => (state/* , transition */) => {
  const { entities } = store.getState();
  const { params: { name } } = state;
  if (!entities.governors[name]) {
    return store.dispatch(fetchData('Governor', {
      where: {
        name: name,
      },
      include: [
        {association: 'Terms'},
        {
          association: 'Policies',
          include: [
            {
              association: 'Commitments',
              include: [
                {
                  association: 'ProgressReports',
                  include: [
                    {association: 'ProgressReportHistories'},
                    {association: 'ProgressRatings'},
                  ],
                },
              ],
            },
          ],
        },
      ],
    }));
  }
})

class Governor extends React.Component {
  getStyles() {
    return {
      root: {
        paddingTop: pptSpacing.appBarHeight,
        height: '100%',
        width: '100%',
      },
      section: {
        backgroundImage: `url('/images/coverphoto.png')`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        width: '100%',
        height: '240',
        maxWidth: '720',
        margin: '0px auto 10px',
        position: 'relative',
      },
      avatar: {
        display: 'block',
        height: '72',
        width: '72',
        position: 'absolute',
        top: 24,
        left: '42.5%',
      },
      progressBar: {
        position: 'absolute',
        margin: 'auto',
        width: '90%',
        top: 120,
        left: '5%',
      },
      textSection: {
        position: 'absolute',
        width: '90%',
        height: 65,
        top: 145,
        left: '5%',
      },
      textBox: {
        display: 'inline-block',
        height: '100%',
        width: '33.3333%',
        textAlign: 'center',
        opacity: 0.56,
      },
      policySection: {
        padding: '0px 8px',
        width: '100%',
        maxWidth: 960,
        margin: '10px auto',
        boxSizing: 'border-box',
      },
    };
  }

  render() {
    const styles = this.getStyles();
    const {governors, policies, commitments, progressReports, progressRatings,
      isLoading, errorMessage, name} = this.props;
    const governor = governors[0];
    let governorStats = {};

    if (isLoading || errorMessage || !governor) {
      return (
        <div style={styles.root}>
          { isLoading ? <Loading /> :
            errorMessage ? errorMessage : (
            <section>
              找不到執政者「{name}」 :(
            </section>)}
        </div>
      );
    }
    const policyElems = governor.policies && governor.policies.map(policyID => (
      <PolicySection name={policies[policyID].name}
                     commitments={policies[policyID].commitments.map(id => commitments[id])}
                     key={policyID} />
    ));

    // Gather commitment stats for the governor
    // TODO: port this part to state
    governor.policies && governor.policies.forEach(policyID => {
      policies[policyID].commitments.forEach(commitmentID => {
        const latestReport = findLatestProgressReport(commitments[commitmentID].
          progressReports.map(id => progressReports[id]));
        const progress = latestReport && majority(latestReport.progressRatings.
          map(id => progressRatings[id].progress)) || PROGRESS_OPTIONS[0];

        governorStats[progress] = governorStats[progress] + 1 || 1;
      });
    });

    return (
      <div style={styles.root}>
        <section style={styles.section}>
          <Avatar style={styles.avatar} src={governor.avatar} />
          <ProgressBar style={styles.progressBar} stats={governorStats} />
          <div style={styles.textSection}>
            <div style={{...styles.textBox, color: pptColors.primaryRed}}>
              <div style={{fontSize: 34, lineHeight: '45px'}}>{governorStats.notyet || 0}</div>
              <div style={{fontSize: 14, lineHeight: '21px'}}>還沒做</div>
            </div>
            <div style={{...styles.textBox, color: pptColors.primaryYellow}}>
              <div style={{fontSize: 34, lineHeight: '45px'}}>{governorStats.doing || 0}</div>
              <div style={{fontSize: 14, lineHeight: '21px'}}>正在做</div>
            </div>
            <div style={{...styles.textBox, color: pptColors.primaryBlue}}>
              <div style={{fontSize: 34, lineHeight: '45px'}}>{governorStats.done || 0}</div>
              <div style={{fontSize: 14, lineHeight: '21px'}}>已完成</div>
            </div>
          </div>
        </section>
        <div style={AutoPrefix.all(styles.policySection)}>
          {policyElems}
        </div>
      </div>
    );
  }
}

Governor.propTypes = {
  name: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  const { name } = ownProps.params;
  return {
    name,
    ...state,
  };
}

export default connect(
  mapStateToProps,
)(Governor);
