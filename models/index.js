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

// Expose everything
module.exports = {
    sequelize,
    Sequelize,
    User,
    Role,
    Permission,
    UserRole,
    RolesPermissions
};