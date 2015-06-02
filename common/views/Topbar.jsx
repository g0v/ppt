import React from 'react';
import {NavLink} from 'fluxible-router';
import RouteStore from '../stores/RouteStore';
import {AppCanvas, AppBar} from 'material-ui';

import Sidebar from './Sidebar.jsx';

var TopBar = React.createClass({
  render: function(){
    return (
    );
  },

  _onLeftIconButtonTouchTap: function(){
    this.refs.sideBar.toggle();
  }
});

module.exports = TopBar;


/* render return
<div className="ui top fixed main menu">
  <div className="container">
    <a className="launch item button" id="menu-button"><i className="content icon"></i></a>
    <NavLink href="/" className="title item">
      政治承諾追蹤網
    </NavLink>
    <div className="right menu">
      <div className="title item">
        <i className="plus icon"></i>
      </div>
      <div className="title item">
        <i className="search icon"></i>
      </div>
    </div>
  </div>
</div>
*/
