module.exports = function mountBuildInModels(server){
  var dataSource = server.dataSources.db;
  var buildInModels = ['ACL', 'RoleMapping', 'Role',
    'accessToken', 'userCredential', 'userIdentity'];
  dataSource.autoupdate(buildInModels, function(er) {
    if (er) throw er;
    console.log('Looback tables [' + buildInModels + '] created in ', dataSource.adapter.name);
    dataSource.disconnect();
  });
};
