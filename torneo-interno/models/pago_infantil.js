"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PagoInfantil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Pago, JugadorInfantil }) {
      // define association here
      this.belongsTo(Pago, { foreignKey: "pago_id" });
      this.belongsTo(JugadorInfantil, { foreignKey: "jugador_infantil_id" });
    }
  }
  PagoInfantil.init(
    {},
    {
      sequelize,
      modelName: "PagoInfantil",
      tableName: "pago_infantil",
    }
  );
  return PagoInfantil;
};
