import React from 'react';
import debug from 'debug';
import MetaStore from '../stores/MetaStore.js';
import Sidebar from './Sidebar.jsx';
import TopBar from './Topbar.jsx';
import {connectToStores, provideContext} from 'fluxible/addons';
import {handleHistory} from 'fluxible-router';

const debugApp = debug('ppt:App');

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
    render() {
      var Handler = this.props.currentRoute.get('handler');

      debugApp('MetaStore', this.props.MetaStore);
      //render content
      return (
        <div>
          <Sidebar />
          <TopBar />
          <Handler />
        </div>
      );
    }
}

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
