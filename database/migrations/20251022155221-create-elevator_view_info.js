'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("elevator_view_info", {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true 
    },
    elevator_view_format_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    visible_elevator_view: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    layout: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    layout_option: {
      type: Sequelize.JSON,
      allowNull: true
    }
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
    //await queryInterface.addIndex("elevator_view_info", ["device_info_id"], { name: "elevator_view_info_device_info_id_foreign" });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("elevator_view_info", "elevator_view_info_device_info_id_foreign");
    await queryInterface.dropTable("elevator_view_info");
  }
};
