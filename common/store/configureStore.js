import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseThunkMiddleware from '../middlewares/promiseThunkMiddleware';
import loggerMiddleware from '../middlewares/loggerMiddleware';
import reducers from '../reducers';

const reducer = combineReducers(reducers);

const createStoreWithMiddleware = applyMiddleware(
  promiseThunkMiddleware,
  loggerMiddleware,
)(createStore);

/**
 * Creates a preconfigured store for this example.
 */
export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}
