module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    username: { type: DataTypes.STRING(255), allowNull: false },
    first_name: { type: DataTypes.STRING(255), allowNull: false },
    last_name: { type: DataTypes.STRING(255), allowNull: false },
    middle_name: { type: DataTypes.STRING(255), allowNull: true },
    contact_number: { type: DataTypes.STRING(255), allowNull: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    password_salt: { type: DataTypes.STRING(255), allowNull: true },
    force_change_password: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
    email: { type: DataTypes.STRING(255), allowNull: true },
    image: { type: DataTypes.STRING(255), allowNull: true },
    date_created: { type: DataTypes.DATE, allowNull: false },
    date_modified: { type: DataTypes.DATE, allowNull: false },
    remember_token: { type: DataTypes.STRING(100), allowNull: true },
  }, {
    tableName: 'users',
    timestamps: false,
  });
  return User;
};
