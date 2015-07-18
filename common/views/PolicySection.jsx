import React from 'react';
import {NavLink, navigateAction} from 'fluxible-router';
import mui, {ListItem, IconButton} from 'material-ui';
import NotyetIcon from 'material-ui/lib/svg-icons/navigation/close';
import DoingIcon from 'material-ui/lib/svg-icons/action/trending-flat';
import DoneIcon from 'material-ui/lib/svg-icons/action/done';
import ExpandMore from 'material-ui/lib/svg-icons/navigation/expand-more';
import ProgressIcon from './ProgressIcon.jsx';
import debug from 'debug';
import {findLatestProgressReport, majority} from '../utils';
import {PROGRESS_OPTIONS} from '../config/constants';

const {Transitions, Colors} = mui.Styles;
const debugPolicySection = debug('ppt:PolicySection');

class PolicySection extends React.Component {

  constructor(){
    super();
    this.state = {
      open: false
    };
    this._handleToggle = this._handleToggle.bind(this);
  }

  componentDidUpdate(){
    this._determineHeight();
  }

  _handleToggle() {
    this.setState({
      open: !(this.state.open)
    });
  }

  _determineHeight(){
    React.findDOMNode(this.refs.commitmentWrapper).style.height = this.state.open ?
      React.findDOMNode(this.refs.ul).scrollHeight + 'px' : 0;
  }

  _handleCommitmentTap(commitmentId){
    debugPolicySection('commitmentId', commitmentId);
    this.context.executeAction(navigateAction, {
      url: '/commitment/' + commitmentId
    });
  }

  getStyles(){
    return {
      expandIcon: {
        fill: '#000000',
        height: '30px',
        width: '30px'
      },
      commitmentWrapper: {
        overflow: 'hidden',
        transition: Transitions.easeOut('300ms', 'height'),
        height: 0
      },
      h1: {
        color: Colors.teal500
      },
      h2: {
        color: Colors.teal500
      }
    };
  }

  render(){
    let styles = this.getStyles();

    let policyStats = {};

    if(this.props.commitments){
      var commitmentElems = this.props.commitments.map(commitment => {
        var latestReport = findLatestProgressReport(commitment.ProgressReports),
            totalRateCount = latestReport ? latestReport.ProgressRatings.length : 0,
            progress = latestReport && majority(latestReport.ProgressRatings.map(rating => rating.progress))
                       || PROGRESS_OPTIONS[0];

        policyStats[progress] = policyStats[progress] + 1 || 1;

        let contentAndRate = (
          <div>
            <h3>{commitment.content}</h3>
            <p style={{color: Colors.darkBlack}}>{totalRateCount} 人評進度</p>
          </div>
        );
        //move Progressicon to here.
        let progressIcon;
        if(progress === 'done') {
          progressIcon = (
            <DoneIcon style={{fill: 'green'}}></DoneIcon>
          );
        }else if(progress === 'doing') {
          progressIcon = (
            <DoingIcon style={{fill: 'yellow'}}></DoingIcon>
          );
        }else {
          progressIcon = (
            <NotyetIcon style={{fill: 'red'}}></NotyetIcon>
          );
        }

      return (
          <ListItem
            leftIcon={progressIcon}
            secondaryText={contentAndRate}
            secondaryTextLines={2}
            onTouchTap = {this._handleCommitmentTap.bind(this, commitment.id)}
            key={commitment.id}>
            {<h2 style={styles.h2}> {commitment.brief} </h2>}
          </ListItem>
      );
      });
    }

    let headerSecondaryText = (
      <p>{Object.keys(policyStats).reduce((sum, key) => {
        sum += policyStats[key];
        return sum;
      },0)}項承諾 • {policyStats.notyet || 0} 還沒做 / {policyStats.doing || 0} 正在做 /
      &nbsp;{policyStats.done || 0} 已完成</p>
    );

    let policyHeader = (
      <ListItem
        rightIcon={<ExpandMore style={styles.expandIcon}/>}
        secondaryText={headerSecondaryText}
        onTouchTap={this._handleToggle}>
        {<h1 style={styles.h1}>{this.props.name} </h1>}
      </ListItem>
    );

    return (
      <div>
        {policyHeader}
        <div ref="commitmentWrapper" style={styles.commitmentWrapper}>
          <ul ref="ul">
            {commitmentElems}
          </ul>
        </div>
      </div>
    );
  }
}

PolicySection.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};

PolicySection.propTypes = {
  name: React.PropTypes.string,
  commitments: React.PropTypes.array
};

export default PolicySection;
