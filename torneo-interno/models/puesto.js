"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Puesto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Puesto.init(
    {
      descripcion: DataTypes.STRING,
      valor: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Puesto",
      freezeTableName: true,
    }
  );
  return Puesto;
};
