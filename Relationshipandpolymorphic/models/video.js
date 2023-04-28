'use strict';
const {
  Model
} = require('sequelize');
const db = require('../models');
const TagJunc = db.TagJunc;
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Video.hasMany(models.Comment, {
      //   foreignKey: 'commentableId',
      //   constraints: false,
      //   scope: {
      //     commentableType: 'video'
      //   }
      // });


      Video.belongsToMany(models.Tag, {
        through: {
          model:  models.TagJunc,
          unique: false,
          scope: {
            taggableType: 'video'
          }
        },
        foreignKey: 'taggableId',
        constraints: false,

      });
    }
  }
  Video.init({
    title: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};