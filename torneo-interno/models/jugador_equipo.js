"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JugadorEquipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Jugador, Equipo }) {
      // define association here
      this.belongsTo(Jugador, { foreignKey: "jugador_id" });
      this.belongsTo(Equipo, { foreignKey: "equipo_id" });
    }
  }
  JugadorEquipo.init(
    {
      nada: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "JugadorEquipo",
      tableName: "jugador_equipo",
    }
  );
  return JugadorEquipo;
};
