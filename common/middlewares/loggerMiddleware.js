const debug = require('debug')('ppt:logger');

export default function loggerMiddleware({ getState }) {
  return next => action => {
    if (process.env.NODE_ENV !== 'production') {
      debug(`${action && action.type}`, action);
      debug('state', getState());
    }
    next(action);
  };
}
