const { Sequelize, DataTypes } = require("sequelize");

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    logging: false,
  }
);

// Model loader
function init(sequelize) {
  const models = {};

  models.User = require("./users.model")(sequelize, DataTypes);
  models.Role = require("./roles.model")(sequelize, DataTypes);
  models.Permission = require("./permissions.model")(sequelize, DataTypes);
  models.Faults = require("./elevator_faults.model")(sequelize, DataTypes);
  models.Alarms = require("./elevator_alarms.model")(sequelize, DataTypes);
  models.RptWait = require("./rpt_wait.model")(sequelize, DataTypes);
  models.RptProgramEvents = require("./rpt_program_events.model")(sequelize, DataTypes);
  models.RptServices = require("./rpt_services.model")(sequelize, DataTypes);
  models.RefCategory = require("./ref_class_category.model")(sequelize, DataTypes);
  models.RefClass = require("./ref_class.model")(sequelize, DataTypes);
  models.RptFaults = require("./rpt_faults.model")(sequelize, DataTypes);
  models.SystemFaults = require("./system_faults.model")(sequelize, DataTypes);
  models.RptAlarms = require("./rpt_alarms.model")(sequelize, DataTypes);
  models.SystemAlarms = require("./system_alarms.model")(sequelize, DataTypes);

  // Pivot tables
  models.UserRole = sequelize.define("UserRole", {}, { tableName: "user_roles", timestamps: false });
  models.RolesPermissions = sequelize.define("RolesPermissions", {}, { tableName: "roles_permissions", timestamps: false });

  // Associations
  models.User.belongsToMany(models.Role, { through: models.UserRole, foreignKey: "user_id", otherKey: "role_id" });
  models.Role.belongsToMany(models.User, { through: models.UserRole, foreignKey: "role_id", otherKey: "user_id" });
  models.Role.belongsToMany(models.Permission, { through: models.RolesPermissions, foreignKey: "role_id", otherKey: "permission_id" });
  models.Permission.belongsToMany(models.Role, { through: models.RolesPermissions, foreignKey: "permission_id", otherKey: "role_id" });
  models.RptFaults.belongsTo(models.SystemFaults, { as: "system_fault", foreignKey: "fault_id", targetKey: "number" });
  models.RptAlarms.belongsTo(models.SystemAlarms, { as: "system_alarms", foreignKey: "alarm_id", targetKey: "number" });
  models.RptServices.belongsTo(models.RefCategory, { as: "refClassCategory", foreignKey: "mode_of_operation", targetKey: "ref_cat_id" });
  models.RefCategory.belongsTo(models.RefClass, { as: "refClass", foreignKey: "ref_class_id", targetKey: "class_id" });

  return models;
}

const models = init(sequelize);

module.exports = {
  init,
  sequelize,
  Sequelize,
  ...models
};
