var React = require('react');

var Sidebar = React.createClass({
  componentWillReceiveProps: function(nextProps){
    $(".ui.sidebar").sidebar("toggle");
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
    }

    return (
      <div className="ui large green inverted vertical sidebar menu">
        <div className="ui segment" style={segmentContainerStyle}>
          <section className="ui vertical segment" style={segmentStyle}>
            <div className="ui list" style={listStyle}>
              <a className="item" style={listItemStyle}>
                <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/daniel.jpg"/>
                <div className="content">
                  <div className="header" style={headerStyle}>胡自強</div>
                  <div className="description" style={descriptionStyle}>台中市長・2010-2014・43 承諾</div>
                </div>
              </a>

              <a className="item" style={listItemStyle}>
                <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/daniel.jpg"/>
                <div className="content">
                  <div className="header" style={headerStyle}>胡自強</div>
                  <div className="description" style={descriptionStyle}>台中市長・2010-2014・43 承諾</div>
                </div>
              </a>
            </div>
          </section>

          <section className="ui vertical segment" style={segmentStyle}>
            <h5 style={listItemStyle}>縣市長・2014 - 2018</h5>
            <div className="ui list" style={listStyle}>
              <a className="item" style={listItemStyle}>
                <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/daniel.jpg"/>
                <div className="content">
                  <div className="header" style={headerStyle}>胡自強</div>
                  <div className="description" style={descriptionStyle}>台中市長・2010-2014・43 承諾</div>
                </div>
              </a>

              <a className="item" style={listItemStyle}>
                <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/daniel.jpg"/>
                <div className="content">
                  <div className="header" style={headerStyle}>胡自強</div>
                  <div className="description" style={descriptionStyle}>台中市長・2010-2014・43 承諾</div>
                </div>
              </a>
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

              <a className="item" style={listItemStyle}>
                <img className="ui top avatar image" src="http://semantic-ui.com/images/avatar/small/daniel.jpg"/>
                <div className="content">
                  <div className="header" style={headerStyle}>關於政治承諾追蹤網</div>
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>
    );
  }
});

module.exports = Sidebar;
