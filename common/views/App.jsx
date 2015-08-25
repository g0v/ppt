import React, {PropTypes} from 'react';
import Sidebar from './Sidebar.jsx';
import { AppBar, IconButton } from 'material-ui';
import AddIcon from 'material-ui/lib/svg-icons/content/add';

// const debug = require('debug')('ppt:App');

class App extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
  }

  componentDidUpdate(/* prevProps */) {
    // const newProps = this.props;
    // if (newProps.MetaStore.pageTitle === prevProps.MetaStore.pageTitle) {
      // return;
      // }
      // document.title = newProps.MetaStore.pageTitle;
  }

  onNavaTouchTap() {
    this.refs.sideBar.toggle();
  }

  onAddTouchTap() {
    this.context.router.transitionTo('/add');
  }

  getStyles() {
    return {
      root: {
        width: '100%',
        height: '100%',
        WebkitFontSmoothing: 'antialiased',
      },
    };
  }

  render() {
    // Rendered content.
    //
    // this.props is passed to <Handler /> because
    // React-transmit's Transmit.renderToString leverages props to pass
    // queryResults around.
    //
    const styles = this.getStyles();
    const addIconButton = (
      <IconButton tooltip="新增承諾進度" tooltipPosition="bottom-left"
      touch={true} onTouchTap={::this.onAddTouchTap}>
      <AddIcon />
      </IconButton>
    );
    return (
      <div style={styles.root}>
      <AppBar style={{position: 'fixed'}} title={'政治承諾追蹤網'}
        iconElementRight={addIconButton}
        onLeftIconButtonTouchTap={::this.onNavaTouchTap} />
        <Sidebar ref="sideBar" />
        { this.props.children }
        </div>
      );
  }
}

export default App;
