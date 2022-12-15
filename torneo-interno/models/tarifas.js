"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tarifas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Torneo }) {
      // define association here
      this.belongsTo(Torneo, { foreignKey: "torneo_id" });
    }
  }
  tarifas.init(
    {
      socio: DataTypes.BOOLEAN,
      valor: DataTypes.INTEGER,
      juvenil: DataTypes.BOOLEAN,
      fecha_inicio: DataTypes.DATE,
      fecha_fin: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "tarifas",
      freezeTableName: true,
    }
  );
  return tarifas;
};
