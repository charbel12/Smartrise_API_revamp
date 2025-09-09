const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    logging: false,
});

// Import models
const User = require('./User')(sequelize, DataTypes);
const Role = require('./Role')(sequelize, DataTypes);
const Permission = require('./Permission')(sequelize, DataTypes);
const Faults = require('./Faults')(sequelize, DataTypes);
const Alarms = require('./Alarms')(sequelize, DataTypes);
const RptWait = require('./rpt_wait')(sequelize, DataTypes);
const ProgramEvents = require('./rpt_program_events')(sequelize, DataTypes);
const RptServices = require('./rpt_services')(sequelize, DataTypes);
const RefCategory = require('./ref_class_category')(sequelize, DataTypes);
const RefClass = require('./ref_class')(sequelize, DataTypes);





const RptFaults = require('./rpt_faults')(sequelize, DataTypes);
const SystemFaults = require('./system_faults')(sequelize, DataTypes);

const RptAlarms = require('./rpt_alarms')(sequelize, DataTypes);
const SystemAlarms = require('./system_alarms')(sequelize, DataTypes);



// Pivot Tables
const UserRole = sequelize.define('UserRole', {}, {
    tableName: 'user_roles',
    timestamps: false
});

const RolesPermissions = sequelize.define('RolesPermissions', {}, {
    tableName: 'roles_permissions',
    timestamps: false
});

// Associations

// Users ↔ Roles
User.belongsToMany(Role, {
    through: UserRole,
    foreignKey: 'user_id',
    otherKey: 'role_id'
});

Role.belongsToMany(User, {
    through: UserRole,
    foreignKey: 'role_id',
    otherKey: 'user_id'
});

// Roles ↔ Permissions
Role.belongsToMany(Permission, {
    through: RolesPermissions,
    foreignKey: 'role_id',
    otherKey: 'permission_id'
});

Permission.belongsToMany(Role, {
    through: RolesPermissions,
    foreignKey: 'permission_id',
    otherKey: 'role_id'
});

RptFaults.belongsTo(SystemFaults, {
  as: 'system_fault',
  foreignKey: 'fault_id',
  targetKey: 'number',
});

RptAlarms.belongsTo(SystemAlarms, {
  as: 'system_alarms',
  foreignKey: 'alarm_id',
  targetKey: 'number',
});

RptServices.belongsTo(RefCategory, {
  as: 'refClassCategory',
  foreignKey: 'mode_of_operation',            
  targetKey: 'ref_cat_id',
});
RefCategory.belongsTo(RefClass, {
  as: 'refClass',
  foreignKey: 'ref_class_id',             
  targetKey: 'class_id',
});
// Expose everything
module.exports = {
    sequelize,
    Sequelize,
    User,
    Alarms,
    Faults,
    RptFaults,
    ProgramEvents,
    SystemFaults,
    RptAlarms,
    RptWait,
    SystemAlarms,
    RefCategory,
    RefClass,
    RptServices,
    Role,
    Permission,
    UserRole,
    RolesPermissions
};