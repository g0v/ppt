import React from 'react';
import {NavLink} from 'fluxible-router';
import mui from 'material-ui';
import ProgressIcon from './ProgressIcon.jsx';
import debug from 'debug';
import {findLatestProgressReport, majority} from '../utils';
import {PROGRESS_OPTIONS} from '../config/constants';

const {Transitions} = mui.Styles;
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

  render(){

    if(this.props.commitments){
      var commitmentElems = this.props.commitments.map(commitment => {
        var latestReport = findLatestProgressReport(commitment.ProgressReports),
            totalRateCount = latestReport ? latestReport.ProgressRatings.length : 0,
            progress = latestReport && majority(latestReport.ProgressRatings.map(rating => rating.progress))
                       || PROGRESS_OPTIONS[0];

      return (
        <NavLink className="ui item" routeName='commitment' navParams={{id: commitment.id}} key={commitment.id}>
          <ProgressIcon progress={progress} className="ui top aligned avatar image"/>
            <div className="header">{commitment.brief}</div>
            <div className="description">{commitment.content}</div>
            <p>{totalRateCount} 人評進度</p>
        </NavLink>
      )
      });
    }

    return (
      <div>
        <h1 style={{cursor: 'pointer'}} onClick={this._handleToggle}>
          {this.props.name}
        </h1>
        <div ref="commitmentWrapper" style={{
          overflow: 'hidden',
          transition: Transitions.easeOut('300ms', 'height'),
          height: 0}}>
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
