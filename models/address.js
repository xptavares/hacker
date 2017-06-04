'use strict';
module.exports = function(sequelize, DataTypes) {
  var Address = sequelize.define('Address', {
    location: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now')
    }
  }, {
    timestamps: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Address.belongsTo(models.Person, { foreignKey:'personId'} );
      }
    }
  });
  return Address;
};
