'use strict';
module.exports = function(sequelize, DataTypes) {
  var Promise = sequelize.define('Promise', {
    brief: DataTypes.STRING,
    content: DataTypes.STRING,
    reference: DataTypes.STRING,
    startDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.hasMany(models.Grouping);
        this.belongsToMany(models.Policy, {through: models.Grouping});
        this.hasMany(models.ProgressReport);
      }
    }
  });
  return Promise;
};
