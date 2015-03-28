var assign = require('object-assign'),
    createStore = require('fluxible/addons/createStore');

const MOCK = {
  name: '台中市政府',
  avatar: "http://semantic-ui.com/images/avatar/small/daniel.jpg",
  coverPhoto: "/images/coverphoto.png",
  policies: [
    {
      name: "社會福利",
      promises: [
        {
          id: 1,
          brief: "台中縣、市婦女生育，每位新生兒補助一萬元",
          content: "台中市政府社會局申請生育津貼，金額為單胞胎新臺幣ㄧ萬元，雙胞胎新臺幣三萬元，三胞胎以⋯⋯",
          createdAt: "",
          progressRating: {
            progress: 'doing',
            count: 2
          }
        },
        {
          id: 2,
          brief: "滿六十五歲以上老人，每月一千元免費搭乘公車",
          content: "臺中市政府辦理年滿 65 歲以上老人及身心障礙者乘車補助，免費乘車額度每月1,000點。",
          createdAt: "",
          progressRating: {
            progress: 'doing',
            count: 1
          }
        }
      ],
      stats: {
        notyet: 0,
        doing: 2,
        done: 0
      }
    },
    {
      name: "交通系統建設",
      promises: [
      ],
      stats: {
        notyet: 0,
        doing: 0,
        done: 0
      }
    }
  ],
  stats: {
    done: 6,
    doing: 18,
    notyet: 19
  }
}

module.exports = createStore({
  storeName: 'GovernerStore',

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
