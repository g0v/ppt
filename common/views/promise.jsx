var React = require('react'),
    Router = require('react-router'),
    styles = require('./styles.js');

var PromiseDetail = React.createClass({
  mixins: [Router.State],
  getInitialState: function(){
    return {
      governer: {
        name: '林佳龍',
      },
      promise: {
        brief: "台中縣、市婦女生育，每位新生兒補助一萬元",
        content: "台中市政府社會局申請生育津貼，金額為單胞胎新臺幣ㄧ萬元，雙胞胎新臺幣三萬元，三胞胎以⋯⋯",
        reference: "",
        createdAt: "",
      },
      progressRating: {
        progress: 'doing',
        count: 2
      }
    }
  },

  render: function(){
    var headerStyle = {

    };

    var governer = this.state.governer,
        promise = this.state.promise,
        rating = this.state.progressRating;

    return (
      <div className="full height main container" style={styles.mainContainer}>
        {governer.name}
      </div>
    );
  }
});

module.exports = PromiseDetail;
