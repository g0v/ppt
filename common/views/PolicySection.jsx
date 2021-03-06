import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import mui, {Paper} from 'material-ui';
import CommitmentListItem from './CommitmentListItem.jsx';
import ProgressBar from './ProgressBar.jsx';
import ExpandMore from 'material-ui/lib/svg-icons/navigation/expand-more';
import ExpandLess from 'material-ui/lib/svg-icons/navigation/expand-less';
import {createProgressIcon} from '../utils';
import pptColors from '../styles/color';

const {Transitions} = mui.Styles;
// const debug = require('debug')('ppt:PolicySection');

class PolicySection extends React.Component {

  static propTypes = {
    policy: PropTypes.object,
    policyStats: PropTypes.object,
    allCommitmentStats: PropTypes.object,
    commitments: PropTypes.object,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
  }

  componentDidUpdate() {
    this.determineHeight();
  }

  getStyles() {
    return {
      root: {
        marginBottom: 8,
      },
      expandIcon: {
        fill: pptColors.black,
        height: '30px',
        width: '30px',
      },
      progressBar: {
        height: 6.5,
        maxWidth: 540,
        margin: '0px 16px 10px',
      },
      commitmentWrapper: {
        overflow: 'hidden',
        transition: Transitions.easeOut('500ms', 'opacity'),
        height: 0,
        opacity: 0,
      },
      totalRateCount: {
        color: pptColors.darkBlack,
        fontSize: 14,
      },
    };
  }

  render() {
    const styles = this.getStyles();
    const {policy, policyStats, commitments, allCommitmentStats} = this.props;

    const commitmentElems = policy.Commitments && policy.Commitments.map(commimentID => {
      const commitment = commitments[commimentID];
      const {latestRateCount, majorityProgress} = allCommitmentStats[commimentID];
      const contentAndRate = (
        <p>
        <span>{commitment.content}</span>
        <p style={styles.totalRateCount}> {latestRateCount} 人評進度</p>
        </p>
      );

      return (
        <CommitmentListItem
          leftIcon={createProgressIcon(majorityProgress)}
          primaryText={commitment.brief}
          secondaryText={contentAndRate}
          secondaryTextLines={2}
          onTouchTap = {this.handleCommitmentTap.bind(this, commimentID)}
          key={commimentID} />
      );
    });

    const headerSecondaryText = policyStats && (
        <p>{Object.keys(policyStats).reduce((x, key) => {
          let sum = x;
          sum += policyStats[key];
          return sum;
        }, 0)}項承諾 • {policyStats.notyet || 0} 還沒做 / {policyStats.doing || 0} 正在做 /
        &nbsp;{policyStats.done || 0} 已完成
        </p>
    );

    const policyHeader = (
      <CommitmentListItem rightIcon={ this.state.open ? <ExpandLess style={styles.expandIcon} /> :
          <ExpandMore style={styles.expandIcon} />}
        primaryText={<p>{policy.name} </p>}
        secondaryText={headerSecondaryText}
        onTouchTap={::this.handleToggle} />
    );

    return (
      <Paper style={styles.root}>
        <div>
          {policyHeader}
          <ProgressBar stats={policyStats || {}} style={styles.progressBar} />
        </div>
        <div ref="commitmentWrapper" style={styles.commitmentWrapper}>
          <ul ref="ul">
            {commitmentElems}
          </ul>
        </div>
      </Paper>
    );
  }

  handleToggle() {
    this.setState({
      open: !(this.state.open),
    });
  }

  determineHeight() {
    // ex scrollHeight: 115, height : 0, so we need add + 'px' to make height with unit
    const wrapper = React.findDOMNode(this.refs.commitmentWrapper);
    wrapper.style.height = this.state.open ? React.findDOMNode(this.refs.ul).scrollHeight + 'px' : 0;
    wrapper.style.opacity = 1;
  }

  handleCommitmentTap(commitmentId) {
    const { router } = this.context;
    router.transitionTo('/commitment/' + commitmentId);
  }
}

function mapStateToProps(state, ownProps) {
  const {policyID} = ownProps;
  const { policies, commitments } = state.entities;
  return {
    policy: policies[policyID],
    policyStats: state.stats.policies[policyID],
    allCommitmentStats: state.stats.commitments,
    commitments,
  };
}

export default connect(
  mapStateToProps,
)(PolicySection);
