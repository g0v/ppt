var React = require('react'),
    Router = require('react-router'),
    Link = require('react-router').Link;

var Sidebar = React.createClass({
  mixins: [Router.State],
  getInitialState: function(){
    return {
      governers: [
        {
          name: "林佳龍",
          avatar: "http://semantic-ui.com/images/avatar/small/daniel.jpg",
          title: '台中市長',
          promiseCount: 53
        },
        {
          name: "柯文哲",
          avatar: "http://semantic-ui.com/images/avatar/small/daniel.jpg",
          title: '台北市長',
          promiseCount: 62
        }
      ]
    }
  },
  componentDidMount: function(){
    $('.ui.sidebar').sidebar('attach events', '#menu-button');
  },
  componentWillReceiveProps: function(){
    // console.log('Sidebar ReceiveParam', this.getParams());
    $('.ui.sidebar').sidebar('hide');
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

    var governerElems = this.state.governers.map(function(governer, idx){
      return (
        <Link to="governer" params={governer} className="item" style={listItemStyle} key={idx}>
          <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/daniel.jpg"/>
          <div className="content">
            <div className="header" style={headerStyle}>{governer.name}</div>
            <div className="description" style={descriptionStyle}>{governer.title}・2014-2018・{governer.promiseCount} 承諾</div>
          </div>
        </Link>
      );
    });

    return (
      <div className="ui large green inverted vertical sidebar menu">
        <div className="ui segment" style={segmentContainerStyle}>
          <section className="ui vertical segment" style={segmentStyle}>
            <div className="ui list" style={listStyle}>
              {governerElems}
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

              <Link to="about" className="item" style={listItemStyle}>
                <img className="ui top avatar image" src="http://semantic-ui.com/images/avatar/small/daniel.jpg"/>
                <div className="content">
                  <div className="header" style={headerStyle}>關於政治承諾追蹤網</div>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    );
  }
});

module.exports = Sidebar;
