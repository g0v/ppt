'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    fbid: DataTypes.STRING,
    googleid: DataTypes.STRING,
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.hasMany(models.ProgressReportHistory);
        this.hasMany(models.ProgressRating);
      }
    }
  });
  return User;
};
