import React from 'react';
import {NavLink} from 'fluxible-router';
import mui from 'material-ui';
import ProgressIcon from './ProgressIcon.jsx';
import debug from 'debug';

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
      React.findDOMNode(this.refs.ul).scrollHeight : 0;
  }

  render(){

    if(this.props.commitments){
      var commitmentElems = this.props.commitments.map(function(commitment){
      //make sure progressReports exists
      if (commitment.ProgressReports) {
        var latestProgressReport = commitment.ProgressReports[commitment.ProgressReports.length - 1],
            totalRateCount = latestProgressReport ? latestProgressReport.ProgressRatings.length : 0,
            rating = 'notyet';
      }

      // Find the most-popular progress rating
      //
      if(latestProgressReport && latestProgressReport.ProgressRatings.length > 0){
        let rateCounts = {
          notyet: 0,
          doing: 0,
          done: 0
        }, mostCount = 0;

        latestProgressReport.ProgressRatings.forEach((rating) => {
          rateCounts[rating.progress] += 1;

          if(mostCount < rateCounts[rating.progress]){
            mostCount = rateCounts[rating.progress];
            rating = rating.progress;
          }
        });
      }

      return (
        <NavLink className="ui item" routeName='commitment' navParams={{id: commitment.id}} key={commitment.id}>
          <ProgressIcon progress={rating} className="ui top aligned avatar image"/>
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
