var React = require('react');

var TopBar = React.createClass({
  render: function(){
    return (
      <div className="ui top fixed main menu">
        <div className="container">
          <a href="#" className="launch item button" onClick={this.props.onMenuButtonClick}><i className="content icon"></i></a>
          <div className="title item">
            政治承諾追蹤網
          </div>
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
