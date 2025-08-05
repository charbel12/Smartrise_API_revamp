module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Role', {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        name: DataTypes.STRING,
    }, {
        tableName: 'roles',
        timestamps: false,
    });
};