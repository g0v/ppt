import React, {PropTypes} from 'react';
import { createProgressIcon } from '../utils/';
import { List, ListItem, ListDivider, Avatar } from 'material-ui';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import pptColors from '../styles/color';

class ProgressReport extends React.Component {

  static propTypes =  {
    history: PropTypes.array,
    ratings: PropTypes.array,
    isExpanded: PropTypes.bool,
    users: PropTypes.object,
  }

  getDefaultProps() {
    return {isExpanded: false};
  }

  getStyles() {
    return {
      latestFromHistoryBrief: {
        color: pptColors.lightBlack,
        fontSize: '16px',
      },
    };
  }

  render() {
    const styles = this.getStyles();
    const {isExpanded, ratings, history, users} = this.props;
    const voteCount = {notyet: 0, doing: 0, done: 0};
    let maxVote = 0;
    const ratingElements = [];
    let mostVoteProgress;

    // need to check if needed expanded, otherwise don't compute
    isExpanded && ratings.forEach((rating, idx) => {
      let contentText;
      let progressText;
      let commentText;

      voteCount[rating.progress] += 1;
      if (maxVote <= voteCount[rating.progress]) {
        mostVoteProgress = rating.progress;
        maxVote = voteCount[rating.progress];
      }

      switch (rating.progress) {
      case 'doing':
        progressText = (<span style={{color: pptColors.primaryYellow}}>正在做</span>);
        break;
      case 'done':
        progressText = (<span style={{color: pptColors.primaryBlue}}>已完成</span>);
        break;
      default:
        progressText = (<span style={{color: pptColors.primaryRed}}>還沒做</span>);
        break;
      }

      if (rating.comment) {
        contentText = '認為';
        commentText = '：' + rating.comment;
      }else {
        contentText = '認為承諾';
        commentText = '。';
      }
      const user = users[rating.User];
      ratingElements.unshift(
        <ListItem leftAvatar={<Avatar src={user.avatar} />} key={idx} secondaryText=
          {<p>
            <span> {user.name} </span>
            &nbsp;{contentText}{progressText}{commentText}
          </p>} />
      );
    });

    const latestFromHistory = history[history.length - 1];

    return (
      <List>
        <ListItem leftIcon={createProgressIcon(mostVoteProgress)}
                secondaryText={
                  <p>
                    <span style={styles.latestFromHistoryBrief}>
                      {latestFromHistory.brief}
                    </span>
                    <p style={{color: pptColors.primaryBlue}}>佐證連結</p>
                  </p>}
                secondaryTextLines={2} />
        {ratingElements}
        <ListItem leftIcon={<MoreVertIcon />} secondaryText={
            <p style={{color: pptColors.primaryBlue}}> 我也要評進度 </p>}
        />
        <ListDivider inset={true} />
      </List>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { reportID, isExpanded } = ownProps;
  const { progressReports, progressRatings, progressReportHistories, users } = state;
  const report = progressReports[reportID];
  return {
    isExpanded,
    ratings: report.ProgressRatings.map(ratingID => progressRatings[ratingID]),
    history: report.ProgressReportHistories.map(historyID => progressReportHistories[historyID]),
    users,
  };
}

export default connect(
  mapStateToProps,
)(ProgressReport);
