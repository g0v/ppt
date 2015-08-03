import React from 'react';
import MetaStore from '../stores/MetaStore.js';
import Sidebar from './Sidebar.jsx';
import {connectToStores, provideContext} from 'fluxible/addons';
import {handleHistory, navigateAction} from 'fluxible-router';
import mui, { AppBar, IconButton } from 'material-ui';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import {theme} from 'material-ui/lib/theme';
import pptColors from '../styles/color';

const debug = require('debug')('ppt:App'),
      ThemeManager = new mui.Styles.ThemeManager(),
      pptCustomTheme = {
        getPalette: () => ({
          primary1Color: pptColors.minBlack,
          textColor: pptColors.primaryBlue
        }),
        getComponentThemes: () => ({
          textField: {
            focusColor: pptColors.primaryBlue
          }
        })
      };

@theme(pptCustomTheme)
class App extends React.Component {
    constructor(props, context) {
      super(props, context);
    }

    componentDidUpdate(prevProps) {
      let newProps = this.props;
      if (newProps.MetaStore.pageTitle === prevProps.MetaStore.pageTitle) {
        return;
      }
      document.title = newProps.MetaStore.pageTitle;
    }

    onNavaTouchTap() {
      this.refs.sideBar.toggle();
    }

    onAddTouchTap() {
      debug('add called');
      this.context.executeAction(navigateAction, {url: '/add'});
    }

    getStyles() {
      return {
        root: {
          width: '100%',
          height: '100%',
          WebkitFontSmoothing: 'antialiased'
        }
      };
    }

    render() {
      var Handler = this.props.currentRoute.get('handler');

      debug('MetaStore', this.props.MetaStore);

      // Rendered content.
      //
      // this.props is passed to <Handler /> because
      // React-transmit's Transmit.renderToString leverages props to pass
      // queryResults around.
      //
      let styles = this.getStyles();
      return (
        <div style={styles.root}>
          <AppBar style={{position: 'fixed'}} title={'政治承諾追蹤網'}
            iconElementRight={
              <IconButton tooltip="新增承諾進度" tooltipPosition="bottom-left"
                 touch={true}>
                <AddIcon />
                </IconButton>}
            onLeftIconButtonTouchTap={::this.onNavaTouchTap}
            onRightIconButtonTouchTap={::this.onAddTouchTap} />
          <Sidebar ref="sideBar" />
          <Handler {...this.props}/>
        </div>
      );
    }
}

App.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};
/*
App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};
*/
App = connectToStores(App, [MetaStore], function(stores, props) {
  return {
    MetaStore: stores.MetaStore.getState()
  };
});

App = handleHistory(App);

App = provideContext(App);

export default App;
