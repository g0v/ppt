import React from 'react';
import debug from 'debug';
import MetaStore from '../stores/MetaStore.js';
import Sidebar from './Sidebar.jsx';
//import TopBar from './Topbar.jsx';
import {connectToStores, provideContext} from 'fluxible/addons';
import {handleHistory} from 'fluxible-router';
import mui, {AppBar, AppCanvas} from 'material-ui';

var ThemeManager = new mui.Styles.ThemeManager();

const debugApp = debug('ppt:App');

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._onLeftIconButtonTouchTap = this._onLeftIconButtonTouchTap.bind(this);
    }

    getChildContext() {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      }
    }

    componentDidUpdate(prevProps) {
        let newProps = this.props;
        if (newProps.MetaStore.pageTitle === prevProps.MetaStore.pageTitle) {
            return;
        }
        document.title = newProps.MetaStore.pageTitle;
    }

    _onLeftIconButtonTouchTap(){
      debugApp('toggle calling');
      this.refs.sideBar.toggle();
    }
    
    render() {
      var Handler = this.props.currentRoute.get('handler');

      debugApp('MetaStore', this.props.MetaStore);
      //render content
      return (
        <AppCanvas>
          <AppBar onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap} />
          <Sidebar ref="sideBar" />
          <Handler />
        </AppCanvas>
      );
    }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

App.contextTypes = {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
};

App = connectToStores(App, [MetaStore], function (stores, props) {
  return {
    MetaStore: stores.MetaStore.getState()
  };
});

App = handleHistory(App);

App = provideContext(App);

export default App;
