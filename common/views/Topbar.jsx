import React from 'react';
import {NavLink} from 'fluxible-router';
import RouteStore from '../stores/RouteStore';

var TopBar = React.createClass({
  render: function(){
    return (
      <div className="ui top fixed main menu">
        <div className="container">
          <a href="#" className="launch item button" id="menu-button"><i className="content icon"></i></a>
          <NavLink routeName="home" className="title item">
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
    );
  }
});

module.exports = TopBar;
