'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('detail', {
      id_detail: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_transaksi: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"transaksi",
          key:"id_transaksi"
        }
      },
      id_paket: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"paket",
          key:"id_paket"
        }
      },
      qty: {
        type: Sequelize.INTEGER
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('detail');
  }
};