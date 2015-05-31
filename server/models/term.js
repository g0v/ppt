'use strict';
module.exports = function(sequelize, DataTypes) {
  var Term = sequelize.define('Term', {
    leader: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.Governor);
      }
    }
  });
  return Term;
};
