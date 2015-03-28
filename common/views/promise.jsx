var React = require('react'),
    Router = require('react-router'),
    styles = require('./styles.js'),
    ProgressIcon = require('./ProgressIcon.jsx');


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
  mixins: [Router.State],
  getInitialState: function(){
    return {
      governer: {
        name: '林佳龍',
      },
      promise: {
        brief: "台中縣、市婦女生育，每位新生兒補助一萬元",
        content: "為了讓選民了解胡志強在當選後的大台中具體施政內容，推出「福利齊步走」九項福利政見。包括台中縣、市婦女生育每位新生兒補助一萬元。",
        referenceText: "NowNews 2010-7-27 報導",
        referenceUrl: "http://www.nownews.com/n/2010/07/27/654760",
        createdAt: ""
      },
      progressReports: [
        {
          isRetracted: false,
          brief: "台中市政府社會局申請生育津貼，金額為單胞胎新臺幣ㄧ萬元，雙胞胎新臺幣三萬⋯⋯",
          referenceUrl: "http://www.society.taichung.gov.tw/faq/index-1.asp?Parser=27,8,28,,,,809,15",
          referenceText: "社會局 FAQ",
          referenceTime: "",
          ratings: [
            {
              avatar: 'http://graph.facebook.com/100002188898192/picture?type=square',
              name: 'Johnson Liang',
              fbprofile: 'http://www.facebook.com/johnsonliang',
              progress: 'doing',
              comment: '這份是社會局的文件，申請要建與方式已經寫得很清楚了，而且我才剛領到這個補助。'
            },
            {
              avatar: 'http://semantic-ui.com/images/avatar/small/daniel.jpg',
              name: '大中天',
              fbprofile: 'http://www.facebook.com/johnsonliang',
              progress: 'doing',
              comment: ''
            },
            {
              avatar: 'http://semantic-ui.com/images/avatar/small/steve.jpg',
              name: '',
              fbprofile: 'http://www.facebook.com/johnsonliang',
              progress: 'notyet',
              comment: ''
            }
          ]
        },
        {
          isRetracted: false,
          brief: "台中市政府社會局申請生育津貼，金額為單胞胎新臺幣ㄧ萬元，雙胞胎新臺幣三萬⋯⋯",
          referenceUrl: "http://www.society.taichung.gov.tw/faq/index-1.asp?Parser=27,8,28,,,,809,15",
          referenceText: "社會局 FAQ",
          ratings: [
            {
              avatar: 'http://graph.facebook.com/100002188898192/picture?type=square',
              name: 'Johnson Liang',
              fbprofile: 'http://www.facebook.com/johnsonliang',
              progress: 'doing',
              comment: '這份是社會局的文件，申請要建與方式已經寫得很清楚了，而且我才剛領到這個補助。'
            },
            {
              avatar: 'http://semantic-ui.com/images/avatar/small/daniel.jpg',
              name: '大中天',
              fbprofile: 'http://www.facebook.com/johnsonliang',
              progress: 'doing',
              comment: ''
            },
          ]
        },
        {
          isRetracted: false,
          brief: "台中市政府社會局申請生育津貼，金額為單胞胎新臺幣ㄧ萬元，雙胞胎新臺幣三萬⋯⋯",
          referenceUrl: "http://www.society.taichung.gov.tw/faq/index-1.asp?Parser=27,8,28,,,,809,15",
          referenceText: "社會局 FAQ",
          ratings: [
            {
              avatar: 'http://graph.facebook.com/100002188898192/picture?type=square',
              name: 'Johnson Liang',
              fbprofile: 'http://www.facebook.com/johnsonliang',
              progress: 'doing',
              comment: '這份是社會局的文件，申請要建與方式已經寫得很清楚了，而且我才剛領到這個補助。'
            },
            {
              avatar: 'http://semantic-ui.com/images/avatar/small/daniel.jpg',
              name: '大中天',
              fbprofile: 'http://www.facebook.com/johnsonliang',
              progress: 'doing',
              comment: ''
            },
          ]
        },
      ]
    };
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
