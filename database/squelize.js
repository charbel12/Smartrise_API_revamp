
require('dotenv').config(); 
const { Sequelize } = require('sequelize');

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT) || 3306,
  dialect: 'mysql',
  logging: false,
  timezone: '+00:00', 
  dialectOptions: {
    multipleStatements: true, 
  },
  pool: {
    max: 20,
    min: 0,
    acquire: 60000,
    idle: 20000,
  },
});

module.exports = { sequelize };
