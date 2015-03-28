var assign = require('object-assign'),
    createStore = require('fluxible/addons/createStore');

const MOCK = {
  governer: {
    name: '林佳龍',
  },
  promise: {
    brief: "台中縣、市婦女生育，每位新生兒補助一萬元",
    content: "為了讓選民了解胡志強在當選後的大台中具體施政內容，推出「福利齊步走」九項福利政見。包括台中縣、市婦女生育每位新生兒補助一萬元。",
    referenceText: "NowNews 2010-7-27 報導",
    referenceUrl: "http://www.nownews.com/n/2010/07/27/654760",
    createdAt: ""
  },
  progressReports: [
    {
      isRetracted: false,
      brief: "台中市政府社會局申請生育津貼，金額為單胞胎新臺幣ㄧ萬元，雙胞胎新臺幣三萬⋯⋯",
      referenceUrl: "http://www.society.taichung.gov.tw/faq/index-1.asp?Parser=27,8,28,,,,809,15",
      referenceText: "社會局 FAQ",
      referenceTime: "",
      ratings: [
        {
          avatar: 'http://graph.facebook.com/100002188898192/picture?type=square',
          name: 'Johnson Liang',
          fbprofile: 'http://www.facebook.com/johnsonliang',
          progress: 'doing',
          comment: '這份是社會局的文件，申請要建與方式已經寫得很清楚了，而且我才剛領到這個補助。'
        },
        {
          avatar: 'http://semantic-ui.com/images/avatar/small/daniel.jpg',
          name: '大中天',
          fbprofile: 'http://www.facebook.com/johnsonliang',
          progress: 'doing',
          comment: ''
        },
        {
          avatar: 'http://semantic-ui.com/images/avatar/small/steve.jpg',
          name: '',
          fbprofile: 'http://www.facebook.com/johnsonliang',
          progress: 'notyet',
          comment: ''
        }
      ]
    },
    {
      isRetracted: false,
      brief: "台中市政府社會局申請生育津貼，金額為單胞胎新臺幣ㄧ萬元，雙胞胎新臺幣三萬⋯⋯",
      referenceUrl: "http://www.society.taichung.gov.tw/faq/index-1.asp?Parser=27,8,28,,,,809,15",
      referenceText: "社會局 FAQ",
      ratings: [
        {
          avatar: 'http://graph.facebook.com/100002188898192/picture?type=square',
          name: 'Johnson Liang',
          fbprofile: 'http://www.facebook.com/johnsonliang',
          progress: 'doing',
          comment: '這份是社會局的文件，申請要建與方式已經寫得很清楚了，而且我才剛領到這個補助。'
        },
        {
          avatar: 'http://semantic-ui.com/images/avatar/small/daniel.jpg',
          name: '大中天',
          fbprofile: 'http://www.facebook.com/johnsonliang',
          progress: 'doing',
          comment: ''
        },
      ]
    },
    {
      isRetracted: false,
      brief: "台中市政府社會局申請生育津貼，金額為單胞胎新臺幣ㄧ萬元，雙胞胎新臺幣三萬⋯⋯",
      referenceUrl: "http://www.society.taichung.gov.tw/faq/index-1.asp?Parser=27,8,28,,,,809,15",
      referenceText: "社會局 FAQ",
      ratings: [
        {
          avatar: 'http://graph.facebook.com/100002188898192/picture?type=square',
          name: 'Johnson Liang',
          fbprofile: 'http://www.facebook.com/johnsonliang',
          progress: 'doing',
          comment: '這份是社會局的文件，申請要建與方式已經寫得很清楚了，而且我才剛領到這個補助。'
        },
        {
          avatar: 'http://semantic-ui.com/images/avatar/small/daniel.jpg',
          name: '大中天',
          fbprofile: 'http://www.facebook.com/johnsonliang',
          progress: 'doing',
          comment: ''
        },
      ]
    },
  ]
};

module.exports = createStore({
  storeName: 'PromiseDetailStore',

  initialize() {
    this.data = MOCK;
  },

  dehydrate() {
    return this.data;
  },

  rehydrate(state) {
    this.data = state;
  }

});
