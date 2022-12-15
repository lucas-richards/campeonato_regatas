"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Gol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Jugador, Partido }) {
      // define association here
      this.belongsTo(Jugador, { foreignKey: "jugador_id" });
      this.belongsTo(Equipo, { foreignKey: "equipo_id" });
    }
  }
  Gol.init(
    {},
    {
      sequelize,
      modelName: "Gol",
      freezeTableName: true,
    }
  );
  return Gol;
};
