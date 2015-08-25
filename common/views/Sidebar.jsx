import React, { PropTypes } from 'react';
import mui, {MenuItem, LeftNav} from 'material-ui';

// const debug = require('debug')('ppt:sidebar');

const {Colors, Spacing} = mui.Styles;

const menuItems = [
  { type: MenuItem.Types.SUBHEADER, text: '地方政府'},
  { route: '/governor/桃園市政府', text: '桃園市政府'},
  { route: '/governor/台中市政府', text: '台中市政府'},
  { route: '/governor/台北市政府', text: '台北市政府'},
  { type: MenuItem.Types.SUBHEADER, text: '其他'},
  { route: '/add', text: '新增承諾報告' },
  { route: '/about', text: '關於政治承諾追蹤網' },
  { route: '/', text: '回到首頁' },
];

class Sidebar extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.toggle = this.toggle.bind(this);
  }

  getStyles() {
    // copied from mui docs, we don't need their variables
    return {
      cursor: 'pointer',
      fontSize: '24px',
      color: Colors.fullWhite,
      lineHeight: Spacing.desktopKeylineIncrement + 'px',
      fontWeight: 300,
      backgroundColor: '#099',
      paddingLeft: Spacing.desktopGutter,
      paddingTop: '0px',
      marginBottom: '8px',
    };
  }

  render() {
    const header = (
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

  toggle() {
    this.refs.leftNav.toggle();
  }

  _onLeftNavChange(e, key, payload) {
    this.context.router.transitionTo(payload.route);
  }

  _onHeaderClick() {
    this.context.router.transitionTo('/');
    this.refs.leftNav.close();
  }
}

export default Sidebar;
