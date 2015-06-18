import React from 'react';
import {NavLink} from 'fluxible-router';
import mui, {ListItem, IconButton} from 'material-ui';
import ExpandMore from './mui-SvgIcons/ExpandMore.jsx';
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

  getStyles(){
    return {
      iconBotton: {
        height: '30px',
        width: '30px',
        position: 'absolute',
        right: '35px',
        top: '20px'
      },
      expandIcon: {
        fill: '#000000',
        height: '30px',
        width: '30px',
        position: 'absolute',
        right: '0',
        top: '0'
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
      return (
        <NavLink routeName='commitment' navParams={{id: commitment.id}} key={commitment.id}>
          <ListItem
            leftIcon={<ProgressIcon progress={progress} />}
            secondaryText={contentAndRate}
            secondaryTextLines={2}>
            {<h2 style={styles.h2}>{commitment.brief} </h2>}
          </ListItem>
        </NavLink>
      );
      });
    }
    let expandIcon = (
      <IconButton style={styles.iconBotton}>
        <ExpandMore style={styles.expandIcon}/>
      </IconButton>
    );

    let headerSecondaryText = (
      <p>{Object.keys(policyStats).reduce((sum, key) => {
        sum += policyStats[key];
        return sum;
      },0)}項承諾 • {policyStats.notyet || 0} 還沒做 / {policyStats.doing || 0} 正在做 /
      &nbsp;{policyStats.done || 0} 已完成</p>
    );

    let policyHeader = (
      <ListItem
        rightIcon={expandIcon}
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

PolicySection.propTypes = {
  name: React.PropTypes.string,
  commitments: React.PropTypes.array
};

export default PolicySection;
