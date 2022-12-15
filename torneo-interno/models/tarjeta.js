"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tarjeta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Jugador, Partido }) {
      // define association here
      this.belongsTo(Jugador, { foreignKey: "jugador_id" });
      this.belongsTo(Partido, { foreignKey: "partido_id" });
    }
  }
  Tarjeta.init(
    {
      amarilla: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Tarjeta",
      freezeTableName: true,
    }
  );
  return Tarjeta;
};
