import React from 'react';
import {navigateAction, NavLink} from 'fluxible-router';
import mui, {MenuItem, LeftNav} from 'material-ui';
import debug from 'debug';
const debugSideBar = debug('ppt:sidebar');

var {Colors, Spacing, Typography} = mui.Styles;

var menuItems = [
  { type: MenuItem.Types.SUBHEADER, text: '地方政府' },
  { url: {url: '/governor/台中市政府'}, text: '台中市政府'},
  { url: {url: '/governor/台北市政府'}, text: '台北市政府'},
  { url: {url: '/about'}, text: '關於政治承諾追蹤網' },
  { url: {url: '/'}, text: '回到首頁' }
];

class Sidebar extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.toggle = this.toggle.bind(this);
    this._onLeftNavChange = this._onLeftNavChange.bind(this);
  }

  getStyles() {
    // copied from mui docs, we don't need their variables
    return {
      cursor: 'pointer',
      //.mui-font-style-headline
      fontSize: '24px',
      color: Typography.textFullWhite,
      lineHeight: Spacing.desktopKeylineIncrement + 'px',
      fontWeight: Typography.fontWeightLight,
      backgroundColor: Colors.cyan500,
      paddingLeft: Spacing.desktopGutter,
      paddingTop: '0px',
      marginBottom: '8px'
    };
  }

  toggle() {
    debugSideBar('toggle called');
    this.refs.leftNav.toggle();
  }

  _onLeftNavChange(e, key, payload) {
    this.context.executeAction(navigateAction, payload.url);
  }

  _onHeaderClick() {
    this.context.executeAction(navigateAction, '/');
    this.refs.leftNav.close();
  }

  render(){

    var header = (
      <div style={this.getStyles()} onClick={this._onHeaderClick}>
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
        onChange={this._onLeftNavChange}
        style={{zDepth: 1}}/>
    );
  }
}

Sidebar.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

module.exports = Sidebar;

/* initial state
governors: [
  {
    name: "台中市政府",
    avatar: "http://semantic-ui.com/images/avatar/small/daniel.jpg",
    title: '台中市長',
    promiseCount: 53
  },
  {
    name: "台北市政府",
    avatar: "http://semantic-ui.com/images/avatar/small/daniel.jpg",
    title: '台北市長',
    promiseCount: 62
  }
]
*/

/* governors.map
return (
  <NavLink href={"/governor/" + governor.name} className="item" style={listItemStyle} key={idx}>
    <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/daniel.jpg"/>
    <div className="content">
      <div className="header" style={headerStyle}>{governor.name}</div>
      <div className="description" style={descriptionStyle}>{governor.title}・2014-2018・{governor.promiseCount} 承諾</div>
    </div>
  </NavLink>
);
*/

/* style part
var sidebarTextColor = 'rgba(255, 255, 255, .82)';

var listStyle = {
  // background: 'transparent',
},
listItemStyle = {
  padding: 8
},
segmentStyle = {
  // padding: 8,
},
segmentContainerStyle = {
  boxShadow: 'none',
  background: 'transparent',
  color: sidebarTextColor
},
headerStyle = {
  color: sidebarTextColor
},
descriptionStyle = {
  fontSize: 12,
  color: sidebarTextColor
};
*/

/* return part
<div className="ui large green inverted vertical sidebar menu">
  <div className="ui segment" style={segmentContainerStyle}>
    <section className="ui vertical segment" style={segmentStyle}>
      <div className="ui list" style={listStyle}>
        {governorElems}
      </div>
    </section>

    <section className="ui vertical segment" style={segmentStyle}>
      <div className="ui list" style={listStyle}>
        <a className="item" style={listItemStyle}>
          <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/daniel.jpg"/>
          <div className="content">
            <div className="header" style={headerStyle}>新增施政單位⋯⋯</div>
          </div>
        </a>

        <NavLink href="/about" className="item" style={listItemStyle}>
          <img className="ui top avatar image" src="http://semantic-ui.com/images/avatar/small/daniel.jpg"/>
          <div className="content">
            <div className="header" style={headerStyle}>關於政治承諾追蹤網</div>
          </div>
        </NavLink>

        <NavLink href="/" className="item" style={listItemStyle}>
          <img className="ui top avatar image" src="http://semantic-ui.com/images/avatar/small/daniel.jpg"/>
          <div className="content">
            <div className="header" style={headerStyle}>回到首頁</div>
          </div>
        </NavLink>
      </div>
    </section>
  </div>
</div>
*/
