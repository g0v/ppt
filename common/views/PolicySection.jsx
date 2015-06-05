import React from 'react';
import {NavLink} from 'fluxible-router';
import ProgressIcon from './ProgressIcon.jsx';
import debug from 'debug';

const debugPolicySection = debug('ppt:PolicySection');

class PolicySection extends React.Component {

  constructor(){
    this.state = {
      open: false
    };
    this._handleToggle = this._handleToggle.bind(this);
  }

  _handleToggle() {
    this.setState({
      open: !(this.state.open)
    });
  }

  _determineHeight(){
    return this.state.open ? this.refs.promiseWrpper.getDOMNode().style.height : 0;
  }

  render(){
    debugPolicySection('props promise', this.props.promises);

    if(this.props.promises){
      var promiseElems = this.props.promises.map(function(promise){
      //make sure progressReports exists
      if (promise.progressReports) {
        var latestProgressReport = promise.progressReports[promise.progressReports.length - 1],
            totalRateCount = latestProgressReport ? latestProgressReport.progressRatings.length : 0,
            rating = 'notyet';
      }

      // Find the most-popular progress rating
      //
      if(latestProgressReport && latestProgressReport.progressRatings.length > 0){
        let rateCounts = {
          notyet: 0,
          doing: 0,
          done: 0
        }, mostCount = 0;

        latestProgressReport.progressRatings.forEach((rating) => {
          rateCounts[rating.progress] += 1;

          if(mostCount < rateCounts[rating.progress]){
            mostCount = rateCounts[rating.progress];
            rating = rating.progress;
          }
        });
      }

      return (
        <NavLink className="ui item" routeName='promise' navParams={{id: promise.id}} key={promise.id}>
          <ProgressIcon progress={rating} className="ui top aligned avatar image"/>
            <div className="header">{promise.brief}</div>
            <div className="description">{promise.content}</div>
            <p>{totalRateCount} 人評進度</p>
        </NavLink>
      )
      });
    }

  return (
    <div className="ui green segment">
      <h1 className="ui header green" style={{cursor: 'pointer'}} onClick={this._handleToggle}>
        {this.props.name}
      </h1>
      <div className="ui list" style={{
        overflow: 'hidden',
        height: this._determineHeight()}}>
        <ul ref="promiseWrpper">
          {promiseElems}
        </ul>
      </div>
    </div>
    );
  }
}

PolicySection.propTypes = {
  name: React.PropTypes.string,
  promises: React.PropTypes.array
};

export default PolicySection;
