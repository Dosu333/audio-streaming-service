const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const User = sq.define("user", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sq.literal('uuid_generate_v4()'),
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  });

sq.beforeSync(async () => {
    await sq.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
   });

User.sync().then(() => {
    console.log("User Model synced");
});

module.exports = User;