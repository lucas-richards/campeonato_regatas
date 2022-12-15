"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Partido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Equipo, Zona }) {
      // define association here
      this.belongsTo(Zona, { foreignKey: "zona_id" });
      this.belongsTo(Equipo, { foreignKey: "local" });
      this.belongsTo(Equipo, { foreignKey: "visitante" });
    }
  }
  Partido.init(
    {
      gol_local: DataTypes.INTEGER,
      gol_visitante: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Partido",
      freezeTableName: true,
    }
  );
  return Partido;
};
