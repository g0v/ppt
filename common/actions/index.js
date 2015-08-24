import Schemas from '../config/schema';
import { normalize } from 'normalizr';
import findAll from '../utils/findAll';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

const debug = require('debug')('ppt:action');

export function fetchDataCreator(model, query) {
  const schemaName = model.toUpperCase() + '_ARRAY';

  return (dispatch) => {
    dispatch({type: FETCH_DATA_REQUEST}); // optimistic update here if you want

    return findAll(model, query).then(
      (result) => {
        debug('result', result);
        const response = normalize(result, Schemas[schemaName]);
        dispatch({response, type: FETCH_DATA_SUCCESS});
      },
      (error) => {
        debug('error', error);
        dispatch({error, type: FETCH_DATA_FAILURE});
      }
    );
  };
}
