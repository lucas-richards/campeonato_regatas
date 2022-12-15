"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Jugador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Nivel, Categoria }) {
      // define association here
      this.belongsTo(Nivel, { foreignKey: "nivel_observado" });
      this.belongsTo(Categoria, { foreignKey: "categoria_id" });
    }
  }
  Jugador.init(
    {
      dni: DataTypes.STRING,
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
      mail: DataTypes.STRING,
      telefono: DataTypes.STRING,
      fecha_nacimiento: DataTypes.DATE,
      sexo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Jugador",
      freezeTableName: true,
    }
  );
  return Jugador;
};
