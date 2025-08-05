module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Permission', {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        code: DataTypes.STRING,
        url: DataTypes.STRING,
    }, {
        tableName: 'permissions',
        timestamps: false,
    });
};