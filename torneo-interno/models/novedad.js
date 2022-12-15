"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Novedad extends Model {
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
  Novedad.init(
    {
      novedad: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Novedad",
      freezeTableName: true,
    }
  );
  return Novedad;
};
