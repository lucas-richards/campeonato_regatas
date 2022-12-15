"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Zona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Categoria }) {
      // define association here
      this.belongsTo(Categoria, { foreignKey: "categoria_id" });
    }
  }
  Zona.init(
    {
      descripcion: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Zona",
      freezeTableName: true,
    }
  );
  return Zona;
};
