"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Responsable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Responsable.init(
    {
      dni: DataTypes.STRING,
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
      mail_contacto: DataTypes.STRING,
      telefono: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Responsable",
      freezeTableName: true,
      freezeTableName: true,
    }
  );
  return Responsable;
};
