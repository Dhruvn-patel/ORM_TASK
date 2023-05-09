'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Optionmaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Optionmaster.belongsTo(models.Selectmaster, {foreignKey:'state_id'})
    }
  }
  Optionmaster.init({
    state_id: DataTypes.INTEGER,
    values: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Optionmaster',
  });
  return Optionmaster;
};