module.exports = function(server) {

  createTable('Governor', [
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
  ]);

  function createTable(tableName, data) {
    var dataSource = server.dataSources.db;

    dataSource.automigrate(tableName, function(err) {
      if (err) throw err;
      var Model = server.models[tableName];

      Promise.all(data.map(function(datum) {
        return new Promise(function(resolve){
          Model.create(datum, function(err, result) {
            if (err) return;
            console.log(tableName, 'record created:', result);
            resolve();
          });
        });
      })).then(function(){
        dataSource.disconnect();
      });
    });
  }
};


