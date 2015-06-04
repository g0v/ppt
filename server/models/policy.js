'use strict';
module.exports = function(sequelize, DataTypes) {
  var Policy = sequelize.define('Policy', {
    name: DataTypes.STRING,
    startDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.Governor);
        this.hasMany(models.Grouping);
        this.belongsToMany(models.Commitment, {through: models.Grouping});
      }
    }
  });
  return Policy;
};
