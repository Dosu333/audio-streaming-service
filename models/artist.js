const { sq } = require("../config/postgresDb");
const { DataTypes } = require("sequelize");

const Artist = sq.define("artist", {
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
  
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    label: {
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

Artist.sync().then(() => {
    console.log("Artist Model synced");
});

module.exports = Artist;