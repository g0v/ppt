'use strict';
module.exports = function(sequelize, DataTypes) {
  var Commitment = sequelize.define('Commitment', {
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
  return Commitment;
};
