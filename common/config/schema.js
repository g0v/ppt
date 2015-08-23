import { Schema, arrayOf } from 'normalizr';

const governor = new Schema('governors', {idAttribute: name});
const term = new Schema('terms');
const policy = new Schema('policies');
const commitment = new Schema('commitments');
const progressReport = new Schema('progressReports');
const progressReportHistory = new Schema('progressReportHistories');
const progressRating = new Schema('progressRatings');
const user = new Schema('users');

governor.define({
  Policies: arrayOf(policy),
  Terms: arrayOf(term),
});

policy.define({
  Commitments: arrayOf(commitment),
});

commitment.define({
  ProgressReports: arrayOf(progressReport),
});

progressReport.define({
  ProgressReportHistories: arrayOf(progressReportHistory),
  ProgressRatings: arrayOf(progressRating),
});

progressReportHistory.define({
  User: user,
});

progressRating.define({
  User: user,
});

user.define({
  ProgressReportHistories: arrayOf(progressReportHistory),
  ProgressRatings: arrayOf(progressRating),
});

export default {
  GOVERNOR: governor,
  GOVERNOR_ARRAY: arrayOf(governor),
  TERM: term,
  TERM_ARRAY: arrayOf(term),
  POLICY: policy,
  POLICY_ARRAY: arrayOf(policy),
  COMMITMENT: commitment,
  COMMITMENT_ARRAY: arrayOf(commitment),
  PROGRESSREPORT: progressReport,
  PROGRESSREPORT_ARRAY: arrayOf(progressReport),
  PROGRESSREPORTHISTORY: progressReportHistory,
  PROGRESSREPORTHISTORY_ARRAY: arrayOf(progressReportHistory),
  PROGRESSRATING: progressRating,
  PROGRESSRATING_ARRAY: arrayOf(progressRating),
  USER: user,
  USER_ARRAY: arrayOf(user),
};
