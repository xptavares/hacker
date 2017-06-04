'use strict';
module.exports = function(sequelize, DataTypes) {
  var Person = sequelize.define('Person', {
    name: DataTypes.STRING,
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
        Person.hasMany(models.Address, { foreignKey: 'personId'} );
      }
    }
  });
  return Person;
};
