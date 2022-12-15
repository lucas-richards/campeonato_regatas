"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Torneo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Torneo.init(
    {
      ano_torneo: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Torneo",
      freezeTableName: true,
    }
  );
  return Torneo;
};
