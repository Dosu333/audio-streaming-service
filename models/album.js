const { sq } = require("../config/postgresDb");
const { DataTypes } = require("sequelize");

const Album = sq.define("album", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sq.literal('uuid_generate_v4()'),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: true,
    }
  });

sq.beforeSync(async () => {
    await sq.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
   });

Album.sync().then(() => {
    console.log("Album Model synced");
});

module.exports = Album;