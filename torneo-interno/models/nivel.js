"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nivel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Nivel.init(
    {
      descripcion: DataTypes.STRING,
      nivel: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Nivel",
      freezeTableName: true,
    }
  );
  return Nivel;
};
