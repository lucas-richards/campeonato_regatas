"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Categoria.init(
    {
      descripcion: DataTypes.STRING,
      ano_inicio: DataTypes.DATE,
      ano_fin: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Categoria",
      freezeTableName: true,
    }
  );
  return Categoria;
};
