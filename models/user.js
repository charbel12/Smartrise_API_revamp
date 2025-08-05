module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        password_salt: DataTypes.STRING,
        force_change_password: DataTypes.BOOLEAN,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        middle_name: DataTypes.STRING,
        contact_number: DataTypes.STRING,
        email: DataTypes.STRING,
        image: DataTypes.STRING,
        date_created: DataTypes.DATE,
        date_modified: DataTypes.DATE,
        remember_token: DataTypes.STRING,
        status: DataTypes.STRING,
    }, {
        tableName: 'users',
        timestamps: false
    });
};