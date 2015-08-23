import React from 'react';
import { Router } from 'react-router';
import {theme} from 'material-ui/lib/theme';
import pptColors from '../styles/color';

const pptCustomTheme = {
  getPalette: () => ({
    primary1Color: pptColors.minBlack,
    textColor: pptColors.primaryBlue,
  }),
  getComponentThemes: () => ({
    textField: {
      focusColor: pptColors.primaryBlue,
    },
  }),
};

@theme(pptCustomTheme)
class AppRouter extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Router {...this.props} />
    );
  }
}

export default AppRouter;
