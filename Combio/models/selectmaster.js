'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Selectmaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Selectmaster.hasMany(models.Optionmaster, {foreignKey:'state_id'})
    }
  }
  Selectmaster.init({
    name: DataTypes.STRING,
    type:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Selectmaster',
  });
  return Selectmaster;
};