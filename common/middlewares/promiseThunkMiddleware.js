import { normalize } from 'normalizr';

// const debug = require('debug')('ppt:promiseThunkMiddleware');

const promiseThunkMiddleware = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }

  const { promise, types, schema, ...rest } = action;
  if (!promise) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAILURE] = types;
  next({...rest, type: REQUEST});
  return promise.then(
    (result) => {
      const response = schema ? normalize(result, schema) : result;
      next({...rest, response, type: SUCCESS});
    },
    (error) => next({...rest, error, type: FAILURE})
  );
};

export default promiseThunkMiddleware;
