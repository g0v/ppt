import React from 'react';
import NotyetIcon from 'material-ui/lib/svg-icons/navigation/close';
import DoingIcon from 'material-ui/lib/svg-icons/action/trending-flat';
import DoneIcon from 'material-ui/lib/svg-icons/action/done';
import pptColors from '../styles/color';

const commonStyles = {
  height: '48px',
  width: '48px'
}
export default function(progress) {
  if (progress === 'done') {
    return (
      <DoneIcon style={{fill: pptColors.primaryBlue, ...commonStyles}}></DoneIcon>
    );
  }else if (progress === 'doing') {
    return (
      <DoingIcon style={{fill: pptColors.primaryYellow, ...commonStyles}}></DoingIcon>
    );
  }else {
    return (
      <NotyetIcon style={{fill: pptColors.primaryRed, ...commonStyles}}></NotyetIcon>
    );
  }
}
