var properties = {
  avatar: {type: String, required: false}
};
 
var options = {
  relations: {
    account: {
      model: 'ProgressReportHistory',
      type: 'hasMany'
    },
    transactions: {
      model: 'ProgressRating',
      type: 'hasMany'
    }
  }
//   , acls: [
//     {
//       permission: ALLOW,
//       principalType: ROLE,
//       principalId: $everyone,
//       property: myMethod
//     }
//   ]
};
 
var user = loopback.Model.extend('user', properties, options);
