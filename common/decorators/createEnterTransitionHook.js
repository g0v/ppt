import React from 'react';

const debug = require('debug')('ppt:createEnterTransitionHook');

export default function createEnterTransitionHook(
  transitionHookCreator
): (DecoratedComponent: React.Component) => React.Component {

  return DecoratedComponent =>
  class OnEnterDecorator extends React.Component {

    static displayName = `OnEnterDecorator(${DecoratedComponent.displayName || DecoratedComponent.name || 'Component'})`;
    static DecoratedComponent = DecoratedComponent;

    static onEnterCreator = (store) => {
      const hook = transitionHookCreator(store);
      return (state, transition, callback) => {
        const promise = hook(state, transition) || Promise.resolve(true);
        promise.then(() => {
          debug('react router about to callback');
          callback();
        }, (error) => {
          debug('react router about to handle error');
          callback(error);
        }
        );
      };
    }

    render() {
      return (
        <DecoratedComponent {...this.props} />
      );
    }
  };
}
