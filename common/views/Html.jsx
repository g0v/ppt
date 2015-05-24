import React from 'react';
import MetaStore from '../stores/MetaStore';

class HtmlComponent extends React.Component {
    render() {
      var cssName = '/build/' + this.props.hash + '.css',
          jsName = '/build/' + this.props.hash + '.js';

      return (
          <html>
              <head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="webpack-hash" content={this.props.hash}/>
                <title>{this.props.context.getStore(MetaStore).getPageTitle()}</title>
                <link href={cssName} rel="stylesheet"/>
              </head>
              <body>
                  <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
              </body>
              <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
              <script src="/vendor/bower_components/jquery/dist/jquery.min.js"/>
              <script src={jsName} defer></script>
          </html>
      );
    }
}

export default HtmlComponent;
