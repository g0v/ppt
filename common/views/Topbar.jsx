var React = require('react'),
    Router = require('react-router'),
    Link = require('react-router').Link,

    RouteStore = require('../stores/RouteStore');

var TopBar = React.createClass({
  mixins: [require('fluxible').FluxibleMixin],
  statics: {
    storeListeners: {
      onRouteChange: [RouteStore]
    }
  },

  onRouteChange() {
    this.setState({
      title: this.getTitle()
    });
  },

  getInitialState: function(){
    return {
      title: this.getTitle()
    };
  },
  getTitle: function(){
    var currentState = this.getStore(RouteStore).currentState;

    var isGovernerRouteActive = currentState.routes.some(function(r){
      return r.name === 'governer';
    });

    if(isGovernerRouteActive){
      return decodeURIComponent(currentState.params.name);
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
