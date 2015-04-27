var debug = require('debug')('ppt:seed-mock-data');

/*if you are unfamiliar with what's going on here, please check
http://docs.strongloop.com/display/public/LB/Connect+your+API+to+a+data+source*/

module.exports = function(server) {
  var dataSource = server.dataSources.db,

      // Created instances
      governors, users, terms, policies, promises, groupings, progressReports,
      progressReportHistories, progressRatings;

  fillTable('Governor', [
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
  ]).then(function(result){
    governors = result;

    return fillTable('UserModel', [
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
    ]);
  }).then(function(result){
    users = result;

    return fillTable('Term', [
      {
        "leader": "林佳龍",
        "title": "台中市長",
        "startDate": new Date("2014/12/25"),
        "endDate": new Date("2018/12/25"),
        "governorId": governors[0].id
      },
      {
        "leader": "柯文哲",
        "title": "台北市長",
        "startDate": new Date("2014/12/25"),
        "endDate": new Date("2018/12/25"),
        "governorId": governors[1].id
      }
    ]);
  }).then(function(result){
    terms = result;

    return fillTable('Policy', [
      {
        "name": "社會福利",
        "startDate": new Date("2014/12/25"),
        "governorId": governors[0].id
      },
      {
        "name": "交通系統建設",
        "startDate": new Date("2014/12/25"),
        "governorId": governors[0].id
      },
      {
        "name": "開放政府全民參與",
        "startDate": new Date("2014/12/25"),
        "governorId": governors[1].id
      },
      {
        "name": "學齡前與小學照顧/教育",
        "startDate": new Date("2014/12/25"),
        "governorId": governors[1].id
      },
    ]);

  }).then(function(result){
    policies = result;

    return fillTable('Promise', [
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
    ]);

  }).then(function(result){
    promises = result;

    return fillTable('Grouping', [
      {"policyId": policies[0].id, "promiseId": promises[0].id },
      {"policyId": policies[0].id, "promiseId": promises[1].id },
      {"policyId": policies[2].id, "promiseId": promises[2].id },
      {"policyId": policies[2].id, "promiseId": promises[3].id },
      {"policyId": policies[3].id, "promiseId": promises[4].id },
      {"policyId": policies[3].id, "promiseId": promises[5].id },
    ]);

  }).then(function(result){
    groupings = result;

    return fillTable('ProgressReport', [
      {
        "isRetracted": false,
        "promiseId": promises[0].id
      }
    ]);

  }).then(function(result){
    progressReports = result;

    return fillTable('ProgressReportHistory', [
      {
        "brief": "台中市政府社會局申請生育津貼，金額為單胞胎新臺幣ㄧ萬元，雙胞胎新臺幣三萬⋯⋯",
        "reference": "http://www.society.taichung.gov.tw/faq/index-1.asp?Parser=27,8,28,,,,809,15",
        "progressReportId": progressReports[0].id
        // First progress report is anonymous
      }
    ]);

  }).then(function(result){
    progressReportHistories = result;

    return fillTable('ProgressRating', [
      {
        "progress": "doing",
        "comment": "",
        "progressReportId": progressReports[0].id,
        "userModelId": users[0].id
      },
      {
        "progress": "done",
        "comment": "這份是社會局的文件，申請要建與方式已經寫得很清楚了，而且我才剛領到這個補助。",
        "progressReportId": progressReports[0].id,
        "userModelId": users[1].id
      }
    ]);

  }).then(function(result){
    progressRatings = result;

    dataSource.disconnect();
  });


  function fillTable(tableName, data) {
    return new Promise(function(resolve){
      dataSource.automigrate(tableName, function(err) {
        if (err) throw err;
        var Model = server.models[tableName];

        Promise.all(data.map(function(datum) {
          return new Promise(function(resolveModel){
            Model.create(datum, function(err, model) {
              if (err) return;
              debug(tableName, 'record created:', model);
              resolveModel(model);
            });
          });
        })).then(function(models){
          resolve(models);
        })
      });
    });
  }
};
