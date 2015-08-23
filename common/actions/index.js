import Schemas from '../config/schema';
import findAll from '../utils/findAll';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

// const debug = require('debug')('ppt:action');

export function fetchData(model, query) {
  const schemaName = model.toUpperCase() + '_ARRAY';
  return {
    types: [FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE],
    promise: findAll(model, query),
    schema: Schemas[schemaName],
  };
}
