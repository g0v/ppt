import merge from 'lodash/object/merge';
import { FETCH_DATA_REQUEST } from '../actions';
import {PROGRESS_OPTIONS} from '../config/constants';
import {majority, findLatestProgressReport} from '../utils';
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

    // Gather progress stats for all relevant governors then policies and commitments stats
    const { governors, policies, commitments, progressReports, progressRatings } = state;

    const allStats = Object.keys(state.governors).reduce((preStats, name) => {
      const governorStats = {};
      governors[name].policies && governors[name].Policies.map(policyID => {
        const policyStats = {};
        policies[policyID].Commitments.map(commitmentID => {
          const latestReport = findLatestProgressReport(commitments[commitmentID].
            ProgressReports.map(reportID => progressReports[reportID]));

          const progress = latestReport && majority(latestReport.ProgressRatings.
            map(ratingID => progressRatings[ratingID].progress)) || PROGRESS_OPTIONS[0];

          preStats.commitments[commitmentID] = {
            latestRateCount: latestReport ? latestReport.ProgressRatings.length : 0,
            majorityProgress: progress,
          };

          policyStats[progress] = policyStats[progress] + 1 || 1;
          governorStats[progress] = governorStats[progress] + 1 || 1;
        });
        preStats.policies[policyID] = {
          policyStats: policyStats,
        };
      });

      preStats.governors[name] = {
        governorStats: governorStats,
      };
      return preStats;
    }, {
      governors: {}, policies: {}, commitments: {},
    });

    return merge(allStats, state, action.response.entities);
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
