module.exports = (sequelize, DataTypes) => {
    return sequelize.define('UserRole', {
        user_id: DataTypes.INTEGER,
        role_id: DataTypes.INTEGER,
        date_created: DataTypes.DATE,
        date_modified: DataTypes.DATE
    }, {
        tableName: 'user_roles',
        timestamps: false
    });
};