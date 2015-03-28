var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    debug = require('debug')('ppt:App'),

    MetaStore = require('../stores/MetaStore'),

    Sidebar = require('./Sidebar.jsx'),
    TopBar = require('./Topbar.jsx');

var App = React.createClass({

  mixins: [require('fluxible').Mixin],

  statics: {
    storeListeners: {
      onMetaChange: [MetaStore]
    }
  },

  getInitialState() {
    var metaStore = this.getStore(MetaStore);

    return {
      isMenuOpen: false,
      meta: this._extractMetaFromStore()
    }
  },

  render() {
    var assetHost = this.props.assetHost || '/',
        cssName = assetHost + 'build/' + this.props.hash + '.css',
        jsName = assetHost + 'build/' + this.props.hash + '.js';

    debug('Metadata', this.state.meta);

    return (
      <html lang="zh-TW">
        <head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="webpack-hash" content={this.props.hash}/>
          <meta name="webpack-asset-host" content={assetHost}/>
          <title>{this.state.meta.title}</title>
          <meta name="description" content={this.state.meta.description} />
          <meta name="canonical" content={this.state.meta.canonical} />
          <link href={cssName} rel="stylesheet"/>
        </head>
        <body>
          <Sidebar />
          <TopBar />
          <div className="pusher">
            <RouteHandler asset-host={assetHost}/>
          </div>
          <script src="/vendor/bower_components/jquery/dist/jquery.min.js"/>
          <script src={jsName}/>
        </body>
      </html>
    )
  },

  onMetaChange() {
    this.setState({
      meta: this._extractMetaFromStore()
    });
  },

  _extractMetaFromStore(){
    var metaStore = this.getStore(MetaStore);

    return {
      title: metaStore.title,
      canonical: metaStore.canonical,
      description: metaStore.description
    };
  }

});

module.exports = App;
