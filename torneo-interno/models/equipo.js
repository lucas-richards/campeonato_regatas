"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Equipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Torneo, Jugador, Categoria, Zona }) {
      // define association here
      this.belongsTo(Torneo, { foreignKey: "torneo_id" });
      this.belongsTo(Jugador, { foreignKey: "capitan" });
      this.belongsTo(Categoria, { foreignKey: "categoria_id" });
      this.belongsTo(Zona, { foreignKey: "zona_id" });
    }
  }
  Equipo.init(
    {
      nombre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Equipo",
      freezeTableName: true,
    }
  );
  return Equipo;
};
