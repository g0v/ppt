import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseThunkMiddleware from './promiseThunkMiddleware';
import createLogger from 'redux-logger';
import reducers from '../reducers';

const reducer = combineReducers(reducers);
const logger = createLogger({
  predicate: () => __DEV__,
});
const createStoreWithMiddleware = applyMiddleware(
  promiseThunkMiddleware,
  logger
)(createStore);

/**
 * Creates a preconfigured store for this example.
 */
export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}
