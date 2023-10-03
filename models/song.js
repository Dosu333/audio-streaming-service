const { sq } = require("../config/postgresDb");
const { DataTypes } = require("sequelize");
const User = require('./user')
const Album = require('./album')


const Song = sq.define("song", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sq.literal('uuid_generate_v4()'),
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    songFile: {
        type: DataTypes.BLOB,
        allowNull: false,
    },
    numberOfListens: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  
    numberOfListeners: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });

sq.beforeSync(async () => {
    await sq.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
   });

Song.sync().then(() => {
    console.log("Song Model synced");
});

module.exports = Song;