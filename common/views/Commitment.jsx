var React = require('react'),
    debug = require('debug')('ppt:promise'),
    styles = require('./styles.js'),
    ProgressIcon = require('./ProgressIcon.jsx'),
    Loading = require('./Loading.jsx'),

    Fluxible = require('fluxible'),
    Transmit = require('react-transmit'),
    findAll = require('../utils/findAll');

import {handleRoute} from 'fluxible-router';

var ProgressReport = React.createClass({
  propTypes: {
    history: React.PropTypes.array.isRequired,
    ratings: React.PropTypes.array.isRequired,
    isExpanded: React.PropTypes.bool
  },
  getDefaultProps: function(){
    return {isExpanded: false};
  },
  render: function(){
    var voteCount = {notyet: 0, doing: 0, done: 0},
        maxVote = 0,
        ratingElements = [],
        mostVoteProgress;

    this.props.ratings.forEach(function(rating, idx){
      var contentText, progressText, commentText;

      voteCount[rating.progress] += 1;
      if(maxVote <= voteCount[rating.progress]){
        mostVoteProgress = rating.progress;
        maxVote = voteCount[rating.progress];
      }

      switch(rating.progress){
        case 'doing':
          progressText = (<span style={{color:'#fa0'}}>正在做</span>); break;
        case 'done':
          progressText = (<span style={{color:'#099'}}>已完成</span>); break;
        case 'notyet':
          progressText = (<span style={{color:'#f00'}}>還沒做</span>); break;
      }

      if(rating.comment){
        contentText = "認為";
        commentText = "：" + rating.comment;
      }else{
        contentText = "認為承諾";
        commentText = "。"
      }


      ratingElements.unshift(
        <div className="item" key={idx}>
          <img src={rating.User.avatar} className="ui middle aligned avatar image" />
          <div className="content">
            <a href={rating.User.fbprofile} target="_blank">{rating.User.username}</a>
            &nbsp;{contentText}{progressText}{commentText}
          </div>
        </div>
      )
    });

    var latestFromHistory = this.props.history[this.props.history.length-1];

    return (
      <div className="item">
        <ProgressIcon progress={mostVoteProgress} className="ui top aligned avatar image" />
        <div className="content">
          <div className="header">{latestFromHistory.brief}</div>
          <div className="description">
            <a href={latestFromHistory.reference}>佐證連結</a>
          </div>
          <div className="ui list">
            {ratingElements}
          </div>
        </div>
      </div>
    )
  }
})

var Commitment = React.createClass({

  render: function(){

    var commitment = this.props.commitments[0],
        progressReports = commitment.ProgressReports,
        latestProgressReport, oldProgressReports = [];

    if(progressReports && progressReports.length > 0){
      latestProgressReport = progressReports[0];

      oldProgressReports = progressReports.slice(1);
    }

    var oldProgressReportElems = oldProgressReports.map(function(report, idx){
      return (
        <ProgressReport key={idx}
                        history={report.ProgressReportHistories}
                        ratings={report.ProgressRatings}
                        isExpanded={false}/>
      );
    });

    var progressReportElems = []

    if(latestProgressReport) {
      progressReportElems.push(
        <section className="ui vertical segment" key="latest">

          <h4>最新進展</h4>

          <div className="ui list">
            <ProgressReport history={latestProgressReport.ProgressReportHistories}
                            ratings={latestProgressReport.ProgressRatings}
                            isExpanded={true}/>
          </div>
        </section>
      )
    }

    if(oldProgressReportElems && oldProgressReportElems.length) {
      progressReportElems.push(
        <section className="ui vertical segment">
          <h4>進度歷程</h4>

          <section className="ui list">
            {oldProgressReportElems}
          </section>
        </section>
      );
    }

    return (
      <div className="full height main container" style={styles.mainContainer}>
        <header>
          <blockquote>{commitment.brief}</blockquote>
          <p>
            <a href={commitment.reference}>承諾出處：{commitment.reference}</a>
          </p>

          <div>
            {commitment.content}
          </div>
        </header>

        {progressReportElems}
      </div>
    );
  }
});

Commitment = Transmit.createContainer(Commitment, {
  queries: {
    commitments(queryParams) {
      return findAll('Commitment', {
        where: {
          id: queryParams.id
        },
        include: [
          {
            association: 'ProgressReports',
            include: [
              {
                association: 'ProgressReportHistories',
                include: [
                  { association: 'User' }
                ]
              },
              {
                association: 'ProgressRatings',
                include: [
                  { association: 'User' }
                ]
              }
            ]
          }
        ]
      });
    }
  }
});

// Setup React-transmit via props
//
var CommitmentQuerySetter = React.createClass({
  _makeQueryParams () {
    return {
      id: this.props.currentRoute.get('params').get('id')
    }
  },

  render () {
    return (
      <Commitment queryParams={this._makeQueryParams()}
        emptyView={<Loading />} ref="Commitment"
        {...this.props}
      />
    );
  },

  componentDidUpdate(prevProps) {
    if(prevProps.currentRoute !== this.props.currentRoute){
      this.refs.Commitment.setQueryParams(this._makeQueryParams());
    }
  }
});

module.exports = handleRoute(CommitmentQuerySetter);