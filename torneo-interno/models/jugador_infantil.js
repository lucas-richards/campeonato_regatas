"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JugadorInfantil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Responsable, Puesto, Torneo, Nivel, Jugador }) {
      // define association here
      this.belongsTo(Responsable, { foreignKey: "responsable_id" });
      this.belongsTo(Puesto, { foreignKey: "puesto_id" });
      this.belongsTo(Torneo, { foreignKey: "torneo_id" });
      this.belongsTo(Nivel, { foreignKey: "nivel_id" });
      this.belongsTo(Jugador, { foreignKey: "jugador_id" });
    }
  }
  JugadorInfantil.init(
    {
      telefono_emergencia: DataTypes.STRING,
      socio: DataTypes.BOOLEAN,
      capitan: DataTypes.BOOLEAN,
      habilitado: DataTypes.BOOLEAN,
      tercer_hijo: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "JugadorInfantil",
      tableName: "jugador_infantil",
      freezeTableName: true,
    }
  );
  return JugadorInfantil;
};
