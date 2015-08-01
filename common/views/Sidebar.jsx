import React from 'react';
import {navigateAction, NavLink} from 'fluxible-router';
import mui, {MenuItem, LeftNav} from 'material-ui';
import debug from 'debug';
const debugSideBar = debug('ppt:sidebar');

var {Colors, Spacing} = mui.Styles;

var menuItems = [
  {type: MenuItem.Types.SUBHEADER, text: '地方政府'},
  { url: {url: '/governor/桃園市政府'}, text: '桃園市政府'},
  { url: {url: '/governor/台中市政府'}, text: '台中市政府'},
  { url: {url: '/governor/台北市政府'}, text: '台北市政府'},
  {type: MenuItem.Types.SUBHEADER, text: '其他'},
  { url: {url: '/about'}, text: '關於政治承諾追蹤網' },
  { url: {url: '/'}, text: '回到首頁' }
];

class Sidebar extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.toggle = this.toggle.bind(this);
  }

  getStyles() {
    // copied from mui docs, we don't need their variables
    return {
      cursor: 'pointer',
      //.mui-font-style-headline
      fontSize: '24px',
      color: Colors.fullWhite,
      lineHeight: Spacing.desktopKeylineIncrement + 'px',
      fontWeight: 300,
      backgroundColor: '#099',
      paddingLeft: Spacing.desktopGutter,
      paddingTop: '0px',
      marginBottom: '8px'
    };
  }

  toggle() {
    this.refs.leftNav.toggle();
  }

  _onLeftNavChange(e, key, payload) {
    this.context.executeAction(navigateAction, payload.url);
  }

  _onHeaderClick() {
    this.context.executeAction(navigateAction, {url: '/'});
    this.refs.leftNav.close();
  }

  render(){
    var header = (
      <div style={this.getStyles()} onTouchTap={::this._onHeaderClick}>
        政治承諾追蹤網
      </div>
    );

    return (
      <LeftNav
        ref="leftNav"
        header={header}
        docked={false}
        isInitiallyOpen={false}
        menuItems={menuItems}
        onChange={::this._onLeftNavChange}
        style={{zDepth: 1}}/>
    );
  }
}

Sidebar.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};

module.exports = Sidebar;
