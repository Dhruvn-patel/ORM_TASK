'use strict';
const {
  Model
} = require('sequelize');
const db = require('../models');
const TagJunc = db.TagJunc;
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here
      // // We then specify the foreignKey option to be 'id'. This specifies that the id column in the tags table should be used as the foreign key in the TagJunc table.
      Tag.belongsToMany(models.Image, {
        through: {

          
          model:  models.TagJunc,
          unique: false
        },
        foreignKey: 'tagId',
        constraints: false
      });
      Tag.belongsToMany(models.Video, {
        through: {
          model:  models.TagJunc,
          unique: false
        },
        foreignKey: 'tagId',
        constraints: false
      });
    }
  }
  Tag.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};