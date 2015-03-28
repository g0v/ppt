var React = require('react'),
    Router = require('react-router'),
    styles = require('./styles.js'),
    ProgressIcon = require('./ProgressIcon.jsx'),

    Fluxible = require('fluxible'),
    PromiseDetailStore = require('../stores/PromiseDetailStore');


var ProgressReport = React.createClass({
  propTypes: {
    brief: React.PropTypes.string.isRequired,
    referenceText: React.PropTypes.string,
    referenceUrl: React.PropTypes.string.isRequired,
    referenceTime: React.PropTypes.number,
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

    this.props.ratings.forEach(function(rating){
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
        <div className="item">
          <img src={rating.avatar} className="ui middle aligned avatar image" />
          <div className="content">
            <a href={rating.fbprofile} target="_blank">{rating.name}</a>
            &nbsp;{contentText}{progressText}{commentText}
          </div>
        </div>
      )
    });


    return (
      <div className="item">
        <ProgressIcon progress={mostVoteProgress} className="ui top aligned avatar image" />
        <div className="content">
          <div className="header">{this.props.brief}</div>
          <div className="description">{this.props.referenceText || '佐證連結'}</div>
          <div className="ui list">
            {ratingElements}
          </div>
        </div>
      </div>
    )
  }
})

var PromiseDetail = React.createClass({
  mixins: [Fluxible.FluxibleMixin],
  getInitialState: function(){
    return this.getStore(PromiseDetailStore).data;
  },

  render: function(){
    var headerStyle = {

    };

    var governer = this.state.governer,
        promise = this.state.promise,
        latestProgressReport, oldProgressReports = [];

    if(this.state.progressReports.length > 0){
      latestProgressReport = this.state.progressReports[0];

      oldProgressReports = this.state.progressReports.slice(1);
    }

    var oldProgressReportElems = oldProgressReports.map(function(report){
      return (
        <ProgressReport brief={report.brief}
                        referenceText={report.referenceText}
                        referenceUrl={report.referenceUrl}
                        referenceTime={report.referenceTime}
                        ratings={report.ratings}
                        isExpanded={false}/>
      );
    });

    return (
      <div className="full height main container" style={styles.mainContainer}>
        <header>
          <blockquote>{promise.brief}</blockquote>
          <p>
            <a href="{promise.referenceUrl}">承諾出處：{promise.referenceText}</a>
          </p>

          <div>
            {promise.content}
          </div>
        </header>

        <section className="ui vertical segment">

          <h4>最新進展</h4>

          <div className="ui list">
            <ProgressReport brief={latestProgressReport.brief}
                            referenceText={latestProgressReport.referenceText}
                            referenceUrl={latestProgressReport.referenceUrl}
                            referenceTime={latestProgressReport.referenceTime}
                            ratings={latestProgressReport.ratings}
                            isExpanded={true}/>
          </div>
        </section>

        <section className="ui vertical segment">
          <h4>進度歷程</h4>

          <section className="ui list">
            {oldProgressReportElems}
          </section>
        </section>
      </div>
    );
  }
});

module.exports = PromiseDetail;
