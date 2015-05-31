'use strict';
module.exports = function(sequelize, DataTypes) {
  var Governor = sequelize.define('Governor', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: DataTypes.STRING,
    coverPhoto: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.hasMany(models.Term);
        this.hasMany(models.Policy);
      }
    }
  });
  return Governor;
};
