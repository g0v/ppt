import React from 'react';
import {handleRoute} from 'fluxible-router';
import { createProgressIcon } from '../utils/';
import { List, ListItem, ListDivider, Avatar } from 'material-ui';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import pptColors from '../styles/color';

var ProgressReport = React.createClass({
  propTypes: {
    history: React.PropTypes.array.isRequired,
    ratings: React.PropTypes.array.isRequired,
    isExpanded: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {isExpanded: false};
  },
  getStyles() {
    return {
      latestFromHistoryBrief: {
        color: pptColors.lightBlack,
        fontSize: '16px'
      }
    }
  },
  render: function() {
    let styles = this.getStyles();
    var voteCount = {notyet: 0, doing: 0, done: 0},
        maxVote = 0,
        ratingElements = [],
        mostVoteProgress;
    // need to check if needed expanded, otherwise don't compute
    this.props.isExpanded && this.props.ratings.forEach(function(rating, idx) {
      var contentText, progressText, commentText;

      voteCount[rating.progress] += 1;
      if (maxVote <= voteCount[rating.progress]) {
        mostVoteProgress = rating.progress;
        maxVote = voteCount[rating.progress];
      }

      switch (rating.progress){
        case 'doing':
          progressText = (<span style={{color: pptColors.primaryYellow}}>正在做</span>);
          break;
        case 'done':
          progressText = (<span style={{color: pptColors.primaryBlue}}>已完成</span>);
          break;
        case 'notyet':
          progressText = (<span style={{color: pptColors.primaryRed}}>還沒做</span>);
          break;
      }

      if (rating.comment) {
        contentText = '認為';
        commentText = '：' + rating.comment;
      }else {
        contentText = '認為承諾';
        commentText = '。'
      }

      let userAvatar = (
        <Avatar src={rating.User.avatar} />
      );
      ratingElements.unshift(
        <ListItem leftAvatar={userAvatar} key={idx} secondaryText=
          {<p>
            <span> {rating.User.name} </span>
            &nbsp;{contentText}{progressText}{commentText}
          </p>} >
        </ListItem>
      );
    });

    var latestFromHistory = this.props.history[this.props.history.length - 1];

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
                secondaryTextLines={2}>
        </ListItem>
        {ratingElements}
        <ListItem leftIcon={<MoreVertIcon />} secondaryText={
            <p style={{color: pptColors.primaryBlue}}> 我也要評進度 </p>}
        />
        <ListDivider inset={true} />
      </List>
    )
  }
})

module.exports = handleRoute(ProgressReport);
