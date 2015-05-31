'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProgressReportHistory = sequelize.define('ProgressReportHistory', {
    brief: DataTypes.STRING,
    reference: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.ProgressReport);
        this.belongsTo(models.User);
      }
    }
  });
  return ProgressReportHistory;
};
