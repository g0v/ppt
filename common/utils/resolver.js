// Collects all promises on the server side so that rendering can be done
// after all promises are resolved.
//
// Ref: https://github.com/iam4x/isomorphic-flux-boilerplate/blob/master/app/utils/alt-resolver.js
//
import React from 'react';

var debug = require('debug')('ppt:resolver');

export default class Resolver {
  constructor() {
    this._promises = [];
  }

  resolve(promise) {
    if(!process.env.IS_BROWSER) {
      this._promises.push(promise);
    }
    return promise;
  }

  async renderToString(component) {
    if(process.env.IS_BROWSER) {
      throw 'Resolver.renderToString should not be called in browser!'
      return;
    }

    // Renders the component for the first time,
    // which will invoke componentWillMount for each components and collect
    // promises.
    //
    React.renderToString(component);

    // Wait for all promises to be resolved.
    // Stores should be populated as well.
    //
    await Promise.all(this._promises);

    // Return the html string of the second render.
    //
    return React.renderToString(component);
  }
};
