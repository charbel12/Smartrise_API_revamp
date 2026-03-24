const { Sequelize, DataTypes } = require("sequelize");

const dbName = process.env.DB_DATABASE || 'pre_smartriselocal';

const sequelizeOptions = {
  dialect: 'sqlite',
  logging: false,
  storage: `/db/${dbName}.sqlite`
};

const sequelize = new Sequelize(
  dbName,
  process.env.DB_USERNAME || 'root',
  process.env.DB_PASSWORD || 'root',
  sequelizeOptions
);

const redisClient = require('../../helpers/tools.js').redisClient;

function pushToQueue(models, modelName, operation, payload, condition) {
    if (!models[modelName]) return Promise.reject(new Error("Model not found: " + modelName));
    const msg = {
        table: models[modelName].tableName,
        operation: operation,
        data: payload,
        condition: condition || {}
    };
    return redisClient.lPush('db_write_queue', JSON.stringify(msg)).catch(e => {
        console.error(`Redis DB Queue Error [${modelName}]:`, e);
        throw e;
    });
}

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
  models.RptCarCalls = require("./rpt_carcalls.model")(sequelize, DataTypes);
  models.RptHallCalls = require("./rpt_hallcalls.model")(sequelize, DataTypes);
  models.RptDoors = require("./rpt_doors.model")(sequelize, DataTypes);
  models.RptFloorToFloor = require("./rpt_floortofloor.model")(sequelize, DataTypes);
  models.RptServices = require("./rpt_services.model")(sequelize, DataTypes);
  models.RefCategory = require("./ref_class_category.model")(sequelize, DataTypes);
  models.RefClass = require("./ref_class.model")(sequelize, DataTypes);
  models.RptFaults = require("./rpt_faults.model")(sequelize, DataTypes);
  models.SystemFaults = require("./system_faults.model")(sequelize, DataTypes);
  models.RptAlarms = require("./rpt_alarms.model")(sequelize, DataTypes);
  models.SystemAlarms = require("./system_alarms.model")(sequelize, DataTypes);
  models.Parameters = require("./parameters_parameter")(sequelize, DataTypes);
  models.Inputs = require("./inputs_inputs")(sequelize, DataTypes);
  models.Outputs = require("./outputs_outputs")(sequelize, DataTypes);
  models.Report = require("./reports.model")(sequelize, DataTypes);

  // Pivot tables
  models.UserRole = sequelize.define("UserRole", {}, { tableName: "user_roles", timestamps: false });
  models.RolesPermissions = sequelize.define("RolesPermissions", {}, { tableName: "roles_permissions", timestamps: false });

  // Associations
  models.User.belongsToMany(models.Role, { through: models.UserRole, foreignKey: "user_id", otherKey: "role_id" });
  models.Role.belongsToMany(models.User, { through: models.UserRole, foreignKey: "role_id", otherKey: "user_id" });
  models.Role.belongsToMany(models.Permission, { through: models.RolesPermissions, foreignKey: "role_id", otherKey: "permission_id" });
  models.Permission.belongsToMany(models.Role, { through: models.RolesPermissions, foreignKey: "permission_id", otherKey: "role_id" });
  models.RptAlarms.belongsTo(models.SystemAlarms, { as: "system_alarms", foreignKey: "alarm_id", targetKey: "number" });
  models.Faults.belongsTo(models.SystemFaults, { as: "system_fault", foreignKey: "fault_number", targetKey: "number" });
  models.Alarms.belongsTo(models.SystemAlarms, { as: "system_alarms", foreignKey: "alarm_number", targetKey: "number" });
  models.RptServices.belongsTo(models.RefCategory, { as: "refClassCategory", foreignKey: "mode_of_operation", targetKey: "ref_cat_id" });
  models.RefCategory.belongsTo(models.RefClass, { as: "refClass", foreignKey: "ref_class_id", targetKey: "class_id" });

  return models;
}

const models = init(sequelize);

Object.keys(models).forEach(modelName => {
  if (models[modelName].name) {
      // Class Methods
      models[modelName].create = async function(values, options) {
          try {
              await pushToQueue(models, modelName, 'insert', values);
              return models[modelName].build(values); 
          } catch(e) {
              console.error(`Queue error creating ${modelName}:`, e);
              throw e;
          }
      };
      models[modelName].update = async function(values, options) {
          try {
              await pushToQueue(models, modelName, 'update', values, options ? options.where : {});
              return [1, [models[modelName].build(values)]]; 
          } catch(e) {
              console.error(`Queue error updating ${modelName}:`, e);
              throw e;
          }
      };
      models[modelName].destroy = async function(options) {
          try {
              await pushToQueue(models, modelName, 'delete', null, options ? options.where : {});
              return 1;
          } catch(e) {
              console.error(`Queue error destroying ${modelName}:`, e);
              throw e;
          }
      };
      models[modelName].bulkCreate = async function(records, options) {
          try {
              await pushToQueue(models, modelName, 'insert', records);
              return records.map(r => models[modelName].build(r));
          } catch(e) {
              console.error(`Queue error bulk creating ${modelName}:`, e);
              throw e;
          }
      };
      models[modelName].upsert = async function(values, options) {
          try {
              await pushToQueue(models, modelName, 'insert', values);
              return [models[modelName].build(values), true];
          } catch(e) {
              console.error(`Queue error upserting ${modelName}:`, e);
              throw e;
          }
      };
      
      // Instance Methods
      models[modelName].prototype.save = async function() {
          try {
              const changed = this.changed();
              if (changed) {
                  const values = {};
                  changed.forEach(c => values[c] = this[c]);
                  const pk = this.constructor.primaryKeyAttribute || 'id';
                  const where = {};
                  where[pk] = this[pk];
                  await pushToQueue(models, modelName, 'update', values, where);
              } else if (this.isNewRecord) {
                  await pushToQueue(models, modelName, 'insert', this.dataValues);
              }
              return this;
          } catch(e) {
              console.error(`Queue error saving instance of ${modelName}:`, e);
              throw e;
          }
      };
      
      models[modelName].prototype.destroy = async function() {
          try {
              const pk = this.constructor.primaryKeyAttribute || 'id';
              const where = {};
              where[pk] = this[pk];
              await pushToQueue(models, modelName, 'delete', null, where);
              return this;
          } catch(e) {
              console.error(`Queue error destroying instance of ${modelName}:`, e);
              throw e;
          }
      };
  }
});

module.exports = {
  init,
  sequelize,
  Sequelize,
  ...models
};
