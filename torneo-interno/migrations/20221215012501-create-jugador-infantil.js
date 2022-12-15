'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jugador_infantils', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      telefono_emergencia: {
        type: Sequelize.STRING
      },
      socio: {
        type: Sequelize.BOOLEAN
      },
      capitan: {
        type: Sequelize.BOOLEAN
      },
      habilitado: {
        type: Sequelize.BOOLEAN
      },
      tercer_hijo: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jugador_infantils');
  }
};