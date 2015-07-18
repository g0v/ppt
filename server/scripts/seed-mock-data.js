require('../../server/utils/catchUnhandledPromiseRejections');
import fillTable from '../utils/fillTable';

var
debug = require('debug')('ppt:seed-mock-data'),
models = require('../models'),
seed = async function() {

  var
  governors = await fillTable('Governor', [
    {
      name: '台中市政府',
      avatar: "http://semantic-ui.com/images/avatar/small/daniel.jpg",
      coverPhoto: "/images/coverphoto.png"
    },
    {
      name: '台北市政府',
      avatar: "http://semantic-ui.com/images/avatar/small/daniel.jpg",
      coverPhoto: "/images/coverphoto.png"
    }
  ]),

  users = await fillTable('User', [
    {
      "username": "John Doe",
      "email": "johnsonliang7+test@gmail.com",
      "password": "123",
      "avatar": "http://semantic-ui.com/images/avatar/small/daniel.jpg"
    },
    {
      "username": "Doe Johnson",
      "email": "johnsonliang7+test@gmail.com",
      "password": "123",
      "avatar": "http://semantic-ui.com/images/avatar/small/steve.jpg"
    }
  ]),

  terms = await fillTable('Term', [
    {
      "leader": "林佳龍",
      "title": "台中市長",
      "startDate": new Date("2014/12/25"),
      "endDate": new Date("2018/12/25"),
      "GovernorId": governors[0].id
    },
    {
      "leader": "柯文哲",
      "title": "台北市長",
      "startDate": new Date("2014/12/25"),
      "endDate": new Date("2018/12/25"),
      "GovernorId": governors[1].id
    }
  ]),

  policies = await fillTable('Policy', [
    {
      "name": "社會福利",
      "startDate": new Date("2014/12/25"),
      "GovernorId": governors[0].id
    },
    {
      "name": "交通系統建設",
      "startDate": new Date("2014/12/25"),
      "GovernorId": governors[0].id
    },
    {
      "name": "開放政府全民參與",
      "startDate": new Date("2014/12/25"),
      "GovernorId": governors[1].id
    },
    {
      "name": "學齡前與小學照顧/教育",
      "startDate": new Date("2014/12/25"),
      "GovernorId": governors[1].id
    },
  ]),
  commitments = await fillTable('Commitment', [
    {
      "brief": "中縣、市婦女生育，每位新生兒補助一萬元",
      "content": "為了讓選民了解胡志強在當選後的大台中具體施政內容，推出「福利齊步走」九項福利政見。包括台中縣、市婦女生育每位新生兒補助一萬元。",
      "reference": "http://www.nownews.com/n/2010/07/27/654760",
      "startDate": new Date("2010/12/25")
    },
    {
      "brief": "滿六十五歲以上老人，每月一千元免費搭乘公車",
      "content": "臺中市政府辦理年滿 65 歲以上老人及身心障礙者乘車補助，免費乘車額度每月1,000點。",
      "reference": "http://www.society.taichung.gov.tw/section/index-1.asp?Parser=99,16,257,,,,868,147,,,3,7,,3",
      "startDate": new Date("2010/12/25")
    },
    {
      "brief": "全民審查 2015 已編列預算，擠出 100 億",
      "content": "市府公布 2015 已編列預算，鼓勵全民找出其中浪費的部分，擠出 100 億，並且在 2015 年後匡列 100 億預算，由公民提案、專家頻選或市民網路投票。",
      "reference": "https://www.youtube.com/watch?v=6_LqnhuMhgA",
      "startDate": new Date("2014/12/25")
    },
    {
      "brief": "完全公開上網各機關編列預算",
      "content": "各機關編列預算後，完全公開上網揭露，再交由專家與市民參與審查，作為預算的外部審議機制。",
      "reference": "https://www.youtube.com/watch?v=6_LqnhuMhgA&t=1m33s",
      "startDate": new Date("2014/12/25")
    },
    {
      "brief": "推動公私合營幼兒園",
      "content": "政府出地（盤整公共閒置空間），鼓勵民間業者、非營利組織、社會企業承攬，民間自治經營並自負盈虧，家長與政府共同負擔營運成本；現有幼兒園若有意願，亦可接受輔導來承辦公私合營幼兒園。",
      "reference": "https://www.youtube.com/watch?v=F4R0wHo49sE",
      "startDate": new Date("2014/12/25")
    },
    {
      "brief": "普設課後及寒暑假照顧班",
      "content": "委由民間設置課後及寒暑假照顧班，獎勵學校釋放空間與設備，依照需求設計課程且提供多元化社團活動，不應當注重課業輔導與才藝學習。師資來自專職媽媽、流浪教師、大專社服、文化工作者。",
      "reference": "https://www.youtube.com/watch?v=qK9LNiMZOUo&feature=youtu.be&t=35s",
      "startDate": new Date("2014/12/25")
    }
  ]),

  groupings = await fillTable('Grouping', [
    {"PolicyId": policies[0].id, "CommitmentId": commitments[0].id },
    {"PolicyId": policies[0].id, "CommitmentId": commitments[1].id },
    {"PolicyId": policies[2].id, "CommitmentId": commitments[2].id },
    {"PolicyId": policies[2].id, "CommitmentId": commitments[3].id },
    {"PolicyId": policies[3].id, "CommitmentId": commitments[4].id },
    {"PolicyId": policies[3].id, "CommitmentId": commitments[5].id },
  ]),

  progressReports = await fillTable('ProgressReport', [
    {
      "isRetracted": false,
      "CommitmentId": commitments[0].id
    }
  ]),

  progressReportHistories = await fillTable('ProgressReportHistory', [
    {
      "brief": "台中市政府社會局申請生育津貼，金額為單胞胎新臺幣ㄧ萬元，雙胞胎新臺幣三萬⋯⋯",
      "reference": "http://www.society.taichung.gov.tw/faq/index-1.asp?Parser=27,8,28,,,,809,15",
      "ProgressReportId": progressReports[0].id
      // First progress report is anonymous
    }
  ]),

  progressRatings = await fillTable('ProgressRating', [
    {
      "progress": "doing",
      "comment": "",
      "ProgressReportId": progressReports[0].id,
      "UserId": users[0].id
    },
    {
      "progress": "done",
      "comment": "這份是社會局的文件，申請要建與方式已經寫得很清楚了，而且我才剛領到這個補助。",
      "ProgressReportId": progressReports[0].id,
      "UserId": users[1].id
    }
  ]);
};

seed().then(() => {
  console.log('Seed complete!');
});
