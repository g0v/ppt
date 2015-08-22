import merge from 'lodash/object/merge';
import { FETCH_DATA_REQUEST } from '../actions';
/**
 * Updates an entity cache in response to any action with response.entities.
 */
const entitiesState = {
  governors: {},
  terms: {},
  policies: {},
  progressreports: {},
  commitments: {},
  progressreporthistorys: {},
  progressratings: {},
  users: {},
};

function entities(state = entitiesState, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

/**
 * Updates error message to notify about the failed fetches.
 */
function errorMessage(state = null, action) {
  const { error } = action;
  if (error) {
    return action.error;
  }

  return state;
}

function isLoading(state = false, action) {
  const { type } = action;
  if (type === FETCH_DATA_REQUEST) {
    return true;
  }
  return state;
}

export default {
  entities,
  errorMessage,
  isLoading,
};
