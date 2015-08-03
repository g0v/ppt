import React from 'react';
import {navigateAction} from 'fluxible-router';
import mui, {Paper} from 'material-ui';
import CommitmentListItem from './CommitmentListItem.jsx';
import ProgressBar from './ProgressBar.jsx';
import ExpandMore from 'material-ui/lib/svg-icons/navigation/expand-more';
import ExpandLess from 'material-ui/lib/svg-icons/navigation/expand-less';
import debug from 'debug';
import {findLatestProgressReport, majority, createProgressIcon} from '../utils';
import {PROGRESS_OPTIONS} from '../config/constants';
import pptColors from '../styles/color';

const {Transitions} = mui.Styles,
      debugPolicySection = debug('ppt:PolicySection');

class PolicySection extends React.Component {
  static contextTypes = {
    executeAction: React.PropTypes.func.isRequired
  };

  static propTypes = {
    name: React.PropTypes.string,
    commitments: React.PropTypes.array
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false
    };
    this._handleToggle = this._handleToggle.bind(this);
  }

  componentDidUpdate() {
    this._determineHeight();
  }

  _handleToggle() {
    this.setState({
      open: !(this.state.open)
    });
  }

  _determineHeight() {
    // ex scrollHeight: 115, height : 0, so we need add + 'px' to make height with unit
    let wrapper = React.findDOMNode(this.refs.commitmentWrapper)
    wrapper.style.height = this.state.open ? React.findDOMNode(this.refs.ul).scrollHeight + 'px' : 0;
    wrapper.style.opacity = 1;
  }

  _handleCommitmentTap(commitmentId) {
    this.context.executeAction(navigateAction, {
      url: '/commitment/' + commitmentId
    });
  }

  getStyles() {
    return {
      expandIcon: {
        fill: pptColors.black,
        height: '30px',
        width: '30px'
      },
      progressBar: {
        height: 6.5,
        maxWidth: 540,
        margin: '0px 16px 10px'
      },
      commitmentWrapper: {
        overflow: 'hidden',
        transition: Transitions.easeOut('500ms', 'opacity'),
        height: 0,
        opacity: 0
      },
      totalRateCount: {
        color: pptColors.darkBlack,
        fontSize: 14
      }
    };
  }

  render() {
    let styles = this.getStyles(),
        policyStats = {};

    if (this.props.commitments) {
      var commitmentElems = this.props.commitments.map(commitment => {
        var latestReport = findLatestProgressReport(commitment.ProgressReports),
            totalRateCount = latestReport ? latestReport.ProgressRatings.length : 0,
            progress = latestReport && majority(latestReport.ProgressRatings.map(rating => rating.progress)) ||
                       PROGRESS_OPTIONS[0];

        policyStats[progress] = policyStats[progress] + 1 || 1;

        let contentAndRate = (
          <p>
            <span>{commitment.content}</span>
            <p style={styles.totalRateCount}> {totalRateCount} 人評進度</p>
          </p>
        );

        return (
            <CommitmentListItem
              leftIcon={createProgressIcon(progress)}
              primaryText={commitment.brief}
              secondaryText={contentAndRate}
              secondaryTextLines={2}
              onTouchTap = {this._handleCommitmentTap.bind(this, commitment.id)}
              key={commitment.id}>
            </CommitmentListItem>
        );
      });
    }

    let headerSecondaryText = (
        <p>{Object.keys(policyStats).reduce((sum, key) => {
          sum += policyStats[key];
          return sum;
        }, 0)}項承諾 • {policyStats.notyet || 0} 還沒做 / {policyStats.doing || 0} 正在做 /
        &nbsp;{policyStats.done || 0} 已完成
        </p>
    );

    let policyHeader = (
      <CommitmentListItem rightIcon={ this.state.open ? <ExpandLess style={styles.expandIcon} /> :
          <ExpandMore style={styles.expandIcon} />}
        primaryText={<p>{this.props.name} </p>}
        secondaryText={headerSecondaryText}
        onTouchTap={this._handleToggle} >
      </CommitmentListItem>
    );

    return (
      <Paper>
        <div>
          {policyHeader}
          <ProgressBar stats={policyStats} style={styles.progressBar} />
        </div>
        <div ref="commitmentWrapper" style={styles.commitmentWrapper}>
          <ul ref="ul">
            {commitmentElems}
          </ul>
        </div>
      </Paper>
    );
  }
}

export default PolicySection;
