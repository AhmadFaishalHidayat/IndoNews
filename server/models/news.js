'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  News.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title is required notNull"
        },
        notEmpty: {
          msg: "Title is required notEmpty"
        }
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Url is required notNull"
        },
        notEmpty: {
          msg: "Url is required notEmpty"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "UserId is required notNull"
        },
        notEmpty: {
          msg: "UserId is required notEmpty"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};