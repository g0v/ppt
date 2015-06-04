'use strict';
module.exports = function(sequelize, DataTypes) {
  var Grouping = sequelize.define('Grouping', {}, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.Policy);
        this.belongsTo(models.Commitment);
      }
    }
  });
  return Grouping;
};
