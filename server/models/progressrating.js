'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProgressRating = sequelize.define('ProgressRating', {
    progress: {
      type: DataTypes.ENUM,
      values: ['notyet', 'doing', 'done']
    },
    comment: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.ProgressReport);
        this.belongsTo(models.User);
      }
    }
  });
  return ProgressRating;
};
