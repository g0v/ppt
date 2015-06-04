import React from 'react';
import MetaStore from '../stores/MetaStore.js';
import Sidebar from './Sidebar.jsx';
import {connectToStores, provideContext} from 'fluxible/addons';
import {handleHistory} from 'fluxible-router';
import mui, {AppBar, AppCanvas} from 'material-ui';

const debug = require('debug')('ppt:App'),
      ThemeManager = new mui.Styles.ThemeManager();

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

    _onLeftIconButtonTouchTap() {
      debug('toggle calling');
      this.refs.sideBar.toggle();
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
      return (
        <div>
          <AppBar onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap} />
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

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

App = connectToStores(App, [MetaStore], function (stores, props) {
  return {
    MetaStore: stores.MetaStore.getState()
  };
});

App = handleHistory(App);

App = provideContext(App);

export default App;
