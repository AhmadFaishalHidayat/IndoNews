'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.News, { foreignKey: "UserId" });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email is Unique"
      },
      validate: {
        notNull: {
          msg: "Email is required notNull"
        },
        notEmpty: {
          msg: "Email is required notEmpty"
        },
        isEmail: {
          args: true,
          msg: "Email is Format Email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required notNull"
        },
        notEmpty: {
          msg: "Password is required notEmpty"
        },
      }
    }
  }, {
    hooks:{
      beforeCreate(instance, option){
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};