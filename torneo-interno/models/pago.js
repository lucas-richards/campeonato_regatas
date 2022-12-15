"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Responsable }) {
      // define association here
      this.belongsTo(Responsable, { foreignKey: "responsable_id" });
    }
  }
  Pago.init(
    {
      transferencia: DataTypes.INTEGER,
      comprobante: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pago",
      freezeTableName: true,
    }
  );
  return Pago;
};
