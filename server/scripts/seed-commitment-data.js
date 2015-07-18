require('../../server/utils/catchUnhandledPromiseRejections');
import fillTable from '../utils/fillTable';
import parse from 'csv-parse';
import fs from 'fs';

const PROGRESS_MAP = {
  '還沒做': 'notyet',
  '正在做': 'doing',
  '已完成': 'done',
  '' : 'notyet'
};

var
debug = require('debug')('ppt:seed-commitment-data'),
models = require('../models'),
seed = async function() {

  var
  governors = await fillTable('Governor', [
    {
      name: '桃園市政府',
      avatar: 'http://semantic-ui.com/images/avatar/small/daniel.jpg',
      coverPhoto: '/images/coverphoto.png'
    }
  ]),

  users = await fillTable('User', [
    {
      'name': 'Admin',
      // No password and email, cannot login
      'avatar': 'http://semantic-ui.com/images/avatar/small/daniel.jpg'
    }
  ]),

  terms = await fillTable('Term', [
    {
      'leader': '鄭文燦',
      'title': '桃園市長',
      'startDate': new Date('2014/12/25'),
      'endDate': new Date('2018/12/25'),
      'GovernorId': governors[0].id
    }
  ]),

  csvData = await parseAsync(__dirname + '/../seeds/taoyuan.csv');
  console.log('CSV', csvData.length);

  let currentPolicy;
  for (let i = 0; i < csvData.length; i += 1) {
    let [
      policyName, commitmentBrief, reference, commitmentContent, progressBrief, progress, progressComment
    ] = csvData[i];

    if(!currentPolicy || policyName !== currentPolicy.name) {
      currentPolicy = (await fillTable('Policy', [{
        name: policyName,
        startDate: new Date('2014/12/25'),
        GovernorId: governors[0].id
      }]))[0];
    }

    let commitment = (await fillTable('Commitment', [{
      brief: commitmentBrief,
      content: commitmentContent,
      reference,
      startDate: new Date('2014/12/25')
    }]))[0];

    await fillTable('Grouping', [{
      PolicyId: currentPolicy.id,
      CommitmentId: commitment.id
    }]);

    let progressReport = (await fillTable('ProgressReport', [{
      isRetracted: false,
      CommitmentId: commitment.id
    }]))[0];

    await fillTable('ProgressReportHistory', [{
      brief: progressBrief || commitmentContent,
      reference,
      ProgressReportId: progressReport.id,
      // First progress report is anonymous
    }]);

    await fillTable('ProgressRating', [{
      progress: PROGRESS_MAP[progress],
      comment: progressComment || '',
      ProgressReportId: progressReport.id,
      UserId: users[0].id
    }]);
  }
};

function parseAsync(fileName) {
  return new Promise((resolve, reject) => {
    parse(fs.readFileSync(fileName, {encoding: 'utf-8'}), {trim: true}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

seed().then(() => {
  console.log('Seed complete!');
});
