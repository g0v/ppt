var React = require('react');

var Sidebar = React.createClass({
  componentWillReceiveProps: function(nextProps){
    $(".ui.sidebar").sidebar("toggle");
  },
  render: function(){
    return (
      <div className="ui large green inverted vertical sidebar menu">
        <a className="active item">
          Dogs Weekly <span className="ui label">213</span>
        </a>
        <a className="item">
          Joystiq <span className="ui label">113</span>
        </a>
        <div className="item">
          <b>Archived Feeds</b>
          <div className="menu">
            <a className="item">
              Engadget <span className="ui label">11</span>
            </a>
            <a className="item">
              NY Times Tech Blog <span className="ui label">21</span>
            </a>
          </div>
        </div>
        <a className="item">
          <i className="bookmark icon"></i> Favorites
        </a>
        <div className="ui dropdown item">
          <i className="add icon"></i> New
          <div className="menu">
            <a className="item"><i className="rss icon"></i> Feed</a>
            <a className="item"><i className="tag icon"></i> Tag</a>
            <a className="item"><i className="folder icon"></i> Group</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Sidebar;
