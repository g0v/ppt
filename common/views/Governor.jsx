import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import createEnterTransitionHook from '../decorators/createEnterTransitionHook';
import {fetchDataCreator} from '../actions';
import mui, { Avatar } from 'material-ui';
import Loading from './Loading.jsx';
import ProgressBar from './ProgressBar.jsx';
import PolicySection from './PolicySection.jsx';
import pptColors from '../styles/color';
import pptSpacing from '../styles/spacing';

const debug = require('debug')('ppt:Governor');
const { AutoPrefix } = mui.Styles;

function mapStateToProps(state, ownProps) {
  const { name } = ownProps.params;
  const governor = state.entities.governors[name];
  const governorStats = state.stats.governors[name];
  debug('state.isLoading', state.isLoading);
  return {
    name,
    governor,
    governorStats,
  };
}

@createEnterTransitionHook(store => (state/* , transition */) => {
  const { entities } = store.getState();
  const { params: { name } } = state;
  const dataAction = fetchDataCreator('Governor', {
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
  });
  if (!entities.governors[name]) {
    debug('dispatch Governor dataAction');
    return store.dispatch(dataAction);
  }
})

@connect(mapStateToProps)
export default class Governor extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    governor: PropTypes.object,
    governorStats: PropTypes.object,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
  }

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
    const {governor, governorStats, isLoading, errorMessage, name} = this.props;

    if (isLoading) {
      return (
        <div style={styles.root}>
          <section>
            <Loading />
          </section>
        </div>
      );
    } else if (errorMessage) {
      return (
        <div style={styles.root}>
          <section>
            {errorMessage}
          </section>
        </div>
      );
    } else if (!governor) {
      return (
        <div style={styles.root}>
          <section>
            找不到執政者「{name}」 :(
          </section>)
        </div>
      );
    }

    const policyElems = governor.Policies && governor.Policies.map(policyID => (
      <PolicySection policyID={policyID} key={policyID} />
    ));

    return (
      <div style={styles.root}>
        <section style={styles.section}>
          <Avatar style={styles.avatar} src={governor.avatar} />
          <ProgressBar style={styles.progressBar} stats={governorStats || {}} />
          <div style={styles.textSection}>
            <div style={{...styles.textBox, color: pptColors.primaryRed}}>
              <div style={{fontSize: 34, lineHeight: '45px'}}>{governorStats && governorStats.notyet || 0}</div>
              <div style={{fontSize: 14, lineHeight: '21px'}}>還沒做</div>
            </div>
            <div style={{...styles.textBox, color: pptColors.primaryYellow}}>
              <div style={{fontSize: 34, lineHeight: '45px'}}>{governorStats && governorStats.doing || 0}</div>
              <div style={{fontSize: 14, lineHeight: '21px'}}>正在做</div>
            </div>
            <div style={{...styles.textBox, color: pptColors.primaryBlue}}>
              <div style={{fontSize: 34, lineHeight: '45px'}}>{governorStats && governorStats.done || 0}</div>
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
