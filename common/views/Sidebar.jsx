import React from 'react';
import {NavLink} from 'fluxible-router';
import debug from 'debug';
const debugSideBar = debug('ppt:sidebar');

var Sidebar = React.createClass({
  getInitialState: function(){
    return {
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
    }
  },
  
  render: function(){

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

    var governorElems = this.state.governors.map(function(governor, idx){
      debugSideBar('governor name', governor.name);
      return (
        <NavLink href={"/governor/" + governor.name} className="item" style={listItemStyle} key={idx}>
          <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/daniel.jpg"/>
          <div className="content">
            <div className="header" style={headerStyle}>{governor.name}</div>
            <div className="description" style={descriptionStyle}>{governor.title}・2014-2018・{governor.promiseCount} 承諾</div>
          </div>
        </NavLink>
      );
    });

    return (
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
    );
  }
});

module.exports = Sidebar;
