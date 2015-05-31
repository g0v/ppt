'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProgressReport = sequelize.define('ProgressReport', {
    isRetracted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.Promise);
        this.hasMany(models.ProgressReportHistory);
        this.hasMany(models.ProgressReport);
      }
    }
  });
  return ProgressReport;
};
