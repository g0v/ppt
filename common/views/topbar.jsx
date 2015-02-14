var React = require('react'),
    Router = require('react-router'),
    Link = require('react-router').Link;

var TopBar = React.createClass({
  mixins: [Router.State],
  getInitialState: function(){
    return {
      title: this.getTitle()
    };
  },
  componentWillReceiveProps: function(){
    this.setState({title: this.getTitle()});
  },
  getTitle: function(){
    var activeRoutesNames = this.getRoutes().map(function(r){
      return r.name;
    });

    if(activeRoutesNames.indexOf('governer') !== -1){
      return decodeURIComponent(this.getParams().name);
    }else{
      return '政治承諾追蹤網';
    }
  },
  render: function(){
    return (
      <div className="ui top fixed main menu">
        <div className="container">
          <a href="#" className="launch item button" id="menu-button"><i className="content icon"></i></a>
          <Link to="app" className="title item">
            {this.state.title}
          </Link>
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
