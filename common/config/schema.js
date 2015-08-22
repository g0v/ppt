import { Schema, arrayOf } from 'normalizr';

const governor = new Schema('governors', {idAttribute: name});
const term = new Schema('terms');
const policy = new Schema('policies');
const progressreport = new Schema('progressreports');
const commitment = new Schema('commitments');
const progressreporthistory = new Schema('progressreporthistorys');
const progressrating = new Schema('progressratings');
const user = new Schema('users');

governor.define({
  Policies: arrayOf(policy),
  Terms: arrayOf(term),
});

policy.define({
  Commitments: arrayOf(commitment),
});

commitment.define({
  ProgressReports: arrayOf(progressreport),
});

progressreport.define({
  ProgressReportHistories: arrayOf(progressreporthistory),
  ProgressRatings: arrayOf(progressrating),
});

progressreporthistory.define({
  Users: arrayOf(user),
});

progressrating.define({
  Users: arrayOf(user),
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
  PROGRESSREPORT: progressreport,
  PROGRESSREPORT_ARRAY: arrayOf(progressreport),
  PROGRESSREPORTHISTORY: progressreporthistory,
  PROGRESSREPORTHISTORY_ARRAY: arrayOf(progressreporthistory),
  PROGRESSRATING: progressrating,
  PROGRESSRATING_ARRAY: arrayOf(progressrating),
  USER: user,
  USER_ARRAY: arrayOf(user),
};
